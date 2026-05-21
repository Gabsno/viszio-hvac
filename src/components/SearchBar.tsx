import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { searchArticles } from '../lib/search';
import { pillarTitle, topicTitle } from '../lib/content';
import { DifficultyBadge, TierBadge } from './Badges';
import type { SearchHit } from '../types';

interface Props {
  /** Full-screen variant used inside the mobile overlay. */
  fullScreen?: boolean;
  onNavigate?: () => void;
  autoFocus?: boolean;
}

function highlight(text: string, query: string) {
  const terms = query.trim().split(/\s+/).filter((t) => t.length > 1);
  if (terms.length === 0) return text;
  const re = new RegExp(
    `(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
    'gi',
  );
  return text.split(re).map((part, i) =>
    re.test(part) ? (
      <mark key={i} className="rounded bg-teal-200 px-0.5 dark:bg-teal-700/70">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export function SearchBar({ fullScreen, onNavigate, autoFocus }: Props) {
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Debounce 150ms
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 150);
    return () => clearTimeout(t);
  }, [query]);

  const hits: SearchHit[] = useMemo(
    () => searchArticles(debounced, 8),
    [debounced],
  );

  useEffect(() => setActive(0), [debounced]);

  // "/" focuses the search from anywhere.
  useEffect(() => {
    if (fullScreen) return;
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName;
      if (
        e.key === '/' &&
        tag !== 'INPUT' &&
        tag !== 'TEXTAREA' &&
        !(e.target as HTMLElement)?.isContentEditable
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [fullScreen]);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  function goTo(hit: SearchHit) {
    navigate(`/article/${hit.article.id}`);
    setQuery('');
    setOpen(false);
    onNavigate?.();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      setOpen(false);
      inputRef.current?.blur();
      onNavigate?.();
      return;
    }
    if (hits.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => (a + 1) % hits.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => (a - 1 + hits.length) % hits.length);
    } else if (e.key === 'Enter' && hits[active]) {
      e.preventDefault();
      goTo(hits[active]);
    }
  }

  const showDropdown = open && debounced.trim().length >= 2;

  return (
    <div className={fullScreen ? 'relative' : 'relative w-full'}>
      <div className="relative">
        <Search
          size={17}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          placeholder="Search the HVAC library…"
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={onKeyDown}
          className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-9 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
        {query ? (
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        ) : (
          !fullScreen && (
            <kbd className="absolute right-2.5 top-1/2 hidden -translate-y-1/2 rounded border border-slate-300 px-1.5 text-[11px] text-slate-400 sm:block dark:border-slate-600">
              /
            </kbd>
          )
        )}
      </div>

      {showDropdown && (
        <div
          className={`${
            fullScreen
              ? 'mt-2'
              : 'absolute left-0 right-0 top-full z-50 mt-2 max-h-[70vh] overflow-y-auto'
          } rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-slate-700 dark:bg-slate-900`}
        >
          {hits.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-slate-400">
              No articles match “{debounced}”.
            </p>
          ) : (
            hits.map((hit, i) => (
              <button
                key={hit.article.id}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => goTo(hit)}
                onMouseEnter={() => setActive(i)}
                className={`block w-full rounded-lg px-3 py-2.5 text-left transition ${
                  i === active
                    ? 'bg-teal-50 dark:bg-teal-950/50'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="flex-1 truncate text-sm font-semibold text-slate-900 dark:text-white">
                    {highlight(hit.article.title, debounced)}
                  </span>
                  <DifficultyBadge value={hit.article.difficulty} />
                  <TierBadge value={hit.article.tier} />
                </div>
                <div className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-teal-700 dark:text-teal-400">
                  {pillarTitle(hit.article.pillar)} ›{' '}
                  {topicTitle(hit.article.topic)}
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
                  {highlight(hit.snippet, debounced)}
                </p>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
