import { useMemo, useState } from 'react';
import { BookA, Search, X } from 'lucide-react';
import { GLOSSARY } from '../data/glossary';

export function GlossaryPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const categories = useMemo(
    () => ['all', ...[...new Set(GLOSSARY.map((g) => g.category))].sort()],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GLOSSARY.filter((g) => {
      if (category !== 'all' && g.category !== category) return false;
      if (!q) return true;
      return (
        g.term.toLowerCase().includes(q) ||
        g.definition.toLowerCase().includes(q)
      );
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [query, category]);

  // Group by first letter for the A-Z layout.
  const groups = useMemo(() => {
    const map = new Map<string, typeof GLOSSARY>();
    for (const g of filtered) {
      const letter = g.term[0].toUpperCase();
      const list = map.get(letter) ?? [];
      list.push(g);
      map.set(letter, list);
    }
    return [...map.entries()];
  }, [filtered]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-700 text-white">
          <BookA size={18} />
        </span>
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            HVAC Glossary
          </h1>
          <p className="text-xs text-slate-500">
            {GLOSSARY.length} terms explained in plain language.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mt-4">
        <Search
          size={17}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search terms and definitions…"
          className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-9 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 dark:border-slate-700 dark:bg-slate-800"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            aria-label="Clear"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Category chips */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              category === c
                ? 'bg-teal-700 text-white'
                : 'bg-white text-slate-600 ring-1 ring-slate-300 hover:ring-teal-400 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700'
            }`}
          >
            {c === 'all' ? 'All' : c}
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {filtered.length} {filtered.length === 1 ? 'term' : 'terms'}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-8 text-center text-sm text-slate-400">
          No terms match your search.
        </p>
      ) : (
        <div className="mt-2 space-y-6">
          {groups.map(([letter, entries]) => (
            <section key={letter}>
              <h2 className="mb-1.5 text-sm font-extrabold text-teal-700 dark:text-teal-400">
                {letter}
              </h2>
              <div className="space-y-2">
                {entries.map((g) => (
                  <div
                    key={g.term}
                    className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 dark:text-white">
                        {g.term}
                      </h3>
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-800">
                        {g.category}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      {g.definition}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
