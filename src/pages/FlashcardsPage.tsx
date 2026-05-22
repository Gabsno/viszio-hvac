import { useMemo, useState } from 'react';
import { Layers, RotateCcw, Check, RefreshCw, Sparkles } from 'lucide-react';
import { GLOSSARY, type GlossaryEntry } from '../data/glossary';
import { useProgressStore } from '../store/useProgressStore';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function FlashcardsPage() {
  const known = useProgressStore((s) => s.flashcardsKnown);
  const setCardKnown = useProgressStore((s) => s.setCardKnown);

  const [category, setCategory] = useState('all');
  const [onlyUnknown, setOnlyUnknown] = useState(true);
  const [deckKey, setDeckKey] = useState(0);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [gotThisSession, setGotThisSession] = useState(0);

  const categories = useMemo(
    () => ['all', ...[...new Set(GLOSSARY.map((g) => g.category))].sort()],
    [],
  );

  // Deck is built once per session — snapshot of "known" at build time so it
  // does not reshuffle mid-session when a card is marked.
  const deck = useMemo<GlossaryEntry[]>(() => {
    const snapshot = useProgressStore.getState().flashcardsKnown;
    let pool = GLOSSARY.filter(
      (g) => category === 'all' || g.category === category,
    );
    if (onlyUnknown) pool = pool.filter((g) => !snapshot.includes(g.term));
    return shuffle(pool);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, onlyUnknown, deckKey]);

  function restart() {
    setDeckKey((k) => k + 1);
    setIndex(0);
    setFlipped(false);
    setGotThisSession(0);
  }

  function advance(got: boolean) {
    const card = deck[index];
    if (got && card) {
      setCardKnown(card.term, true);
      setGotThisSession((n) => n + 1);
    }
    setFlipped(false);
    setIndex((i) => i + 1);
  }

  const masteredPct = Math.round((known.length / GLOSSARY.length) * 100);
  const card = deck[index];
  const done = index >= deck.length;

  return (
    <div className="mx-auto max-w-xl px-4 py-6 sm:px-6">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-700 text-white">
          <Layers size={18} />
        </span>
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Flashcards
          </h1>
          <p className="text-xs text-slate-500">
            {known.length} of {GLOSSARY.length} terms mastered ({masteredPct}%)
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            restart();
          }}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold outline-none dark:border-slate-700 dark:bg-slate-800"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === 'all' ? 'All categories' : c}
            </option>
          ))}
        </select>
        <label className="flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <input
            type="checkbox"
            checked={onlyUnknown}
            onChange={(e) => {
              setOnlyUnknown(e.target.checked);
              restart();
            }}
            className="h-4 w-4 rounded accent-teal-600"
          />
          Only cards I haven&rsquo;t mastered
        </label>
      </div>

      {/* Progress */}
      {deck.length > 0 && (
        <div className="mt-4">
          <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <div
              className="h-full rounded-full bg-teal-600 transition-all"
              style={{
                width: `${(Math.min(index, deck.length) / deck.length) * 100}%`,
              }}
            />
          </div>
          <p className="mt-1 text-right text-xs text-slate-400">
            {Math.min(index + (done ? 0 : 1), deck.length)} / {deck.length}
          </p>
        </div>
      )}

      {/* Card / states */}
      {deck.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center dark:border-emerald-800 dark:bg-emerald-950/40">
          <Sparkles size={28} className="mx-auto text-emerald-600" />
          <h2 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
            Nothing to review here
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            You have mastered every card in this selection. Pick another
            category or untick the filter to revise mastered cards.
          </p>
        </div>
      ) : done ? (
        <div className="mt-6 rounded-2xl border border-teal-200 bg-teal-50 p-8 text-center dark:border-teal-800 dark:bg-teal-950/40">
          <Check size={28} className="mx-auto text-teal-600" />
          <h2 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
            Session complete
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            You reviewed {deck.length} cards and marked {gotThisSession} as
            mastered.
          </p>
          <button
            onClick={restart}
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-teal-700 px-4 py-2 text-sm font-bold text-white hover:bg-teal-800"
          >
            <RefreshCw size={15} /> New session
          </button>
        </div>
      ) : (
        card && (
          <>
            <button
              onClick={() => setFlipped((f) => !f)}
              className="mt-5 flex min-h-[12rem] w-full flex-col items-center justify-center rounded-2xl border-2 border-slate-200 bg-white p-6 text-center transition hover:border-teal-400 dark:border-slate-700 dark:bg-slate-900"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {flipped ? card.category : 'Term'}
              </span>
              {flipped ? (
                <p className="mt-2 text-base leading-relaxed text-slate-700 dark:text-slate-200">
                  {card.definition}
                </p>
              ) : (
                <p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
                  {card.term}
                </p>
              )}
              <span className="mt-3 flex items-center gap-1 text-xs text-slate-400">
                <RotateCcw size={12} />
                {flipped ? 'Tap to see term' : 'Tap to reveal definition'}
              </span>
            </button>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => advance(false)}
                className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:border-amber-400 hover:text-amber-700 dark:border-slate-700 dark:text-slate-300"
              >
                Review again
              </button>
              <button
                onClick={() => advance(true)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-teal-800"
              >
                <Check size={15} /> Got it
              </button>
            </div>
          </>
        )
      )}
    </div>
  );
}
