import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Library, X } from 'lucide-react';
import { ARTICLES } from '../lib/content';
import { PILLARS } from '../content/pillars';
import { ArticleCard } from '../components/ArticleCard';
import type { Difficulty, Region, Tier } from '../types';

type RegionFilter = Region | 'all';
type TierFilter = Tier | 'all';
type DiffFilter = Difficulty | 'all';

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
        active
          ? 'bg-teal-700 text-white'
          : 'bg-white text-slate-600 ring-1 ring-slate-300 hover:ring-teal-400 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700'
      }`}
    >
      {label}
    </button>
  );
}

export function LibraryPage() {
  const [params, setParams] = useSearchParams();
  const [pillar, setPillar] = useState<string>(params.get('pillar') ?? 'all');
  const [region, setRegion] = useState<RegionFilter>('all');
  const [tier, setTier] = useState<TierFilter>('all');
  const [difficulty, setDifficulty] = useState<DiffFilter>('all');
  const [standard, setStandard] = useState<string>('all');
  const [ghanaOnly, setGhanaOnly] = useState(false);

  useEffect(() => {
    setPillar(params.get('pillar') ?? 'all');
  }, [params]);

  const standards = useMemo(() => {
    const set = new Set<string>();
    for (const a of ARTICLES) a.standards_referenced.forEach((s) => set.add(s));
    return [...set].sort();
  }, []);

  const filtered = useMemo(() => {
    return ARTICLES.filter((a) => {
      if (pillar !== 'all' && a.pillar !== pillar) return false;
      if (region !== 'all' && a.region !== region) return false;
      if (tier !== 'all' && a.tier !== tier) return false;
      if (difficulty !== 'all' && a.difficulty !== difficulty) return false;
      if (standard !== 'all' && !a.standards_referenced.includes(standard))
        return false;
      if (ghanaOnly && !a.ghana_callout && a.region !== 'ghana') return false;
      return true;
    });
  }, [pillar, region, tier, difficulty, standard, ghanaOnly]);

  const anyFilter =
    pillar !== 'all' ||
    region !== 'all' ||
    tier !== 'all' ||
    difficulty !== 'all' ||
    standard !== 'all' ||
    ghanaOnly;

  function reset() {
    setPillar('all');
    setRegion('all');
    setTier('all');
    setDifficulty('all');
    setStandard('all');
    setGhanaOnly(false);
    setParams({});
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-700 text-white">
          <Library size={18} />
        </span>
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            HVAC Library
          </h1>
          <p className="text-xs text-slate-500">
            {ARTICLES.length} articles across {PILLARS.length} pillars
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-5 space-y-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <FilterRow label="Pillar">
          <Chip label="All" active={pillar === 'all'} onClick={() => setPillar('all')} />
          {PILLARS.map((p) => (
            <Chip
              key={p.slug}
              label={p.title}
              active={pillar === p.slug}
              onClick={() => setPillar(p.slug)}
            />
          ))}
        </FilterRow>

        <FilterRow label="Region">
          {(['all', 'global', 'africa', 'ghana'] as RegionFilter[]).map((r) => (
            <Chip
              key={r}
              label={r === 'all' ? 'All' : r[0].toUpperCase() + r.slice(1)}
              active={region === r}
              onClick={() => setRegion(r)}
            />
          ))}
        </FilterRow>

        <FilterRow label="Tier">
          {(['all', 'free', 'pro', 'enterprise'] as TierFilter[]).map((t) => (
            <Chip
              key={t}
              label={t === 'all' ? 'All' : t[0].toUpperCase() + t.slice(1)}
              active={tier === t}
              onClick={() => setTier(t)}
            />
          ))}
        </FilterRow>

        <FilterRow label="Level">
          {(['all', 'beginner', 'intermediate', 'advanced'] as DiffFilter[]).map(
            (d) => (
              <Chip
                key={d}
                label={d === 'all' ? 'All' : d[0].toUpperCase() + d.slice(1)}
                active={difficulty === d}
                onClick={() => setDifficulty(d)}
              />
            ),
          )}
        </FilterRow>

        {standards.length > 0 && (
          <FilterRow label="Standard">
            <Chip
              label="All"
              active={standard === 'all'}
              onClick={() => setStandard('all')}
            />
            {standards.map((s) => (
              <Chip
                key={s}
                label={s}
                active={standard === s}
                onClick={() => setStandard(s)}
              />
            ))}
          </FilterRow>
        )}

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <input
              type="checkbox"
              checked={ghanaOnly}
              onChange={(e) => setGhanaOnly(e.target.checked)}
              className="h-4 w-4 rounded accent-ghana-600"
            />
            🇬🇭 Ghana relevant only
          </label>
          {anyFilter && (
            <button
              onClick={reset}
              className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-rose-500"
            >
              <X size={13} /> Clear filters
            </button>
          )}
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-sm text-slate-400">
          No articles match these filters.
        </p>
      ) : (
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="mr-1 w-16 shrink-0 text-[11px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </span>
      {children}
    </div>
  );
}
