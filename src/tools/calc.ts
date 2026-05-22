// HVAC engineering calculations for the Tools section.
// All functions work in SI; the UI layer handles IP display conversion.

// --- constants ---
export const STD_PRESSURE = 101.325; // kPa
const AIR_DENSITY = 1.2; // kg/m3
const AIR_VISC = 1.51e-5; // m2/s kinematic
const AIR_CP = 1006; // J/kg.K
const WATER_DENSITY = 1000; // kg/m3
const WATER_VISC = 1.3e-6; // m2/s (chilled water ~10 C)
const H_FG = 2.501e6; // J/kg latent heat of vaporisation

// =========================================================================
// Psychrometrics
// =========================================================================

/** Saturation vapour pressure over water (kPa), Magnus form. */
export function saturationPressure(tC: number): number {
  return 0.61094 * Math.exp((17.625 * tC) / (tC + 243.04));
}

export function dewPointFromVapour(pwKpa: number): number {
  if (pwKpa <= 0) return -60;
  const a = Math.log(pwKpa / 0.61094);
  return (243.04 * a) / (17.625 - a);
}

export function pressureAtElevation(elevationM: number): number {
  return STD_PRESSURE * Math.pow(1 - 2.25577e-5 * elevationM, 5.2559);
}

/** Humidity ratio (kg/kg dry air) from dry-bulb (C) and RH (%). */
export function humidityRatio(
  tdb: number,
  rh: number,
  pKpa: number = STD_PRESSURE,
): number {
  const pws = saturationPressure(tdb);
  const pw = Math.min((rh / 100) * pws, pKpa - 0.001);
  return 0.621945 * (pw / (pKpa - pw));
}

function wFromWetBulb(tdb: number, twb: number, p: number): number {
  const pwsWb = saturationPressure(twb);
  const ws = 0.621945 * (pwsWb / (p - pwsWb));
  return (
    ((2501 - 2.326 * twb) * ws - 1.006 * (tdb - twb)) /
    (2501 + 1.86 * tdb - 4.186 * twb)
  );
}

export interface PsychroResult {
  humidityRatio: number; // g/kg
  wetBulb: number;
  dewPoint: number;
  enthalpy: number;
  specificVolume: number;
  vapourPressure: number;
  saturationPressure: number;
}

export function psychrometrics(
  tdb: number,
  rh: number,
  pKpa: number = STD_PRESSURE,
): PsychroResult {
  const pws = saturationPressure(tdb);
  const pw = Math.min((rh / 100) * pws, pKpa - 0.001);
  const W = 0.621945 * (pw / (pKpa - pw));
  // wet-bulb by bisection
  let lo = -25;
  let hi = tdb;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (wFromWetBulb(tdb, mid, pKpa) > W) hi = mid;
    else lo = mid;
  }
  return {
    humidityRatio: W * 1000,
    wetBulb: (lo + hi) / 2,
    dewPoint: dewPointFromVapour(pw),
    enthalpy: 1.006 * tdb + W * (2501 + 1.86 * tdb),
    specificVolume:
      (0.287042 * (tdb + 273.15) * (1 + 1.607858 * W)) / pKpa,
    vapourPressure: pw,
    saturationPressure: pws,
  };
}

// =========================================================================
// Fluid friction — Colebrook-White
// =========================================================================

/** Darcy friction factor for a given Reynolds number and relative roughness. */
export function frictionFactor(Re: number, relRoughness: number): number {
  if (Re < 1) return 0;
  if (Re < 2300) return 64 / Re; // laminar
  let f = 0.02;
  for (let i = 0; i < 40; i++) {
    f =
      1 /
      Math.pow(
        -2 *
          Math.log10(
            relRoughness / 3.7 + 2.51 / (Re * Math.sqrt(f)),
          ),
        2,
      );
  }
  return f;
}

// =========================================================================
// Duct sizing — McQuay Ductsizer style (friction-rate based)
// =========================================================================

const DUCT_ROUGHNESS = 0.09e-3; // galvanised steel, m

export interface DuctPoint {
  velocity: number; // m/s
  frictionRate: number; // Pa/m
  velocityPressure: number; // Pa
}

/** Velocity, friction rate and velocity pressure for a round duct. */
export function ductAt(flowM3s: number, diaM: number): DuctPoint {
  const area = (Math.PI * diaM * diaM) / 4;
  const v = area > 0 ? flowM3s / area : 0;
  const Re = (v * diaM) / AIR_VISC;
  const f = frictionFactor(Re, DUCT_ROUGHNESS / diaM);
  return {
    velocity: v,
    frictionRate: f * (1 / diaM) * ((AIR_DENSITY * v * v) / 2),
    velocityPressure: (AIR_DENSITY * v * v) / 2,
  };
}

/** Round duct diameter (m) that gives a target friction rate (Pa/m). */
export function ductDiaForFriction(
  flowM3s: number,
  targetFriction: number,
): number {
  let lo = 0.05;
  let hi = 3.0;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (ductAt(flowM3s, mid).frictionRate > targetFriction) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

/** Round duct diameter (m) for a target velocity (m/s). */
export function ductDiaForVelocity(flowM3s: number, vel: number): number {
  return vel > 0 ? Math.sqrt((4 * flowM3s) / (Math.PI * vel)) : 0;
}

/** Equivalent round diameter (m) of a rectangular duct (sides in m). */
export function equivDiameter(aM: number, bM: number): number {
  return (1.3 * Math.pow(aM * bM, 0.625)) / Math.pow(aM + bM, 0.25);
}

/** Rectangular side (m) so the duct matches a target equivalent diameter. */
export function rectSideForDia(targetDiaM: number, knownSideM: number): number {
  let lo = 0.05;
  let hi = 4.0;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (equivDiameter(knownSideM, mid) < targetDiaM) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

/** Nearest standard round duct diameter (mm) at or above a value. */
export function nextStandardDuct(mm: number): number {
  const sizes = [
    100, 125, 150, 160, 200, 250, 315, 355, 400, 450, 500, 560, 630, 710,
    800, 900, 1000, 1120, 1250, 1400, 1600, 1800, 2000,
  ];
  return sizes.find((s) => s >= mm) ?? Math.ceil(mm / 50) * 50;
}

// =========================================================================
// Pipe sizing — McQuay Pipesizer style
// =========================================================================

export interface PipeSize {
  label: string;
  idMm: number;
}

/** Steel pipe, Schedule 40 — nominal size and inside diameter (mm). */
export const STEEL_SCH40: PipeSize[] = [
  { label: 'DN15', idMm: 15.8 },
  { label: 'DN20', idMm: 21.0 },
  { label: 'DN25', idMm: 26.6 },
  { label: 'DN32', idMm: 35.1 },
  { label: 'DN40', idMm: 40.9 },
  { label: 'DN50', idMm: 52.5 },
  { label: 'DN65', idMm: 62.7 },
  { label: 'DN80', idMm: 77.9 },
  { label: 'DN100', idMm: 102.3 },
  { label: 'DN125', idMm: 128.2 },
  { label: 'DN150', idMm: 154.1 },
  { label: 'DN200', idMm: 202.7 },
  { label: 'DN250', idMm: 254.5 },
  { label: 'DN300', idMm: 303.2 },
];

/** Copper tube, Type L — nominal size and inside diameter (mm). */
export const COPPER_L: PipeSize[] = [
  { label: '15 mm', idMm: 13.8 },
  { label: '20 mm', idMm: 19.9 },
  { label: '25 mm', idMm: 26.0 },
  { label: '32 mm', idMm: 32.1 },
  { label: '40 mm', idMm: 38.2 },
  { label: '50 mm', idMm: 50.4 },
  { label: '65 mm', idMm: 62.6 },
  { label: '80 mm', idMm: 74.8 },
  { label: '100 mm', idMm: 99.9 },
];

const PIPE_ROUGHNESS: Record<string, number> = {
  steel: 0.045e-3,
  copper: 0.0015e-3,
};

export interface PipePoint {
  velocity: number; // m/s
  frictionRate: number; // Pa/m
}

/** Velocity and friction rate for water in a pipe of given inside diameter. */
export function pipeAt(
  flowM3s: number,
  idM: number,
  material: 'steel' | 'copper',
): PipePoint {
  const v = idM > 0 ? flowM3s / ((Math.PI * idM * idM) / 4) : 0;
  const Re = (v * idM) / WATER_VISC;
  const f = frictionFactor(Re, (PIPE_ROUGHNESS[material] ?? 0.045e-3) / idM);
  return {
    velocity: v,
    frictionRate: f * (1 / idM) * ((WATER_DENSITY * v * v) / 2),
  };
}

/** Water flow (L/s) carrying a thermal load (kW) across a delta-T (K). */
export function waterFlow(kW: number, deltaT: number): number {
  return deltaT > 0 ? kW / (4.186 * deltaT) : 0;
}

// =========================================================================
// Fan power — Sodeca Quick Fan style selection figures
// =========================================================================

export interface FanResult {
  airPower: number; // W
  shaftPower: number; // W
  motorInput: number; // W
  sfp: number; // W per L/s
}

export function fanPower(
  flowM3s: number,
  pressurePa: number,
  etaFan: number,
  etaMotor: number,
  etaDrive: number,
): FanResult {
  const airPower = pressurePa * flowM3s;
  const shaftPower = etaFan > 0 ? airPower / etaFan : 0;
  const motorInput =
    etaMotor > 0 && etaDrive > 0 ? shaftPower / (etaMotor * etaDrive) : 0;
  return {
    airPower,
    shaftPower,
    motorInput,
    sfp: flowM3s > 0 ? motorInput / (flowM3s * 1000) : 0,
  };
}

/** Standard IEC motor sizes (kW) — for "next size up" selection. */
export function nextMotorSize(kW: number): number {
  const sizes = [
    0.18, 0.25, 0.37, 0.55, 0.75, 1.1, 1.5, 2.2, 3, 4, 5.5, 7.5, 11, 15,
    18.5, 22, 30, 37, 45, 55, 75, 90, 110,
  ];
  return sizes.find((s) => s >= kW) ?? Math.ceil(kW);
}

// =========================================================================
// Cooling load — component method
// =========================================================================

export interface LoadInput {
  outdoorDB: number; // C
  outdoorRH: number; // %
  indoorDB: number; // C
  indoorRH: number; // %
  wallArea: number; // m2
  wallU: number; // W/m2K
  roofArea: number; // m2
  roofU: number;
  roofSunlit: boolean;
  glassArea: number; // m2
  glassU: number;
  glassSHGC: number;
  solarFlux: number; // W/m2 for the chosen orientation
  volume: number; // m3 (for infiltration)
  peopleSensible: number; // W per person
  peopleLatent: number; // W per person
  people: number;
  lightingW: number;
  equipmentW: number;
  outdoorAirLs: number; // L/s
  infiltrationACH: number;
  safetyPct: number;
}

export interface LoadComponent {
  name: string;
  sensible: number; // W
  latent: number; // W
}

export interface LoadResult {
  components: LoadComponent[];
  sensible: number;
  latent: number;
  total: number;
  shr: number;
  tons: number;
}

const ROOF_SOLAIR_UPLIFT = 17; // K added to delta-T for a sunlit roof

export function coolingLoad(i: LoadInput): LoadResult {
  const dT = i.outdoorDB - i.indoorDB;
  const wOut = humidityRatio(i.outdoorDB, i.outdoorRH);
  const wIn = humidityRatio(i.indoorDB, i.indoorRH);
  const dW = wOut - wIn;

  const c: LoadComponent[] = [];
  c.push({ name: 'Walls', sensible: i.wallU * i.wallArea * dT, latent: 0 });
  c.push({
    name: 'Roof',
    sensible:
      i.roofU * i.roofArea * (dT + (i.roofSunlit ? ROOF_SOLAIR_UPLIFT : 0)),
    latent: 0,
  });
  c.push({
    name: 'Glass conduction',
    sensible: i.glassU * i.glassArea * dT,
    latent: 0,
  });
  c.push({
    name: 'Glass solar gain',
    sensible: i.glassArea * i.glassSHGC * i.solarFlux,
    latent: 0,
  });
  c.push({
    name: 'People',
    sensible: i.people * i.peopleSensible,
    latent: i.people * i.peopleLatent,
  });
  c.push({ name: 'Lighting', sensible: i.lightingW, latent: 0 });
  c.push({ name: 'Equipment', sensible: i.equipmentW, latent: 0 });

  // Outdoor air (ventilation)
  const vaM3s = i.outdoorAirLs / 1000;
  c.push({
    name: 'Ventilation air',
    sensible: AIR_DENSITY * vaM3s * AIR_CP * dT,
    latent: AIR_DENSITY * vaM3s * H_FG * dW,
  });

  // Infiltration
  const infM3s = (i.infiltrationACH * i.volume) / 3600;
  c.push({
    name: 'Infiltration',
    sensible: AIR_DENSITY * infM3s * AIR_CP * dT,
    latent: AIR_DENSITY * infM3s * H_FG * dW,
  });

  const factor = 1 + i.safetyPct / 100;
  const components = c.map((x) => ({
    name: x.name,
    sensible: Math.max(0, x.sensible) * factor,
    latent: Math.max(0, x.latent) * factor,
  }));

  const sensible = components.reduce((s, x) => s + x.sensible, 0);
  const latent = components.reduce((s, x) => s + x.latent, 0);
  const total = sensible + latent;
  return {
    components,
    sensible,
    latent,
    total,
    shr: total > 0 ? sensible / total : 0,
    tons: total / 3517,
  };
}
