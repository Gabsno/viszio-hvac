// Pure HVAC engineering calculations used by the Tools section.
// Physics and standard engineering relations — no UI, easy to reason about.

export const STD_PRESSURE = 101.325; // kPa at sea level

/** Saturation vapour pressure over water (kPa), Magnus form. Good ~ -20..60 C. */
export function saturationPressure(tC: number): number {
  return 0.61094 * Math.exp((17.625 * tC) / (tC + 243.04));
}

/** Dew-point temperature (C) from vapour pressure (kPa). */
export function dewPointFromVapour(pwKpa: number): number {
  if (pwKpa <= 0) return -60;
  const a = Math.log(pwKpa / 0.61094);
  return (243.04 * a) / (17.625 - a);
}

/** Barometric pressure (kPa) at a site elevation (m). */
export function pressureAtElevation(elevationM: number): number {
  return STD_PRESSURE * Math.pow(1 - 2.25577e-5 * elevationM, 5.2559);
}

function humidityRatioAt(pwKpa: number, pKpa: number): number {
  return 0.621945 * (pwKpa / (pKpa - pwKpa));
}

/** Humidity ratio (kg/kg) of saturated air at a wet-bulb temperature. */
function wFromWetBulb(tdb: number, twb: number, p: number): number {
  const ws = humidityRatioAt(saturationPressure(twb), p);
  return (
    ((2501 - 2.326 * twb) * ws - 1.006 * (tdb - twb)) /
    (2501 + 1.86 * tdb - 4.186 * twb)
  );
}

function wetBulbFromW(tdb: number, W: number, p: number): number {
  let lo = -25;
  let hi = tdb;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (wFromWetBulb(tdb, mid, p) > W) hi = mid;
    else lo = mid;
  }
  return (lo + hi) / 2;
}

export interface PsychroResult {
  humidityRatio: number; // g/kg dry air
  wetBulb: number; // C
  dewPoint: number; // C
  enthalpy: number; // kJ/kg dry air
  specificVolume: number; // m3/kg dry air
  vapourPressure: number; // kPa
  saturationPressure: number; // kPa
}

/** Full moist-air state from dry-bulb (C) and relative humidity (%). */
export function psychrometrics(
  tdb: number,
  rh: number,
  pKpa: number = STD_PRESSURE,
): PsychroResult {
  const pws = saturationPressure(tdb);
  const pw = Math.min((rh / 100) * pws, pKpa - 0.001);
  const W = humidityRatioAt(pw, pKpa);
  return {
    humidityRatio: W * 1000,
    wetBulb: wetBulbFromW(tdb, W, pKpa),
    dewPoint: dewPointFromVapour(pw),
    enthalpy: 1.006 * tdb + W * (2501 + 1.86 * tdb),
    specificVolume:
      (0.287042 * (tdb + 273.15) * (1 + 1.607858 * W)) / pKpa,
    vapourPressure: pw,
    saturationPressure: pws,
  };
}

/** Nearest standard round duct diameter (mm) at or above a value. */
export function nextStandardDuct(mm: number): number {
  const sizes = [
    100, 125, 150, 160, 200, 250, 315, 355, 400, 450, 500, 560, 630, 710,
    800, 900, 1000, 1120, 1250, 1400, 1600, 1800, 2000,
  ];
  return sizes.find((s) => s >= mm) ?? Math.ceil(mm / 50) * 50;
}

/** Equivalent round diameter (mm) of a rectangular duct (mm x mm). */
export function equivalentDiameter(a: number, b: number): number {
  return (1.3 * Math.pow(a * b, 0.625)) / Math.pow(a + b, 0.25);
}

/** Round duct diameter (mm) for an airflow (L/s) at a target velocity (m/s). */
export function ductDiameter(flowLs: number, velocity: number): number {
  const area = flowLs / 1000 / velocity; // m2
  return Math.sqrt((4 * area) / Math.PI) * 1000;
}

/** Pipe inside diameter (mm) for a flow (L/s) at a target velocity (m/s). */
export function pipeDiameter(flowLs: number, velocity: number): number {
  const area = flowLs / 1000 / velocity;
  return Math.sqrt((4 * area) / Math.PI) * 1000;
}

/** Water flow (L/s) carrying a thermal load (kW) across a delta-T (K). */
export function waterFlow(kW: number, deltaT: number): number {
  // m = Q / (cp * dT); cp water ~ 4.186 kJ/kg.K; 1 kg ~ 1 L
  return deltaT > 0 ? kW / (4.186 * deltaT) : 0;
}
