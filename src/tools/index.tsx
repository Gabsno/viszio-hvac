import { useEffect, useMemo, useRef, useState } from 'react';
import { useSettingsStore } from '../store/useSettingsStore';
import type { UnitSystem } from '../store/useSettingsStore';
import {
  psychrometrics,
  pressureAtElevation,
  ductAt,
  ductDiaForFriction,
  ductDiaForVelocity,
  rectSideForDia,
  nextStandardDuct,
  STEEL_SCH40,
  COPPER_L,
  pipeAt,
  waterFlow,
  fanPower,
  nextMotorSize,
  coolingLoad,
} from './calc';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const num = (s: string): number => {
  const v = parseFloat(s);
  return Number.isFinite(v) ? v : 0;
};
const fmt = (v: number, d = 1): string =>
  Number.isFinite(v) ? v.toFixed(d) : '—';

// ---- Unit system ----------------------------------------------------------

type Sys = UnitSystem;
type FieldUnit = keyof typeof UNITS | 'temp' | 'dtemp' | null;

// Each quantity: SI label, IP label, and the SI-value × f = IP-value factor.
const UNITS = {
  airflow: { si: 'L/s', ip: 'CFM', f: 2.11888 },
  velocity: { si: 'm/s', ip: 'fpm', f: 196.8504 },
  ductFric: { si: 'Pa/m', ip: 'in.wg/100ft', f: 0.122366 },
  dia: { si: 'mm', ip: 'in', f: 0.0393701 },
  waterFlow: { si: 'L/s', ip: 'GPM', f: 15.85032 },
  pipeVel: { si: 'm/s', ip: 'ft/s', f: 3.28084 },
  pipeFric: { si: 'Pa/m', ip: 'ftWG/100ft', f: 0.0101974 },
  area: { si: 'm²', ip: 'ft²', f: 10.76391 },
  power: { si: 'kW', ip: 'MBh', f: 3.412142 },
  pressure: { si: 'Pa', ip: 'in.wg', f: 0.00401463 },
  fanPower: { si: 'kW', ip: 'hp', f: 1.341022 },
  uValue: { si: 'W/m²K', ip: 'Btu/h·ft²·°F', f: 0.17611 },
  coolingLoad: { si: 'kW', ip: 'tons', f: 0.284345 },
  length: { si: 'm', ip: 'ft', f: 3.28084 },
} as const;

function uLabel(q: keyof typeof UNITS, sys: Sys): string {
  return sys === 'IP' ? UNITS[q].ip : UNITS[q].si;
}
function toSI(v: number, q: keyof typeof UNITS, sys: Sys): number {
  return sys === 'IP' ? v / UNITS[q].f : v;
}
function toDisp(siVal: number, q: keyof typeof UNITS, sys: Sys): number {
  return sys === 'IP' ? siVal * UNITS[q].f : siVal;
}
function tempToSI(v: number, sys: Sys): number {
  return sys === 'IP' ? (v - 32) / 1.8 : v;
}
const tempLabel = (sys: Sys) => (sys === 'IP' ? '°F' : '°C');

function convertOne(
  strVal: string,
  fu: FieldUnit,
  from: Sys,
  to: Sys,
): string {
  const n = parseFloat(strVal);
  if (!Number.isFinite(n) || !fu || from === to) return strVal;
  let out: number;
  if (fu === 'temp') out = from === 'IP' ? (n - 32) / 1.8 : n * 1.8 + 32;
  else if (fu === 'dtemp') out = from === 'IP' ? n / 1.8 : n * 1.8;
  else {
    const si = from === 'IP' ? n / UNITS[fu].f : n;
    out = to === 'IP' ? si * UNITS[fu].f : si;
  }
  return String(Math.round(out * 1e4) / 1e4);
}
function convertAll(
  vals: Record<string, string>,
  from: Sys,
  to: Sys,
  fieldUnits: Record<string, FieldUnit>,
): Record<string, string> {
  const out = { ...vals };
  for (const k of Object.keys(fieldUnits)) {
    out[k] = convertOne(vals[k], fieldUnits[k], from, to);
  }
  return out;
}

/** Per-calculator input state that converts itself when units are toggled. */
function useUnitInputs(
  defaultsSI: Record<string, string>,
  fieldUnits: Record<string, FieldUnit>,
) {
  const sys = useSettingsStore((s) => s.calcUnits);
  const [vals, setVals] = useState<Record<string, string>>(() =>
    convertAll(defaultsSI, 'SI', sys, fieldUnits),
  );
  const prev = useRef<Sys>(sys);
  useEffect(() => {
    if (prev.current !== sys) {
      const from = prev.current; // capture before updating the ref
      prev.current = sys;
      setVals((cur) => convertAll(cur, from, sys, fieldUnits));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sys]);
  const set = (k: string, v: string) =>
    setVals((c) => ({ ...c, [k]: v }));
  return { sys, vals, set };
}

// ---- Shared UI ------------------------------------------------------------

function Field({
  label,
  value,
  onChange,
  unit,
  step = 1,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  unit?: string;
  step?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-400">
        {label}
      </span>
      <span className="flex items-center gap-1.5">
        <input
          type="number"
          inputMode="decimal"
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 dark:border-slate-700 dark:bg-slate-800"
        />
        {unit && (
          <span className="shrink-0 text-[11px] font-medium text-slate-400">
            {unit}
          </span>
        )}
      </span>
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-400">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-teal-500 dark:border-slate-700 dark:bg-slate-800"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function CheckField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded accent-teal-600"
      />
      {label}
    </label>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2">{children}</div>;
}

function Results({ rows }: { rows: [string, string][] }) {
  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-teal-200 bg-teal-50/60 dark:border-teal-800 dark:bg-teal-950/40">
      {rows.map(([label, value], i) => (
        <div
          key={label}
          className={`flex items-baseline justify-between gap-4 px-4 py-2.5 ${
            i > 0 ? 'border-t border-teal-100 dark:border-teal-900' : ''
          }`}
        >
          <span className="text-sm text-slate-600 dark:text-slate-300">
            {label}
          </span>
          <span className="text-right font-mono text-sm font-bold text-teal-800 dark:text-teal-300">
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-xs text-slate-400">{children}</p>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 mt-5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
      {children}
    </p>
  );
}

/** Global SI / IP switch shown at the top of unit-aware calculators. */
function UnitToggle() {
  const sys = useSettingsStore((s) => s.calcUnits);
  const setUnits = useSettingsStore((s) => s.setCalcUnits);
  return (
    <div className="mb-1 flex items-center gap-2">
      <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
        Units
      </span>
      <div className="flex rounded-lg bg-slate-100 p-0.5 dark:bg-slate-800">
        {(['SI', 'IP'] as const).map((u) => (
          <button
            key={u}
            onClick={() => setUnits(u)}
            className={`rounded-md px-2.5 py-1 text-xs font-bold transition ${
              sys === u
                ? 'bg-white text-teal-700 shadow-sm dark:bg-slate-700 dark:text-teal-300'
                : 'text-slate-500'
            }`}
          >
            {u === 'SI' ? 'Metric' : 'Imperial'}
          </button>
        ))}
      </div>
    </div>
  );
}

// ===========================================================================
// 1. Psychrometric calculator
// ===========================================================================

function PsychrometricCalc() {
  const [tdb, setTdb] = useState('30');
  const [rh, setRh] = useState('65');
  const [elev, setElev] = useState('61');

  const r = useMemo(() => {
    const p = pressureAtElevation(num(elev));
    return { ...psychrometrics(num(tdb), Math.min(num(rh), 100), p), p };
  }, [tdb, rh, elev]);

  return (
    <>
      <Grid>
        <Field label="Dry-bulb temperature" value={tdb} onChange={setTdb} unit="°C" />
        <Field label="Relative humidity" value={rh} onChange={setRh} unit="%" />
        <Field label="Site elevation" value={elev} onChange={setElev} unit="m" />
      </Grid>
      <Results
        rows={[
          ['Wet-bulb temperature', `${fmt(r.wetBulb)} °C`],
          ['Dew-point temperature', `${fmt(r.dewPoint)} °C`],
          ['Humidity ratio', `${fmt(r.humidityRatio, 2)} g/kg`],
          ['Enthalpy', `${fmt(r.enthalpy)} kJ/kg`],
          ['Specific volume', `${fmt(r.specificVolume, 3)} m³/kg`],
          ['Vapour pressure', `${fmt(r.vapourPressure, 3)} kPa`],
          ['Barometric pressure', `${fmt(r.p, 2)} kPa`],
        ]}
      />
      <Note>Moist-air properties at the given barometric pressure.</Note>
    </>
  );
}

// ===========================================================================
// 2. Cooling load calculator — component method
// ===========================================================================

const ORIENTATIONS: { value: string; label: string; flux: number }[] = [
  { value: 'horizontal', label: 'Horizontal / skylight', flux: 850 },
  { value: 'east', label: 'East', flux: 520 },
  { value: 'west', label: 'West', flux: 520 },
  { value: 'south', label: 'South', flux: 350 },
  { value: 'north', label: 'North', flux: 320 },
  { value: 'diagonal', label: 'NE / NW / SE / SW', flux: 460 },
];

const ACTIVITIES: {
  value: string;
  label: string;
  sensible: number;
  latent: number;
}[] = [
  { value: 'office', label: 'Seated, office work', sensible: 75, latent: 55 },
  { value: 'standing', label: 'Standing, light work', sensible: 80, latent: 95 },
  { value: 'walking', label: 'Walking, moderate work', sensible: 100, latent: 130 },
  { value: 'heavy', label: 'Heavy work', sensible: 170, latent: 255 },
];

function CoolingLoadCalc() {
  const fields: Record<string, FieldUnit> = {
    outdoorDB: 'temp',
    indoorDB: 'temp',
    floorArea: 'area',
    ceilingHeight: 'length',
    wallArea: 'area',
    wallU: 'uValue',
    roofArea: 'area',
    roofU: 'uValue',
    glassArea: 'area',
    glassU: 'uValue',
    outdoorAir: 'airflow',
  };
  const { sys, vals, set } = useUnitInputs(
    {
      outdoorDB: '33',
      outdoorRH: '75',
      indoorDB: '24',
      indoorRH: '55',
      floorArea: '100',
      ceilingHeight: '3',
      wallArea: '60',
      wallU: '1.8',
      roofArea: '0',
      roofU: '0.5',
      glassArea: '15',
      glassU: '5.7',
      glassSHGC: '0.6',
      people: '10',
      lightingW: '1000',
      equipmentW: '1500',
      outdoorAir: '120',
      infiltrationACH: '0.5',
      safetyPct: '10',
    },
    fields,
  );
  const [orientation, setOrientation] = useState('west');
  const [activity, setActivity] = useState('office');
  const [roofSunlit, setRoofSunlit] = useState(true);

  const r = useMemo(() => {
    const act = ACTIVITIES.find((a) => a.value === activity) ?? ACTIVITIES[0];
    const flux =
      ORIENTATIONS.find((o) => o.value === orientation)?.flux ?? 450;
    const floorAreaSI = toSI(num(vals.floorArea), 'area', sys);
    const heightSI = toSI(num(vals.ceilingHeight), 'length', sys);
    return coolingLoad({
      outdoorDB: tempToSI(num(vals.outdoorDB), sys),
      outdoorRH: num(vals.outdoorRH),
      indoorDB: tempToSI(num(vals.indoorDB), sys),
      indoorRH: num(vals.indoorRH),
      wallArea: toSI(num(vals.wallArea), 'area', sys),
      wallU: toSI(num(vals.wallU), 'uValue', sys),
      roofArea: toSI(num(vals.roofArea), 'area', sys),
      roofU: toSI(num(vals.roofU), 'uValue', sys),
      roofSunlit,
      glassArea: toSI(num(vals.glassArea), 'area', sys),
      glassU: toSI(num(vals.glassU), 'uValue', sys),
      glassSHGC: num(vals.glassSHGC),
      solarFlux: flux,
      volume: floorAreaSI * heightSI,
      peopleSensible: act.sensible,
      peopleLatent: act.latent,
      people: num(vals.people),
      lightingW: num(vals.lightingW),
      equipmentW: num(vals.equipmentW),
      outdoorAirLs: toSI(num(vals.outdoorAir), 'airflow', sys),
      infiltrationACH: num(vals.infiltrationACH),
      safetyPct: num(vals.safetyPct),
    });
  }, [vals, sys, orientation, activity, roofSunlit]);

  const pUnit = uLabel('power', sys);
  const showP = (w: number) => fmt(toDisp(w / 1000, 'power', sys), 2);

  return (
    <>
      <UnitToggle />

      <SectionLabel>Design conditions</SectionLabel>
      <Grid>
        <Field
          label="Outdoor dry-bulb"
          value={vals.outdoorDB}
          onChange={(v) => set('outdoorDB', v)}
          unit={tempLabel(sys)}
        />
        <Field
          label="Outdoor relative humidity"
          value={vals.outdoorRH}
          onChange={(v) => set('outdoorRH', v)}
          unit="%"
        />
        <Field
          label="Indoor dry-bulb"
          value={vals.indoorDB}
          onChange={(v) => set('indoorDB', v)}
          unit={tempLabel(sys)}
        />
        <Field
          label="Indoor relative humidity"
          value={vals.indoorRH}
          onChange={(v) => set('indoorRH', v)}
          unit="%"
        />
      </Grid>

      <SectionLabel>Envelope</SectionLabel>
      <Grid>
        <Field
          label="Floor area"
          value={vals.floorArea}
          onChange={(v) => set('floorArea', v)}
          unit={uLabel('area', sys)}
        />
        <Field
          label="Ceiling height"
          value={vals.ceilingHeight}
          onChange={(v) => set('ceilingHeight', v)}
          unit={uLabel('length', sys)}
          step={0.1}
        />
        <Field
          label="Exposed wall area"
          value={vals.wallArea}
          onChange={(v) => set('wallArea', v)}
          unit={uLabel('area', sys)}
        />
        <Field
          label="Wall U-value"
          value={vals.wallU}
          onChange={(v) => set('wallU', v)}
          unit={uLabel('uValue', sys)}
          step={0.1}
        />
        <Field
          label="Roof area (0 if not top floor)"
          value={vals.roofArea}
          onChange={(v) => set('roofArea', v)}
          unit={uLabel('area', sys)}
        />
        <Field
          label="Roof U-value"
          value={vals.roofU}
          onChange={(v) => set('roofU', v)}
          unit={uLabel('uValue', sys)}
          step={0.1}
        />
        <Field
          label="Glass area"
          value={vals.glassArea}
          onChange={(v) => set('glassArea', v)}
          unit={uLabel('area', sys)}
        />
        <Field
          label="Glass U-value"
          value={vals.glassU}
          onChange={(v) => set('glassU', v)}
          unit={uLabel('uValue', sys)}
          step={0.1}
        />
        <Field
          label="Glass SHGC (0–1)"
          value={vals.glassSHGC}
          onChange={(v) => set('glassSHGC', v)}
          step={0.05}
        />
        <SelectField
          label="Main glazing orientation"
          value={orientation}
          onChange={setOrientation}
          options={ORIENTATIONS}
        />
      </Grid>
      <div className="mt-2">
        <CheckField
          label="Roof exposed to sun"
          checked={roofSunlit}
          onChange={setRoofSunlit}
        />
      </div>

      <SectionLabel>Internal gains</SectionLabel>
      <Grid>
        <Field
          label="Number of people"
          value={vals.people}
          onChange={(v) => set('people', v)}
        />
        <SelectField
          label="Activity level"
          value={activity}
          onChange={setActivity}
          options={ACTIVITIES}
        />
        <Field
          label="Lighting load"
          value={vals.lightingW}
          onChange={(v) => set('lightingW', v)}
          unit="W"
        />
        <Field
          label="Equipment load"
          value={vals.equipmentW}
          onChange={(v) => set('equipmentW', v)}
          unit="W"
        />
      </Grid>

      <SectionLabel>Air and margin</SectionLabel>
      <Grid>
        <Field
          label="Outdoor (fresh) air"
          value={vals.outdoorAir}
          onChange={(v) => set('outdoorAir', v)}
          unit={uLabel('airflow', sys)}
        />
        <Field
          label="Infiltration"
          value={vals.infiltrationACH}
          onChange={(v) => set('infiltrationACH', v)}
          unit="ACH"
          step={0.1}
        />
        <Field
          label="Safety factor"
          value={vals.safetyPct}
          onChange={(v) => set('safetyPct', v)}
          unit="%"
        />
      </Grid>

      {/* Breakdown */}
      <SectionLabel>Load breakdown</SectionLabel>
      <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-100 text-left text-[11px] uppercase tracking-wide text-slate-500 dark:bg-slate-800">
              <th className="px-3 py-2 font-semibold">Component</th>
              <th className="px-3 py-2 text-right font-semibold">
                Sensible {pUnit}
              </th>
              <th className="px-3 py-2 text-right font-semibold">
                Latent {pUnit}
              </th>
            </tr>
          </thead>
          <tbody>
            {r.components.map((c) => (
              <tr
                key={c.name}
                className="border-t border-slate-100 dark:border-slate-800"
              >
                <td className="px-3 py-1.5 text-slate-700 dark:text-slate-300">
                  {c.name}
                </td>
                <td className="px-3 py-1.5 text-right font-mono text-slate-600 dark:text-slate-400">
                  {showP(c.sensible)}
                </td>
                <td className="px-3 py-1.5 text-right font-mono text-slate-600 dark:text-slate-400">
                  {c.latent > 0 ? showP(c.latent) : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Results
        rows={[
          ['Sensible load', `${showP(r.sensible)} ${pUnit}`],
          ['Latent load', `${showP(r.latent)} ${pUnit}`],
          ['Sensible heat ratio', fmt(r.shr, 2)],
          [
            'Total cooling load',
            `${fmt(r.total / 1000, 2)} kW  ·  ${fmt(r.tons, 1)} tons`,
          ],
        ]}
      />
      <Note>
        A design-day component estimate (conduction, solar, internal, fresh air
        and infiltration). For a final design, follow it with a room-by-room
        RTS calculation — see the Load Calculations section.
      </Note>
    </>
  );
}

// ===========================================================================
// 3. Duct sizing — McQuay Ductsizer style
// ===========================================================================

function DuctSizingCalc() {
  const { sys, vals, set } = useUnitInputs(
    { flow: '500', friction: '1', velocity: '5', side: '300' },
    {
      flow: 'airflow',
      friction: 'ductFric',
      velocity: 'velocity',
      side: 'dia',
    },
  );
  const [method, setMethod] = useState('friction');
  const [shape, setShape] = useState('round');

  const r = useMemo(() => {
    const flowM3s = toSI(num(vals.flow), 'airflow', sys) / 1000;
    const diaM =
      method === 'friction'
        ? ductDiaForFriction(flowM3s, toSI(num(vals.friction), 'ductFric', sys))
        : ductDiaForVelocity(flowM3s, toSI(num(vals.velocity), 'velocity', sys));
    const pt = ductAt(flowM3s, diaM);
    const stdMm = nextStandardDuct(diaM * 1000);
    let rectOther = 0;
    if (shape === 'rectangular') {
      const sideM = toSI(num(vals.side), 'dia', sys) / 1000;
      if (sideM > 0) rectOther = rectSideForDia(diaM, sideM);
    }
    return { diaM, pt, stdMm, rectOther };
  }, [vals, sys, method, shape]);

  const rows: [string, string][] = [
    [
      'Required round diameter',
      `${fmt(toDisp(r.diaM * 1000, 'dia', sys), sys === 'IP' ? 2 : 0)} ${uLabel('dia', sys)}`,
    ],
  ];
  if (shape === 'round') {
    rows.push([
      'Next standard size',
      `${fmt(toDisp(r.stdMm, 'dia', sys), sys === 'IP' ? 2 : 0)} ${uLabel('dia', sys)}`,
    ]);
  } else {
    rows.push([
      'Rectangular size',
      `${fmt(toDisp(r.rectOther * 1000, 'dia', sys), 0)} × ${fmt(
        toDisp(toSI(num(vals.side), 'dia', sys), 'dia', sys),
        0,
      )} ${uLabel('dia', sys)}`,
    ]);
  }
  rows.push(
    ['Velocity', `${fmt(toDisp(r.pt.velocity, 'velocity', sys), sys === 'IP' ? 0 : 2)} ${uLabel('velocity', sys)}`],
    ['Friction rate', `${fmt(toDisp(r.pt.frictionRate, 'ductFric', sys), 2)} ${uLabel('ductFric', sys)}`],
    ['Velocity pressure', `${fmt(toDisp(r.pt.velocityPressure, 'pressure', sys), sys === 'IP' ? 3 : 1)} ${uLabel('pressure', sys)}`],
  );

  return (
    <>
      <UnitToggle />
      <Grid>
        <Field
          label="Airflow"
          value={vals.flow}
          onChange={(v) => set('flow', v)}
          unit={uLabel('airflow', sys)}
        />
        <SelectField
          label="Size by"
          value={method}
          onChange={setMethod}
          options={[
            { value: 'friction', label: 'Friction rate' },
            { value: 'velocity', label: 'Velocity' },
          ]}
        />
        {method === 'friction' ? (
          <Field
            label="Target friction rate"
            value={vals.friction}
            onChange={(v) => set('friction', v)}
            unit={uLabel('ductFric', sys)}
            step={0.1}
          />
        ) : (
          <Field
            label="Target velocity"
            value={vals.velocity}
            onChange={(v) => set('velocity', v)}
            unit={uLabel('velocity', sys)}
            step={0.5}
          />
        )}
        <SelectField
          label="Duct shape"
          value={shape}
          onChange={setShape}
          options={[
            { value: 'round', label: 'Round' },
            { value: 'rectangular', label: 'Rectangular' },
          ]}
        />
        {shape === 'rectangular' && (
          <Field
            label="Known duct height"
            value={vals.side}
            onChange={(v) => set('side', v)}
            unit={uLabel('dia', sys)}
            step={25}
          />
        )}
      </Grid>
      <Results rows={rows} />
      <Note>
        Sized from the Colebrook duct-friction equation for galvanised steel.
        Comfort ducts typically run 4–6 m/s or about 0.8–1.2 Pa/m.
      </Note>
    </>
  );
}

// ===========================================================================
// 4. Pipe sizing — McQuay Pipesizer style
// ===========================================================================

function PipeSizingCalc() {
  const { sys, vals, set } = useUnitInputs(
    { flow: '10', load: '35', dt: '5' },
    { flow: 'waterFlow', load: 'coolingLoad', dt: 'dtemp' },
  );
  const [mode, setMode] = useState('load');
  const [material, setMaterial] = useState<'steel' | 'copper'>('steel');

  const r = useMemo(() => {
    // delta-T: the field is in K (SI) or °F-degrees (IP); waterFlow needs K.
    const dtSI = num(vals.dt) / (sys === 'IP' ? 1.8 : 1);
    const flowLs =
      mode === 'load'
        ? waterFlow(
            toSI(num(vals.load), 'coolingLoad', sys),
            dtSI > 0 ? dtSI : 0.001,
          )
        : toSI(num(vals.flow), 'waterFlow', sys);
    const flowM3s = flowLs / 1000;
    const sizes = material === 'steel' ? STEEL_SCH40 : COPPER_L;
    const rows = sizes.map((s) => {
      const pt = pipeAt(flowM3s, s.idMm / 1000, material);
      return { ...s, ...pt };
    });
    // Recommend the smallest size within both the velocity and friction
    // guidelines; fall back to velocity only, then to the largest size.
    const recommended =
      rows.find((x) => x.velocity <= 2.4 && x.frictionRate <= 400) ??
      rows.find((x) => x.velocity <= 2.4) ??
      rows[rows.length - 1];
    return { flowLs, rows, recommended };
  }, [vals, sys, mode, material]);

  return (
    <>
      <UnitToggle />
      <Grid>
        <SelectField
          label="Flow from"
          value={mode}
          onChange={setMode}
          options={[
            { value: 'load', label: 'Cooling load and delta-T' },
            { value: 'direct', label: 'Known flow rate' },
          ]}
        />
        <SelectField
          label="Pipe material"
          value={material}
          onChange={(v) => setMaterial(v as 'steel' | 'copper')}
          options={[
            { value: 'steel', label: 'Steel, Schedule 40' },
            { value: 'copper', label: 'Copper, Type L' },
          ]}
        />
        {mode === 'load' ? (
          <>
            <Field
              label="Cooling load"
              value={vals.load}
              onChange={(v) => set('load', v)}
              unit={uLabel('coolingLoad', sys)}
            />
            <Field
              label="Chilled-water delta-T"
              value={vals.dt}
              onChange={(v) => set('dt', v)}
              unit={sys === 'IP' ? '°F' : 'K'}
              step={0.5}
            />
          </>
        ) : (
          <Field
            label="Flow rate"
            value={vals.flow}
            onChange={(v) => set('flow', v)}
            unit={uLabel('waterFlow', sys)}
          />
        )}
      </Grid>

      <p className="mt-4 text-sm text-slate-500">
        Design flow:{' '}
        <span className="font-mono font-bold text-teal-700 dark:text-teal-300">
          {fmt(toDisp(r.flowLs, 'waterFlow', sys), 2)} {uLabel('waterFlow', sys)}
        </span>
      </p>

      <div className="mt-2 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-100 text-left text-[11px] uppercase tracking-wide text-slate-500 dark:bg-slate-800">
              <th className="px-3 py-2 font-semibold">Size</th>
              <th className="px-3 py-2 text-right font-semibold">
                Velocity {uLabel('pipeVel', sys)}
              </th>
              <th className="px-3 py-2 text-right font-semibold">
                Friction {uLabel('pipeFric', sys)}
              </th>
            </tr>
          </thead>
          <tbody>
            {r.rows.map((x) => {
              const rec = x.label === r.recommended.label;
              return (
                <tr
                  key={x.label}
                  className={`border-t border-slate-100 dark:border-slate-800 ${
                    rec ? 'bg-teal-50 dark:bg-teal-950/50' : ''
                  }`}
                >
                  <td
                    className={`px-3 py-1.5 ${
                      rec
                        ? 'font-bold text-teal-800 dark:text-teal-300'
                        : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {x.label}
                    {rec && (
                      <span className="ml-1.5 text-[10px] font-bold uppercase">
                        ← pick
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-1.5 text-right font-mono text-slate-600 dark:text-slate-400">
                    {fmt(toDisp(x.velocity, 'pipeVel', sys), 2)}
                  </td>
                  <td className="px-3 py-1.5 text-right font-mono text-slate-600 dark:text-slate-400">
                    {fmt(toDisp(x.frictionRate, 'pipeFric', sys), sys === 'IP' ? 2 : 0)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Note>
        The highlighted size is the smallest that keeps velocity at or below
        ~2.4 m/s and friction at or below ~400 Pa/m. Friction is from the
        Colebrook equation for water — pick from the table to suit your run.
      </Note>
    </>
  );
}

// ===========================================================================
// 5. Fan calculator — Sodeca Quick Fan style
// ===========================================================================

function FanCalc() {
  const { sys, vals, set } = useUnitInputs(
    { flow: '2000', pressure: '400', etaFan: '65', etaMotor: '88' },
    { flow: 'airflow', pressure: 'pressure', etaFan: null, etaMotor: null },
  );
  const [drive, setDrive] = useState('direct');

  const r = useMemo(() => {
    const flowM3s = toSI(num(vals.flow), 'airflow', sys) / 1000;
    const dpPa = toSI(num(vals.pressure), 'pressure', sys);
    const etaDrive = drive === 'belt' ? 0.95 : 1;
    const fp = fanPower(
      flowM3s,
      dpPa,
      Math.max(num(vals.etaFan) / 100, 0.01),
      Math.max(num(vals.etaMotor) / 100, 0.01),
      etaDrive,
    );
    const flowDisp = toDisp(flowM3s * 1000, 'airflow', sys);
    return {
      ...fp,
      motorSize: nextMotorSize(fp.motorInput / 1000),
      sfp: flowDisp > 0 ? fp.motorInput / flowDisp : 0,
    };
  }, [vals, sys, drive]);

  return (
    <>
      <UnitToggle />
      <Grid>
        <Field
          label="Airflow"
          value={vals.flow}
          onChange={(v) => set('flow', v)}
          unit={uLabel('airflow', sys)}
        />
        <Field
          label="Total pressure"
          value={vals.pressure}
          onChange={(v) => set('pressure', v)}
          unit={uLabel('pressure', sys)}
        />
        <Field
          label="Fan efficiency"
          value={vals.etaFan}
          onChange={(v) => set('etaFan', v)}
          unit="%"
        />
        <Field
          label="Motor efficiency"
          value={vals.etaMotor}
          onChange={(v) => set('etaMotor', v)}
          unit="%"
        />
        <SelectField
          label="Drive"
          value={drive}
          onChange={setDrive}
          options={[
            { value: 'direct', label: 'Direct drive' },
            { value: 'belt', label: 'Belt drive' },
          ]}
        />
      </Grid>
      <Results
        rows={[
          ['Air power', `${fmt(toDisp(r.airPower / 1000, 'fanPower', sys), 3)} ${uLabel('fanPower', sys)}`],
          ['Fan shaft power', `${fmt(toDisp(r.shaftPower / 1000, 'fanPower', sys), 3)} ${uLabel('fanPower', sys)}`],
          ['Motor input power', `${fmt(toDisp(r.motorInput / 1000, 'fanPower', sys), 3)} ${uLabel('fanPower', sys)}`],
          [
            'Recommended motor',
            `${fmt(toDisp(r.motorSize, 'fanPower', sys), 2)} ${uLabel('fanPower', sys)}`,
          ],
          ['Specific fan power', `${fmt(r.sfp, 2)} W per ${uLabel('airflow', sys)}`],
        ]}
      />
      <Note>
        Air power = pressure × flow; shaft power divides by fan efficiency;
        motor input divides by motor and drive efficiency. A good all-in
        specific fan power for a comfort system is roughly 1.5–2.0 W per L/s.
      </Note>
    </>
  );
}

// ===========================================================================
// 6. Fan and pump affinity laws
// ===========================================================================

function AffinityCalc() {
  const [flow1, setFlow1] = useState('1000');
  const [pres1, setPres1] = useState('250');
  const [pow1, setPow1] = useState('1.5');
  const [speed1, setSpeed1] = useState('1450');
  const [speed2, setSpeed2] = useState('1100');

  const r = useMemo(() => {
    const ratio = num(speed1) > 0 ? num(speed2) / num(speed1) : 0;
    return {
      ratio,
      flow: num(flow1) * ratio,
      pres: num(pres1) * ratio * ratio,
      pow: num(pow1) * ratio * ratio * ratio,
    };
  }, [flow1, pres1, pow1, speed1, speed2]);

  return (
    <>
      <Grid>
        <Field label="Flow at speed 1" value={flow1} onChange={setFlow1} unit="L/s" />
        <Field label="Pressure or head at speed 1" value={pres1} onChange={setPres1} unit="Pa" />
        <Field label="Power at speed 1" value={pow1} onChange={setPow1} unit="kW" step={0.1} />
        <Field label="Speed 1" value={speed1} onChange={setSpeed1} unit="rpm" />
        <Field label="New speed 2" value={speed2} onChange={setSpeed2} unit="rpm" />
      </Grid>
      <Results
        rows={[
          ['Speed ratio', fmt(r.ratio, 3)],
          ['New flow', `${fmt(r.flow, 0)} L/s`],
          ['New pressure or head', `${fmt(r.pres, 0)} Pa`],
          ['New power', `${fmt(r.pow, 2)} kW`],
        ]}
      />
      <Note>
        Flow scales with speed, pressure with speed squared, power with speed
        cubed — a small speed cut saves large energy.
      </Note>
    </>
  );
}

// ===========================================================================
// 7. Unit converter
// ===========================================================================

const CONV: Record<
  string,
  { label: string; units: { name: string; toBase: number }[] }
> = {
  airflow: {
    label: 'Airflow',
    units: [
      { name: 'L/s', toBase: 0.001 },
      { name: 'm³/h', toBase: 1 / 3600 },
      { name: 'm³/s', toBase: 1 },
      { name: 'CFM', toBase: 0.000471947 },
    ],
  },
  capacity: {
    label: 'Cooling capacity',
    units: [
      { name: 'kW', toBase: 1000 },
      { name: 'ton', toBase: 3516.85 },
      { name: 'Btu/h', toBase: 0.293071 },
      { name: 'kcal/h', toBase: 1.16222 },
    ],
  },
  pressure: {
    label: 'Pressure',
    units: [
      { name: 'Pa', toBase: 1 },
      { name: 'kPa', toBase: 1000 },
      { name: 'in WG', toBase: 249.089 },
      { name: 'mm WG', toBase: 9.80665 },
      { name: 'bar', toBase: 100000 },
      { name: 'psi', toBase: 6894.76 },
    ],
  },
  velocity: {
    label: 'Velocity',
    units: [
      { name: 'm/s', toBase: 1 },
      { name: 'fpm', toBase: 0.00508 },
      { name: 'km/h', toBase: 1 / 3.6 },
    ],
  },
  power: {
    label: 'Power',
    units: [
      { name: 'W', toBase: 1 },
      { name: 'kW', toBase: 1000 },
      { name: 'hp', toBase: 745.7 },
      { name: 'Btu/h', toBase: 0.293071 },
    ],
  },
};

function UnitConverter() {
  const [cat, setCat] = useState('airflow');
  const [value, setValue] = useState('100');
  const [unit, setUnit] = useState('L/s');
  const [tempC, setTempC] = useState('24');

  const catData = CONV[cat];
  const rows = useMemo<[string, string][]>(() => {
    if (cat === 'temperature') {
      const c = num(tempC);
      return [
        ['Celsius', `${fmt(c, 2)} °C`],
        ['Fahrenheit', `${fmt(c * 1.8 + 32, 2)} °F`],
        ['Kelvin', `${fmt(c + 273.15, 2)} K`],
      ];
    }
    const from = catData.units.find((u) => u.name === unit);
    if (!from) return [];
    const base = num(value) * from.toBase;
    return catData.units.map((u) => [u.name, fmt(base / u.toBase, 3)]) as [
      string,
      string,
    ][];
  }, [cat, value, unit, tempC, catData]);

  const categories = [
    ...Object.entries(CONV).map(([v, d]) => ({ value: v, label: d.label })),
    { value: 'temperature', label: 'Temperature' },
  ];

  return (
    <>
      <Grid>
        <SelectField
          label="Category"
          value={cat}
          onChange={(c) => {
            setCat(c);
            if (CONV[c]) setUnit(CONV[c].units[0].name);
          }}
          options={categories}
        />
        {cat === 'temperature' ? (
          <Field label="Temperature" value={tempC} onChange={setTempC} unit="°C" />
        ) : (
          <>
            <Field label="Value" value={value} onChange={setValue} />
            <SelectField
              label="From unit"
              value={unit}
              onChange={setUnit}
              options={catData.units.map((u) => ({
                value: u.name,
                label: u.name,
              }))}
            />
          </>
        )}
      </Grid>
      <Results rows={rows} />
      <Note>Conversions update live as you type.</Note>
    </>
  );
}

// ===========================================================================
// 8. Refrigerant additional-charge estimator
// ===========================================================================

const LIQUID_LINES: { value: string; label: string; gPerM: number }[] = [
  { value: '6.35', label: '6.35 mm (1/4 in)', gPerM: 20 },
  { value: '9.52', label: '9.52 mm (3/8 in)', gPerM: 55 },
  { value: '12.7', label: '12.7 mm (1/2 in)', gPerM: 110 },
  { value: '15.88', label: '15.88 mm (5/8 in)', gPerM: 170 },
  { value: '19.05', label: '19.05 mm (3/4 in)', gPerM: 250 },
  { value: '22.2', label: '22.2 mm (7/8 in)', gPerM: 330 },
];

function RefrigerantChargeCalc() {
  const [line, setLine] = useState('9.52');
  const [length, setLength] = useState('30');
  const [base, setBase] = useState('3.5');

  const r = useMemo(() => {
    const g = LIQUID_LINES.find((l) => l.value === line)?.gPerM ?? 55;
    const add = (num(length) * g) / 1000;
    return { add, total: add + num(base) };
  }, [line, length, base]);

  return (
    <>
      <Grid>
        <SelectField
          label="Liquid line size"
          value={line}
          onChange={setLine}
          options={LIQUID_LINES}
        />
        <Field label="Total liquid line length" value={length} onChange={setLength} unit="m" />
        <Field label="Factory (base) charge" value={base} onChange={setBase} unit="kg" step={0.1} />
      </Grid>
      <Results
        rows={[
          ['Additional charge needed', `${fmt(r.add, 2)} kg`],
          ['Estimated total system charge', `${fmt(r.total, 2)} kg`],
        ]}
      />
      <Note>
        Indicative charge factors only — always use the additional-charge table
        from the specific outdoor unit&rsquo;s technical manual.
      </Note>
    </>
  );
}

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

export interface ToolDef {
  id: string;
  title: string;
  description: string;
  icon: string;
  Component: () => JSX.Element;
}

export const TOOLS: ToolDef[] = [
  {
    id: 'psychrometrics',
    title: 'Psychrometric Calculator',
    description:
      'Enter dry-bulb and humidity — get wet-bulb, dew point, enthalpy and more.',
    icon: 'Sigma',
    Component: PsychrometricCalc,
  },
  {
    id: 'cooling-load',
    title: 'Cooling Load Calculator',
    description:
      'A component-method cooling load — envelope, solar, internal gains and air.',
    icon: 'Snowflake',
    Component: CoolingLoadCalc,
  },
  {
    id: 'duct-sizing',
    title: 'Duct Sizing',
    description: 'Friction-rate duct sizing, round and rectangular, SI or IP.',
    icon: 'Wind',
    Component: DuctSizingCalc,
  },
  {
    id: 'pipe-sizing',
    title: 'Pipe Sizing',
    description: 'Water pipe sizing with a size table for steel or copper.',
    icon: 'Droplets',
    Component: PipeSizingCalc,
  },
  {
    id: 'fan-calculator',
    title: 'Fan Calculator',
    description: 'Fan air, shaft and motor power, motor size and specific fan power.',
    icon: 'Fan',
    Component: FanCalc,
  },
  {
    id: 'affinity-laws',
    title: 'Fan and Pump Laws',
    description: 'Flow, pressure and power when a fan or pump speed changes.',
    icon: 'Gauge',
    Component: AffinityCalc,
  },
  {
    id: 'unit-converter',
    title: 'HVAC Unit Converter',
    description: 'Airflow, capacity, pressure, velocity, power and temperature.',
    icon: 'Calculator',
    Component: UnitConverter,
  },
  {
    id: 'refrigerant-charge',
    title: 'Refrigerant Charge',
    description: 'Additional refrigerant charge from liquid line size and length.',
    icon: 'Thermometer',
    Component: RefrigerantChargeCalc,
  },
];

export function getTool(id: string): ToolDef | undefined {
  return TOOLS.find((t) => t.id === id);
}
