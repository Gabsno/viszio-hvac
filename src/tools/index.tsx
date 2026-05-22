import { useMemo, useState } from 'react';
import {
  psychrometrics,
  pressureAtElevation,
  ductDiameter,
  nextStandardDuct,
  equivalentDiameter,
  pipeDiameter,
  waterFlow,
} from './calc';

// ---------------------------------------------------------------------------
// Shared input / output building blocks
// ---------------------------------------------------------------------------

const num = (s: string): number => {
  const v = parseFloat(s);
  return Number.isFinite(v) ? v : 0;
};
const fmt = (v: number, d = 1): string =>
  Number.isFinite(v) ? v.toFixed(d) : '—';

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
      <span className="flex items-center gap-2">
        <input
          type="number"
          inputMode="decimal"
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 dark:border-slate-700 dark:bg-slate-800"
        />
        {unit && (
          <span className="shrink-0 text-xs font-medium text-slate-400">
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

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2">{children}</div>;
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 text-xs text-slate-400">{children}</p>
  );
}

// ---------------------------------------------------------------------------
// 1. Psychrometric calculator
// ---------------------------------------------------------------------------

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
      <Note>
        Moist-air properties at the given barometric pressure. Accra sits near
        sea level (~61 m), so the standard 101.3 kPa is a fine default.
      </Note>
    </>
  );
}

// ---------------------------------------------------------------------------
// 2. Quick cooling-load estimator
// ---------------------------------------------------------------------------

const SPACE_TYPES: { value: string; label: string; wm2: number }[] = [
  { value: 'office', label: 'Office', wm2: 95 },
  { value: 'retail', label: 'Retail / shop', wm2: 120 },
  { value: 'restaurant', label: 'Restaurant', wm2: 200 },
  { value: 'classroom', label: 'Classroom', wm2: 110 },
  { value: 'residential', label: 'Residential', wm2: 80 },
  { value: 'hotel', label: 'Hotel room', wm2: 90 },
  { value: 'hospital', label: 'Hospital ward', wm2: 130 },
  { value: 'server', label: 'Server / IT room', wm2: 500 },
  { value: 'gym', label: 'Gym', wm2: 130 },
  { value: 'warehouse', label: 'Warehouse', wm2: 55 },
];

function CoolingLoadCalc() {
  const [area, setArea] = useState('100');
  const [type, setType] = useState('office');
  const [oa, setOa] = useState('150');

  const r = useMemo(() => {
    const w = SPACE_TYPES.find((s) => s.value === type)?.wm2 ?? 95;
    const envelope = (num(area) * w) / 1000; // kW
    // Outdoor-air load in Accra: ~0.045 kW per L/s (sensible + latent)
    const ventilation = num(oa) * 0.045;
    const total = envelope + ventilation;
    return { envelope, ventilation, total, tons: total / 3.517 };
  }, [area, type, oa]);

  return (
    <>
      <Grid>
        <Field label="Floor area" value={area} onChange={setArea} unit="m²" />
        <SelectField
          label="Space type"
          value={type}
          onChange={setType}
          options={SPACE_TYPES}
        />
        <Field label="Outdoor (fresh) air" value={oa} onChange={setOa} unit="L/s" />
      </Grid>
      <Results
        rows={[
          ['Envelope and internal load', `${fmt(r.envelope)} kW`],
          ['Outdoor-air load', `${fmt(r.ventilation)} kW`],
          ['Estimated total cooling', `${fmt(r.total)} kW`],
          ['Equivalent', `${fmt(r.tons, 1)} tons`],
          ['Rough unit count', `${Math.ceil(r.total / 3.5)} × 3.5 kW`],
        ]}
      />
      <Note>
        A rough first-pass estimate using typical load densities. It is not a
        substitute for a room-by-room calculation — see the Load Calculations
        section before you select equipment.
      </Note>
    </>
  );
}

// ---------------------------------------------------------------------------
// 3. Duct sizing
// ---------------------------------------------------------------------------

function DuctSizingCalc() {
  const [flow, setFlow] = useState('500');
  const [vel, setVel] = useState('5');
  const [height, setHeight] = useState('300');

  const r = useMemo(() => {
    const dia = ductDiameter(num(flow), num(vel));
    const std = nextStandardDuct(dia);
    const vp = 0.6 * num(vel) * num(vel);
    // rectangular duct of the chosen height with the same equivalent diameter
    const h = num(height);
    let width = 0;
    if (h > 0) {
      for (let w = 50; w <= 3000; w += 5) {
        if (equivalentDiameter(w, h) >= dia) {
          width = w;
          break;
        }
      }
    }
    return { dia, std, vp, width };
  }, [flow, vel, height]);

  return (
    <>
      <Grid>
        <Field label="Airflow" value={flow} onChange={setFlow} unit="L/s" />
        <Field label="Target velocity" value={vel} onChange={setVel} unit="m/s" step={0.5} />
        <Field label="Rectangular duct height" value={height} onChange={setHeight} unit="mm" step={25} />
      </Grid>
      <Results
        rows={[
          ['Required round diameter', `${fmt(r.dia, 0)} mm`],
          ['Next standard round size', `${r.std} mm`],
          ['Velocity pressure', `${fmt(r.vp)} Pa`],
          [
            'Equivalent rectangular',
            r.width ? `${r.width} × ${height} mm` : '—',
          ],
        ]}
      />
      <Note>
        Velocity-based sizing. Typical limits: ~4–6 m/s for low-noise comfort
        ducts, higher for shafts and risers. See the duct design articles for
        the equal-friction and static-regain methods.
      </Note>
    </>
  );
}

// ---------------------------------------------------------------------------
// 4. Chilled-water pipe sizing
// ---------------------------------------------------------------------------

function PipeSizingCalc() {
  const [mode, setMode] = useState('load');
  const [load, setLoad] = useState('35');
  const [dt, setDt] = useState('5');
  const [flowIn, setFlowIn] = useState('10');
  const [vel, setVel] = useState('1.5');

  const r = useMemo(() => {
    const flow =
      mode === 'load' ? waterFlow(num(load), num(dt)) : num(flowIn);
    const id = pipeDiameter(flow, num(vel));
    // Darcy head loss with a representative friction factor
    const v = num(vel);
    const f = 0.022;
    const dPerM = id > 0 ? (f * (1 / (id / 1000)) * (v * v) * 1000) / 2 : 0; // Pa/m
    return { flow, id, dPerM };
  }, [mode, load, dt, flowIn, vel]);

  return (
    <>
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
        {mode === 'load' ? (
          <>
            <Field label="Cooling load" value={load} onChange={setLoad} unit="kW" />
            <Field label="Chilled-water delta-T" value={dt} onChange={setDt} unit="K" step={0.5} />
          </>
        ) : (
          <Field label="Flow rate" value={flowIn} onChange={setFlowIn} unit="L/s" />
        )}
        <Field label="Target velocity" value={vel} onChange={setVel} unit="m/s" step={0.1} />
      </Grid>
      <Results
        rows={[
          ['Design flow rate', `${fmt(r.flow, 2)} L/s`],
          ['Required inside diameter', `${fmt(r.id, 0)} mm`],
          ['Approx friction loss', `${fmt(r.dPerM, 0)} Pa/m`],
        ]}
      />
      <Note>
        Keep velocity roughly 1–2.4 m/s for smaller pipe and up to ~3 m/s for
        larger pipe to limit noise and erosion. Friction loss is approximate —
        confirm against pipe-specific data.
      </Note>
    </>
  );
}

// ---------------------------------------------------------------------------
// 5. Fan and pump affinity laws
// ---------------------------------------------------------------------------

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
          ['Speed ratio', `${fmt(r.ratio, 3)}`],
          ['New flow', `${fmt(r.flow, 0)} L/s`],
          ['New pressure or head', `${fmt(r.pres, 0)} Pa`],
          ['New power', `${fmt(r.pow, 2)} kW`],
        ]}
      />
      <Note>
        Flow scales with speed, pressure with speed squared, power with speed
        cubed — which is why a small speed cut saves large energy.
      </Note>
    </>
  );
}

// ---------------------------------------------------------------------------
// 6. Unit converter
// ---------------------------------------------------------------------------

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
    return catData.units.map((u) => [
      u.name,
      fmt(base / u.toBase, 3),
    ]) as [string, string][];
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

// ---------------------------------------------------------------------------
// 7. Refrigerant additional-charge estimator
// ---------------------------------------------------------------------------

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
    const add = (num(length) * g) / 1000; // kg
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
        Indicative charge factors only. Always use the additional-charge table
        and pipe-length limits from the specific outdoor unit&rsquo;s technical
        manual — Midea, Daikin and others each publish their own figures.
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
    title: 'Cooling Load Estimator',
    description: 'A fast first-pass cooling load from area, space type and fresh air.',
    icon: 'Snowflake',
    Component: CoolingLoadCalc,
  },
  {
    id: 'duct-sizing',
    title: 'Duct Sizing',
    description: 'Round and rectangular duct sizes for an airflow and target velocity.',
    icon: 'Wind',
    Component: DuctSizingCalc,
  },
  {
    id: 'pipe-sizing',
    title: 'Chilled Water Pipe Sizing',
    description: 'Pipe diameter from a cooling load or a known flow rate.',
    icon: 'Droplets',
    Component: PipeSizingCalc,
  },
  {
    id: 'affinity-laws',
    title: 'Fan and Pump Laws',
    description: 'Flow, pressure and power when a fan or pump speed changes.',
    icon: 'Fan',
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
