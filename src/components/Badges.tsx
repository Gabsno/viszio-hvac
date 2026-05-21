import type { Difficulty, Region, Tier } from '../types';

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  beginner:
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300',
  intermediate:
    'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
  advanced:
    'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300',
};

export function DifficultyBadge({ value }: { value: Difficulty }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize ${DIFFICULTY_STYLES[value]}`}
    >
      {value}
    </span>
  );
}

const TIER_STYLES: Record<Tier, string> = {
  free: 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
  pro: 'bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300',
  enterprise:
    'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300',
};

export function TierBadge({ value }: { value: Tier }) {
  if (value === 'free') return null;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${TIER_STYLES[value]}`}
    >
      {value}
    </span>
  );
}

export function RegionBadge({ value }: { value: Region }) {
  if (value === 'global') return null;
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-ghana-100 px-2 py-0.5 text-[11px] font-semibold text-ghana-700 dark:bg-ghana-900/40 dark:text-ghana-300">
      {value === 'ghana' ? '🇬🇭 Ghana' : 'Africa'}
    </span>
  );
}
