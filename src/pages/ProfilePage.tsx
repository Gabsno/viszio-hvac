import { Link } from 'react-router-dom';
import {
  Award,
  Bookmark,
  Check,
  Download,
  Flame,
  GraduationCap,
  Settings as SettingsIcon,
  Star,
  Trash2,
  Trophy,
  User,
} from 'lucide-react';
import { downloadExport, hasAnyProgress } from '../lib/exportData';
import { trackEvent } from '../lib/analytics';
import { useState } from 'react';
import { TROPHIES, totalLessons } from '../course/courseData';
import { useProgressStore } from '../store/useProgressStore';
import { useSettingsStore } from '../store/useSettingsStore';
import { getArticle } from '../lib/content';
import { EmptyState } from '../components/EmptyState';

const TROPHY_ICONS: Record<string, React.ReactNode> = {
  Star: <Star size={18} />,
  Flame: <Flame size={18} />,
  Award: <Award size={18} />,
  Trophy: <Trophy size={18} />,
  GraduationCap: <GraduationCap size={18} />,
};

export function ProfilePage() {
  const completed = useProgressStore((s) => s.completedLessons);
  const xp = useProgressStore((s) => s.xp);
  const streak = useProgressStore((s) => s.currentStreak);
  const longest = useProgressStore((s) => s.longestStreak);
  const trophies = useProgressStore((s) => s.trophies);
  const bookmarks = useProgressStore((s) => s.bookmarks);
  const readArticles = useProgressStore((s) => s.readArticles);
  const notes = useProgressStore((s) => s.notes);
  const resetProgress = useProgressStore((s) => s.resetProgress);
  const userName = useSettingsStore((s) => s.userName);
  const setUserName = useSettingsStore((s) => s.setUserName);

  const [confirmReset, setConfirmReset] = useState(false);

  const lessonTotal = totalLessons();
  const pct = Math.round((completed.length / lessonTotal) * 100);
  const notesCount = Object.keys(notes).filter((k) => notes[k]?.trim()).length;

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 pb-24 sm:px-6 lg:pb-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-700 text-white">
          <User size={22} />
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {userName || 'Your profile'}
          </h1>
          <p className="text-xs text-slate-500">
            {completed.length}/{lessonTotal} lessons · {xp} XP earned
          </p>
        </div>
        <Link
          to="/settings"
          aria-label="Settings"
          className="shrink-0 rounded-lg border border-slate-300 p-2 text-slate-600 hover:border-teal-400 hover:text-teal-700 dark:border-slate-700 dark:text-slate-300"
        >
          <SettingsIcon size={16} />
        </Link>
      </div>

      {/* Name input */}
      {!userName && (
        <div className="mt-4 rounded-xl border border-dashed border-teal-300 bg-teal-50/40 p-3 dark:border-teal-800 dark:bg-teal-950/30">
          <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
            Add your name (used on your certificate)
          </label>
          <input
            type="text"
            placeholder="e.g. Nana Adwoa Boateng"
            onBlur={(e) => setUserName(e.target.value.trim())}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-teal-500 dark:border-slate-700 dark:bg-slate-800"
          />
        </div>
      )}

      {/* Stat strip */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-slate-200 bg-white p-3 text-center dark:border-slate-800 dark:bg-slate-900">
          <Flame size={18} className="mx-auto text-ghana-500" />
          <p className="mt-1 text-lg font-extrabold text-slate-900 dark:text-white">
            {streak}
          </p>
          <p className="text-[11px] text-slate-500">
            Day streak{longest > streak ? ` · best ${longest}` : ''}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-3 text-center dark:border-slate-800 dark:bg-slate-900">
          <Star size={18} className="mx-auto text-teal-600" />
          <p className="mt-1 text-lg font-extrabold text-slate-900 dark:text-white">
            {xp}
          </p>
          <p className="text-[11px] text-slate-500">XP earned</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-3 text-center dark:border-slate-800 dark:bg-slate-900">
          <Trophy size={18} className="mx-auto text-amber-500" />
          <p className="mt-1 text-lg font-extrabold text-slate-900 dark:text-white">
            {trophies.length}/{TROPHIES.length}
          </p>
          <p className="text-[11px] text-slate-500">Trophies</p>
        </div>
      </div>

      {/* Reading & library stats */}
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs text-slate-500">Articles read</p>
          <p className="mt-0.5 text-lg font-extrabold text-slate-900 dark:text-white">
            {readArticles.length}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs text-slate-500">Personal notes</p>
          <p className="mt-0.5 text-lg font-extrabold text-slate-900 dark:text-white">
            {notesCount}
          </p>
        </div>
      </div>

      {/* Course progress */}
      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Course progress
          </p>
          <span className="text-xs font-bold text-teal-700 dark:text-teal-300">
            {pct}%
          </span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-700 transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <Link
          to="/course"
          className="mt-3 inline-block text-xs font-semibold text-teal-700 hover:text-teal-800 dark:text-teal-300"
        >
          Resume the course →
        </Link>
      </div>

      {/* Trophies */}
      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <p className="mb-2.5 text-xs font-bold uppercase tracking-wide text-slate-400">
          Trophies
        </p>
        <div className="flex flex-wrap gap-2">
          {TROPHIES.map((t) => {
            const earned = trophies.includes(t.id);
            return (
              <div
                key={t.id}
                title={`${t.title} — ${t.description}`}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold ${
                  earned
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                    : 'bg-slate-100 text-slate-400 dark:bg-slate-800'
                }`}
              >
                {TROPHY_ICONS[t.icon] ?? <Trophy size={18} />}
                {t.title}
              </div>
            );
          })}
        </div>
      </div>

      {/* Certificate link */}
      <Link
        to="/certificate"
        className={`mt-4 flex items-center gap-3 rounded-xl border p-4 transition ${
          pct === 100
            ? 'border-teal-400 bg-teal-50 hover:border-teal-500 dark:border-teal-700 dark:bg-teal-950/40'
            : 'border-slate-200 bg-white hover:border-teal-400 dark:border-slate-800 dark:bg-slate-900'
        }`}
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-700 text-white">
          <Award size={20} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-bold text-slate-900 dark:text-white">
            {pct === 100
              ? 'Your certificate is ready'
              : 'Course completion certificate'}
          </p>
          <p className="text-xs text-slate-500">
            {pct === 100
              ? 'Add your name and print or save it as a PDF.'
              : `Finish all ${lessonTotal} lessons to unlock it — ${pct}% done.`}
          </p>
        </div>
      </Link>

      {/* Bookmarks */}
      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-2">
          <Bookmark size={15} className="text-teal-600" />
          <p className="text-sm font-bold text-slate-900 dark:text-white">
            Bookmarks
          </p>
          <span className="text-xs text-slate-400">({bookmarks.length})</span>
        </div>
        {bookmarks.length === 0 ? (
          <div className="mt-3">
            <EmptyState
              image={`${import.meta.env.BASE_URL}illustrations/empty-bookmarks.png`}
              imageAlt="A teal bookmark ribbon with floating engineering symbols."
              title="No bookmarks yet"
              description="Tap the bookmark icon on any article to save it here for quick recall."
              action={{ label: 'Browse the library', to: '/library' }}
            />
          </div>
        ) : (
          <ul className="mt-2 space-y-1.5">
            {bookmarks.slice(0, 8).map((id) => {
              const a = getArticle(id);
              if (!a) return null;
              return (
                <li key={id}>
                  <Link
                    to={`/article/${id}`}
                    className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <Check size={13} className="shrink-0 text-teal-600" />
                    <span className="truncate">{a.title}</span>
                  </Link>
                </li>
              );
            })}
            {bookmarks.length > 8 && (
              <li className="text-xs text-slate-400">
                + {bookmarks.length - 8} more
              </li>
            )}
          </ul>
        )}
      </div>

      {/* Migrate to Viszio Academy */}
      <div className="mt-4 rounded-2xl border-2 border-dashed border-ghana-300 bg-gradient-to-br from-ghana-50/70 to-amber-50 p-4 dark:border-ghana-700 dark:from-ghana-950/40 dark:to-amber-950/30">
        <div className="flex items-center gap-2">
          <Download size={15} className="text-ghana-700 dark:text-ghana-300" />
          <p className="text-sm font-bold text-slate-900 dark:text-white">
            Move to Viszio Academy
          </p>
        </div>
        <p className="mt-1 text-xs text-slate-700 dark:text-slate-300">
          Viszio HVAC is becoming part of <strong>Viszio Academy</strong>, a
          new mobile app covering Mechanical, Electrical, Plumbing and Fire.
          Download your progress here — you'll import it into Viszio Academy
          when it launches on the Play Store and App Store.
        </p>
        <button
          onClick={() => {
            const name = downloadExport();
            trackEvent('data-export');
            alert(
              `Saved ${name} to your Downloads folder. Keep this file safe — you'll need it when Viszio Academy launches.`,
            );
          }}
          disabled={!hasAnyProgress()}
          className="tap mt-3 inline-flex items-center gap-1.5 rounded-lg bg-ghana-600 px-4 py-2 text-sm font-bold text-white hover:bg-ghana-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download size={14} /> Download my progress (JSON)
        </button>
        {!hasAnyProgress() && (
          <p className="mt-2 text-[11px] text-slate-500">
            Nothing to export yet — bookmark an article or finish a lesson
            first.
          </p>
        )}
      </div>

      {/* Danger zone */}
      <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50/50 p-4 dark:border-rose-900/60 dark:bg-rose-950/20">
        <div className="flex items-center gap-2">
          <Trash2 size={14} className="text-rose-600" />
          <p className="text-sm font-bold text-slate-900 dark:text-white">
            Reset course progress
          </p>
        </div>
        <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
          Clears completed lessons, XP, streaks and trophies. Bookmarks and
          notes stay.
        </p>
        {confirmReset ? (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                resetProgress();
                setConfirmReset(false);
              }}
              className="rounded-lg bg-rose-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-rose-700"
            >
              Confirm reset
            </button>
            <button
              onClick={() => setConfirmReset(false)}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-600 dark:border-slate-700"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmReset(true)}
            className="mt-3 rounded-lg border border-rose-300 px-3 py-1.5 text-sm font-semibold text-rose-600 hover:bg-rose-100 dark:border-rose-800 dark:hover:bg-rose-950/40"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
