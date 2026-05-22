import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Info } from 'lucide-react';
import {
  DESIGN_CITIES,
  INDOOR_TARGETS,
  DESIGN_NOTES,
} from '../data/designData';
import { ARTICLES, pillarTitle } from '../lib/content';

export function DesignDataPage() {
  const ghana = DESIGN_CITIES.filter((c) => c.region === 'Ghana');
  const africa = DESIGN_CITIES.filter((c) => c.region === 'Africa');

  const ghanaArticles = useMemo(
    () =>
      ARTICLES.filter(
        (a) => a.ghana_callout || a.region !== 'global',
      ).sort((a, b) => a.title.localeCompare(b.title)),
    [],
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ghana-600 text-white">
          <MapPin size={18} />
        </span>
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Design Data — Ghana &amp; Africa
          </h1>
          <p className="text-xs text-slate-500">
            Outdoor design conditions, indoor targets, and every Ghana-relevant
            article in one place.
          </p>
        </div>
      </div>

      {/* Outdoor design conditions */}
      <section className="mt-6">
        <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-500">
          Outdoor design conditions
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-100 text-left text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800">
                <th className="px-3 py-2 font-semibold">City</th>
                <th className="px-3 py-2 font-semibold">Elev. m</th>
                <th className="px-3 py-2 font-semibold">Cooling DB °C</th>
                <th className="px-3 py-2 font-semibold">MCWB °C</th>
                <th className="px-3 py-2 font-semibold">Climate</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-ghana-50 dark:bg-ghana-950/40">
                <td
                  colSpan={5}
                  className="px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-ghana-700 dark:text-ghana-300"
                >
                  🇬🇭 Ghana
                </td>
              </tr>
              {ghana.map((c) => (
                <CityRow key={c.city} c={c} />
              ))}
              <tr className="bg-slate-100 dark:bg-slate-800">
                <td
                  colSpan={5}
                  className="px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-slate-500"
                >
                  Wider Africa
                </td>
              </tr>
              {africa.map((c) => (
                <CityRow key={c.city} c={c} />
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-slate-400">
          DB = design dry-bulb · MCWB = mean coincident wet-bulb. Representative
          warm-season values — confirm against ASHRAE or local weather data per
          project.
        </p>
      </section>

      {/* Indoor targets */}
      <section className="mt-7">
        <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-500">
          Typical indoor design targets
        </h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {INDOOR_TARGETS.map((t) => (
            <div
              key={t.space}
              className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
            >
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {t.space}
              </p>
              <p className="mt-0.5 font-mono text-sm text-teal-700 dark:text-teal-300">
                {t.tempC} °C · {t.rh}% RH
              </p>
              <p className="mt-1 text-xs text-slate-500">{t.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Notes */}
      <section className="mt-7 rounded-xl border border-teal-200 bg-teal-50/60 p-4 dark:border-teal-800 dark:bg-teal-950/40">
        <h2 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-teal-800 dark:text-teal-300">
          <Info size={15} /> Designing for the climate
        </h2>
        <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
          {DESIGN_NOTES.map((n) => (
            <li key={n} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
              {n}
            </li>
          ))}
        </ul>
      </section>

      {/* Ghana-relevant articles */}
      <section className="mt-7">
        <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-500">
          Ghana-relevant articles ({ghanaArticles.length})
        </h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {ghanaArticles.map((a) => (
            <Link
              key={a.id}
              to={`/article/${a.id}`}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-2.5 text-sm transition hover:border-ghana-400 dark:border-slate-800 dark:bg-slate-900"
            >
              <span className="text-base">🇬🇭</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-semibold text-slate-800 dark:text-slate-200">
                  {a.title}
                </span>
                <span className="text-[11px] text-slate-400">
                  {pillarTitle(a.pillar)}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function CityRow({ c }: { c: (typeof DESIGN_CITIES)[number] }) {
  return (
    <tr className="border-t border-slate-100 dark:border-slate-800">
      <td className="px-3 py-2 font-semibold text-slate-800 dark:text-slate-200">
        {c.city}
        <span className="ml-1 text-xs font-normal text-slate-400">
          {c.country}
        </span>
      </td>
      <td className="px-3 py-2 font-mono text-slate-600 dark:text-slate-400">
        {c.elevation}
      </td>
      <td className="px-3 py-2 font-mono font-bold text-teal-700 dark:text-teal-300">
        {c.coolingDB}
      </td>
      <td className="px-3 py-2 font-mono text-slate-600 dark:text-slate-400">
        {c.coolingMCWB}
      </td>
      <td className="px-3 py-2 text-xs text-slate-500">{c.climate}</td>
    </tr>
  );
}
