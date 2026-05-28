import { useState } from 'react';
import { Check, X, ChevronRight } from 'lucide-react';
import type { QuizQuestion } from '../types';

interface Props {
  questions: QuizQuestion[];
  onComplete: (scorePercent: number, wrongIndexes: number[]) => void;
}

function isCorrect(q: QuizQuestion, given: number | string): boolean {
  if (q.kind === 'short-answer') {
    const expected = String(q.answer).toLowerCase().trim();
    const actual = String(given).toLowerCase().trim();
    return actual.length > 0 && actual.includes(expected);
  }
  return given === q.answer;
}

export function Quiz({ questions, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongIndexes, setWrongIndexes] = useState<number[]>([]);

  const q = questions[index];
  const last = index === questions.length - 1;

  function submit() {
    if (submitted) return;
    const given = q.kind === 'short-answer' ? text : (choice ?? -1);
    if (q.kind !== 'short-answer' && choice === null) return;
    if (q.kind === 'short-answer' && text.trim() === '') return;
    if (isCorrect(q, given)) {
      setCorrectCount((c) => c + 1);
    } else {
      setWrongIndexes((w) => (w.includes(index) ? w : [...w, index]));
    }
    setSubmitted(true);
  }

  function next() {
    if (last) {
      onComplete(
        Math.round((correctCount / questions.length) * 100),
        wrongIndexes,
      );
      return;
    }
    setIndex((i) => i + 1);
    setChoice(null);
    setText('');
    setSubmitted(false);
  }

  const answeredCorrectly =
    submitted &&
    isCorrect(q, q.kind === 'short-answer' ? text : (choice ?? -1));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      {/* Progress */}
      <div className="mb-4 flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className="h-full rounded-full bg-teal-600 transition-all"
            style={{ width: `${(index / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-xs font-semibold text-slate-400">
          {index + 1}/{questions.length}
        </span>
      </div>

      <p className="text-base font-bold text-slate-900 dark:text-white">
        {q.prompt}
      </p>

      {/* Choices */}
      {q.kind === 'short-answer' ? (
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          disabled={submitted}
          placeholder="Type your answer…"
          className="mt-4 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 disabled:opacity-70 dark:border-slate-700 dark:bg-slate-800"
        />
      ) : (
        <div className="mt-4 space-y-2">
          {q.choices?.map((c, i) => {
            const chosen = choice === i;
            const showCorrect = submitted && i === q.answer;
            const showWrong = submitted && chosen && i !== q.answer;
            return (
              <button
                key={i}
                onClick={() => !submitted && setChoice(i)}
                disabled={submitted}
                className={`flex w-full items-center gap-2.5 rounded-lg border px-3.5 py-2.5 text-left text-sm transition ${
                  showCorrect
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50'
                    : showWrong
                      ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/50'
                      : chosen
                        ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/50'
                        : 'border-slate-300 hover:border-teal-400 dark:border-slate-700'
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    showCorrect
                      ? 'bg-emerald-500 text-white'
                      : showWrong
                        ? 'bg-rose-500 text-white'
                        : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  {showCorrect ? (
                    <Check size={12} />
                  ) : showWrong ? (
                    <X size={12} />
                  ) : (
                    String.fromCharCode(65 + i)
                  )}
                </span>
                <span className="text-slate-800 dark:text-slate-200">{c}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Explanation */}
      {submitted && (
        <div
          className={`mt-4 rounded-lg p-3 text-sm ${
            answeredCorrectly
              ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
              : 'bg-rose-50 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300'
          }`}
        >
          <p className="font-bold">
            {answeredCorrectly ? 'Correct!' : 'Not quite.'}
          </p>
          <p className="mt-0.5">{q.explanation}</p>
        </div>
      )}

      {/* Action */}
      <div className="mt-5 flex justify-end">
        {submitted ? (
          <button
            onClick={next}
            className="flex items-center gap-1.5 rounded-lg bg-teal-700 px-4 py-2 text-sm font-bold text-white hover:bg-teal-800"
          >
            {last ? 'Finish' : 'Next'} <ChevronRight size={16} />
          </button>
        ) : (
          <button
            onClick={submit}
            disabled={
              q.kind === 'short-answer' ? text.trim() === '' : choice === null
            }
            className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-bold text-white hover:bg-teal-800 disabled:opacity-40"
          >
            Check
          </button>
        )}
      </div>
    </div>
  );
}
