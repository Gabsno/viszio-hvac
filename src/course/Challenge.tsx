import { useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Check,
  CircleAlert,
  CheckSquare,
  Square as SquareIcon,
} from 'lucide-react';
import type { Challenge } from '../types';
import { tapError, tapSuccess } from '../lib/haptics';

interface Props {
  challenge: Challenge;
  /** Called with whether the user got it correct, after they tap Continue. */
  onComplete: (correct: boolean) => void;
}

/** Stable deterministic shuffle so the same challenge renders consistently. */
function seededShuffle<T>(arr: T[], seed: string): T[] {
  const out = [...arr];
  let s = 0;
  for (let i = 0; i < seed.length; i++) s = (s * 31 + seed.charCodeAt(i)) >>> 0;
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) >>> 0;
    const j = s % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function ChallengeView({ challenge, onComplete }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-wide text-teal-700 dark:text-teal-300">
        Try it
      </p>
      <p className="text-base font-semibold text-slate-900 dark:text-white">
        {challenge.prompt}
      </p>

      <div className="mt-4">
        {challenge.type === 'numeric' && (
          <NumericInner
            challenge={challenge}
            submitted={submitted}
            onCheck={(ok) => {
              setCorrect(ok);
              setSubmitted(true);
              if (ok) tapSuccess();
              else tapError();
            }}
          />
        )}
        {challenge.type === 'fill-blank' && (
          <FillBlankInner
            challenge={challenge}
            submitted={submitted}
            onCheck={(ok) => {
              setCorrect(ok);
              setSubmitted(true);
              if (ok) tapSuccess();
              else tapError();
            }}
          />
        )}
        {challenge.type === 'order' && (
          <OrderInner
            challenge={challenge}
            submitted={submitted}
            onCheck={(ok) => {
              setCorrect(ok);
              setSubmitted(true);
              if (ok) tapSuccess();
              else tapError();
            }}
          />
        )}
        {challenge.type === 'multi-select' && (
          <MultiSelectInner
            challenge={challenge}
            submitted={submitted}
            onCheck={(ok) => {
              setCorrect(ok);
              setSubmitted(true);
              if (ok) tapSuccess();
              else tapError();
            }}
          />
        )}
        {challenge.type === 'match' && (
          <MatchInner
            challenge={challenge}
            submitted={submitted}
            onCheck={(ok) => {
              setCorrect(ok);
              setSubmitted(true);
              if (ok) tapSuccess();
              else tapError();
            }}
          />
        )}
      </div>

      {submitted && (
        <div
          className={`mt-4 rounded-lg border p-3 text-sm ${
            correct
              ? 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200'
              : 'border-rose-300 bg-rose-50 text-rose-800 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-200'
          }`}
        >
          <p className="flex items-center gap-1.5 font-bold">
            {correct ? <Check size={15} /> : <CircleAlert size={15} />}
            {correct ? "That's it" : 'Not quite'}
          </p>
          {challenge.explanation && (
            <p className="mt-1 text-[13px] leading-relaxed opacity-90">
              {challenge.explanation}
            </p>
          )}
        </div>
      )}

      {submitted && (
        <button
          onClick={() => onComplete(correct)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-3 text-sm font-bold text-white hover:bg-teal-800"
        >
          Continue <ArrowRight size={16} />
        </button>
      )}
    </article>
  );
}

// ---- Numeric input ----------------------------------------------------------

function NumericInner({
  challenge,
  submitted,
  onCheck,
}: {
  challenge: Challenge & { type: 'numeric' };
  submitted: boolean;
  onCheck: (ok: boolean) => void;
}) {
  const [val, setVal] = useState('');
  const tol = challenge.tolerance ?? 0.05;

  function check() {
    const num = parseFloat(val.replace(',', '.'));
    if (Number.isNaN(num)) {
      onCheck(false);
      return;
    }
    const target = challenge.answer;
    const diff = Math.abs(num - target);
    const allowed = Math.max(Math.abs(target) * tol, 0.001);
    onCheck(diff <= allowed);
  }

  return (
    <div>
      {challenge.hint && (
        <p className="mb-2 rounded-md bg-slate-100 px-2 py-1.5 font-mono text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          {challenge.hint}
        </p>
      )}
      <div className="flex items-center gap-2">
        <input
          type="number"
          inputMode="decimal"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          disabled={submitted}
          placeholder="Your answer"
          className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-teal-500 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800"
        />
        {challenge.unit && (
          <span className="shrink-0 text-sm font-semibold text-slate-600 dark:text-slate-300">
            {challenge.unit}
          </span>
        )}
      </div>
      {!submitted && (
        <button
          onClick={check}
          disabled={!val.trim()}
          className="mt-3 w-full rounded-xl border-2 border-teal-700 px-4 py-2.5 text-sm font-bold text-teal-700 transition hover:bg-teal-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 dark:text-teal-300"
        >
          Check
        </button>
      )}
      {submitted && (
        <p className="mt-2 text-xs text-slate-500">
          Expected: {challenge.answer}
          {challenge.unit ? ` ${challenge.unit}` : ''} (±{Math.round(tol * 100)}
          %)
        </p>
      )}
    </div>
  );
}

// ---- Fill-blank input -------------------------------------------------------

function FillBlankInner({
  challenge,
  submitted,
  onCheck,
}: {
  challenge: Challenge & { type: 'fill-blank' };
  submitted: boolean;
  onCheck: (ok: boolean) => void;
}) {
  const [val, setVal] = useState('');

  function check() {
    const candidate = val.trim().toLowerCase();
    const accept = [
      challenge.answer.toLowerCase(),
      ...(challenge.acceptableAnswers ?? []).map((s) => s.toLowerCase()),
    ];
    onCheck(accept.includes(candidate));
  }

  return (
    <div>
      <input
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        disabled={submitted}
        placeholder={challenge.placeholder ?? 'Type your answer'}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-teal-500 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800"
      />
      {!submitted && (
        <button
          onClick={check}
          disabled={!val.trim()}
          className="mt-3 w-full rounded-xl border-2 border-teal-700 px-4 py-2.5 text-sm font-bold text-teal-700 transition hover:bg-teal-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 dark:text-teal-300"
        >
          Check
        </button>
      )}
      {submitted && (
        <p className="mt-2 text-xs text-slate-500">
          Accepted: {challenge.answer}
          {challenge.acceptableAnswers?.length
            ? ` (also ${challenge.acceptableAnswers.join(', ')})`
            : ''}
        </p>
      )}
    </div>
  );
}

// ---- Order (up/down arrows) -------------------------------------------------

function OrderInner({
  challenge,
  submitted,
  onCheck,
}: {
  challenge: Challenge & { type: 'order' };
  submitted: boolean;
  onCheck: (ok: boolean) => void;
}) {
  const [order, setOrder] = useState<string[]>(() =>
    seededShuffle(challenge.items, challenge.id),
  );

  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= order.length) return;
    const next = [...order];
    [next[i], next[j]] = [next[j], next[i]];
    setOrder(next);
  }

  function check() {
    const isCorrect = order.every((x, i) => x === challenge.items[i]);
    onCheck(isCorrect);
  }

  return (
    <div>
      <ul className="space-y-2">
        {order.map((item, i) => {
          const inRightSpot = submitted && item === challenge.items[i];
          const inWrongSpot = submitted && item !== challenge.items[i];
          return (
            <li
              key={item}
              className={`flex items-center gap-2 rounded-lg border p-2.5 ${
                inRightSpot
                  ? 'border-emerald-400 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/30'
                  : inWrongSpot
                    ? 'border-rose-300 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/30'
                    : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800'
              }`}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                {i + 1}
              </span>
              <span className="min-w-0 flex-1 text-sm text-slate-800 dark:text-slate-200">
                {item}
              </span>
              {!submitted && (
                <>
                  <button
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                    aria-label="Move up"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-slate-300 text-slate-600 hover:border-teal-400 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    onClick={() => move(i, 1)}
                    disabled={i === order.length - 1}
                    aria-label="Move down"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-slate-300 text-slate-600 hover:border-teal-400 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300"
                  >
                    <ArrowDown size={14} />
                  </button>
                </>
              )}
            </li>
          );
        })}
      </ul>
      {!submitted && (
        <button
          onClick={check}
          className="mt-3 w-full rounded-xl border-2 border-teal-700 px-4 py-2.5 text-sm font-bold text-teal-700 transition hover:bg-teal-700 hover:text-white dark:text-teal-300"
        >
          Check order
        </button>
      )}
      {submitted && (
        <div className="mt-3 rounded-md bg-slate-100 p-3 text-xs dark:bg-slate-800">
          <p className="mb-1 font-semibold text-slate-700 dark:text-slate-200">
            Correct order:
          </p>
          <ol className="list-decimal pl-4 text-slate-600 dark:text-slate-300">
            {challenge.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

// ---- Multi-select -----------------------------------------------------------

function MultiSelectInner({
  challenge,
  submitted,
  onCheck,
}: {
  challenge: Challenge & { type: 'multi-select' };
  submitted: boolean;
  onCheck: (ok: boolean) => void;
}) {
  const shuffled = useMemo(
    () => seededShuffle(challenge.options, challenge.id),
    [challenge],
  );
  const [picked, setPicked] = useState<Set<string>>(new Set());

  function toggle(text: string) {
    if (submitted) return;
    const next = new Set(picked);
    if (next.has(text)) next.delete(text);
    else next.add(text);
    setPicked(next);
  }

  function check() {
    const correctSet = new Set(
      challenge.options.filter((o) => o.correct).map((o) => o.text),
    );
    const ok =
      picked.size === correctSet.size &&
      [...picked].every((t) => correctSet.has(t));
    onCheck(ok);
  }

  return (
    <div>
      <ul className="space-y-2">
        {shuffled.map((opt) => {
          const chosen = picked.has(opt.text);
          const showAsCorrect = submitted && opt.correct;
          const showAsWrong = submitted && chosen && !opt.correct;
          return (
            <li key={opt.text}>
              <button
                onClick={() => toggle(opt.text)}
                disabled={submitted}
                className={`flex w-full items-center gap-2 rounded-lg border p-3 text-left text-sm transition ${
                  showAsCorrect
                    ? 'border-emerald-400 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/30'
                    : showAsWrong
                      ? 'border-rose-300 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/30'
                      : chosen
                        ? 'border-teal-500 bg-teal-50 dark:border-teal-700 dark:bg-teal-950/40'
                        : 'border-slate-200 bg-white hover:border-teal-400 dark:border-slate-700 dark:bg-slate-800'
                }`}
              >
                {chosen ? (
                  <CheckSquare
                    size={16}
                    className="shrink-0 text-teal-700 dark:text-teal-300"
                  />
                ) : (
                  <SquareIcon
                    size={16}
                    className="shrink-0 text-slate-400"
                  />
                )}
                <span className="min-w-0 flex-1 text-slate-800 dark:text-slate-200">
                  {opt.text}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {!submitted && (
        <button
          onClick={check}
          disabled={picked.size === 0}
          className="mt-3 w-full rounded-xl border-2 border-teal-700 px-4 py-2.5 text-sm font-bold text-teal-700 transition hover:bg-teal-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 dark:text-teal-300"
        >
          Check ({picked.size} selected)
        </button>
      )}
    </div>
  );
}

// ---- Match pairs (tap left then tap right) ----------------------------------

function MatchInner({
  challenge,
  submitted,
  onCheck,
}: {
  challenge: Challenge & { type: 'match' };
  submitted: boolean;
  onCheck: (ok: boolean) => void;
}) {
  const leftCol = useMemo(
    () =>
      seededShuffle(
        challenge.pairs.map((p) => p.left),
        challenge.id + 'L',
      ),
    [challenge],
  );
  const rightCol = useMemo(
    () =>
      seededShuffle(
        challenge.pairs.map((p) => p.right),
        challenge.id + 'R',
      ),
    [challenge],
  );

  // pairs: map of left value -> right value the user has connected.
  const [pairs, setPairs] = useState<Record<string, string>>({});
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);

  function tapLeft(value: string) {
    if (submitted) return;
    // Tapping a connected left item un-pairs it.
    if (pairs[value]) {
      const next = { ...pairs };
      delete next[value];
      setPairs(next);
      setSelectedLeft(null);
      return;
    }
    setSelectedLeft(value);
  }

  function tapRight(value: string) {
    if (submitted) return;
    if (selectedLeft) {
      // If this right is already paired with another left, unpair that first.
      const cleaned = { ...pairs };
      for (const [l, r] of Object.entries(cleaned)) {
        if (r === value) delete cleaned[l];
      }
      cleaned[selectedLeft] = value;
      setPairs(cleaned);
      setSelectedLeft(null);
    }
  }

  function check() {
    const map = new Map(challenge.pairs.map((p) => [p.left, p.right]));
    const allCorrect =
      Object.keys(pairs).length === challenge.pairs.length &&
      Object.entries(pairs).every(([l, r]) => map.get(l) === r);
    onCheck(allCorrect);
  }

  // Pair color by left index (stable across renders).
  const leftIdx: Record<string, number> = {};
  challenge.pairs.forEach((p, i) => {
    leftIdx[p.left] = i;
  });
  const pairColors = [
    'bg-teal-100 text-teal-800 border-teal-400 dark:bg-teal-950/40 dark:text-teal-200',
    'bg-amber-100 text-amber-800 border-amber-400 dark:bg-amber-950/40 dark:text-amber-200',
    'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-400 dark:bg-fuchsia-950/40 dark:text-fuchsia-200',
    'bg-sky-100 text-sky-800 border-sky-400 dark:bg-sky-950/40 dark:text-sky-200',
    'bg-emerald-100 text-emerald-800 border-emerald-400 dark:bg-emerald-950/40 dark:text-emerald-200',
    'bg-rose-100 text-rose-800 border-rose-400 dark:bg-rose-950/40 dark:text-rose-200',
  ];

  function pairClass(left: string): string {
    return pairColors[leftIdx[left] % pairColors.length];
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {leftCol.map((l) => {
            const paired = !!pairs[l];
            const selected = selectedLeft === l;
            return (
              <button
                key={l}
                onClick={() => tapLeft(l)}
                disabled={submitted}
                className={`block w-full rounded-lg border p-2.5 text-left text-xs transition ${
                  paired
                    ? pairClass(l)
                    : selected
                      ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/30'
                      : 'border-slate-200 bg-white hover:border-teal-400 dark:border-slate-700 dark:bg-slate-800'
                }`}
              >
                {l}
              </button>
            );
          })}
        </div>
        <div className="space-y-2">
          {rightCol.map((r) => {
            const owningLeft = Object.entries(pairs).find(
              ([, v]) => v === r,
            )?.[0];
            return (
              <button
                key={r}
                onClick={() => tapRight(r)}
                disabled={submitted}
                className={`block w-full rounded-lg border p-2.5 text-left text-xs transition ${
                  owningLeft
                    ? pairClass(owningLeft)
                    : 'border-slate-200 bg-white hover:border-teal-400 dark:border-slate-700 dark:bg-slate-800'
                }`}
              >
                {r}
              </button>
            );
          })}
        </div>
      </div>
      {!submitted && (
        <>
          <p className="mt-2 text-[11px] text-slate-500">
            Tap a left item, then tap its match on the right. Tap a paired item
            to unpair it.
          </p>
          <button
            onClick={check}
            disabled={Object.keys(pairs).length !== challenge.pairs.length}
            className="mt-3 w-full rounded-xl border-2 border-teal-700 px-4 py-2.5 text-sm font-bold text-teal-700 transition hover:bg-teal-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 dark:text-teal-300"
          >
            Check ({Object.keys(pairs).length}/{challenge.pairs.length} paired)
          </button>
        </>
      )}
      {submitted && (
        <div className="mt-3 rounded-md bg-slate-100 p-3 text-xs dark:bg-slate-800">
          <p className="mb-1 font-semibold text-slate-700 dark:text-slate-200">
            Correct pairs:
          </p>
          <ul className="space-y-0.5 text-slate-600 dark:text-slate-300">
            {challenge.pairs.map((p) => (
              <li key={p.left}>
                {p.left} <span className="text-slate-400">→</span> {p.right}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
