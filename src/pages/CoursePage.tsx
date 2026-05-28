import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  BookText,
  Check,
  Calculator,
  Clock,
  Flame,
  GraduationCap,
  Lock,
  Play,
  Sparkles,
  Star,
  Trophy,
} from 'lucide-react';
import {
  COURSE,
  TROPHIES,
  lessonOrder,
  totalLessons,
} from '../course/courseData';
import { lessonDurationMinutes } from '../course/lessonStats';
import { TOOLS } from '../tools';
import { GLOSSARY } from '../data/glossary';
import { Icon } from '../components/Icon';
import { useProgressStore } from '../store/useProgressStore';

const TROPHY_ICONS: Record<string, React.ReactNode> = {
  Star: <Star size={18} />,
  Flame: <Flame size={18} />,
  Award: <Award size={18} />,
  Trophy: <Trophy size={18} />,
  GraduationCap: <GraduationCap size={18} />,
};

type Tab = 'lessons' | 'tools' | 'glossary';

export function CoursePage() {
  const completed = useProgressStore((s) => s.completedLessons);
  const quizScores = useProgressStore((s) => s.quizScores);
  const xp = useProgressStore((s) => s.xp);
  const streak = useProgressStore((s) => s.currentStreak);
  const longest = useProgressStore((s) => s.longestStreak);
  const trophies = useProgressStore((s) => s.trophies);

  const [tab, setTab] = useState<Tab>('lessons');
  const [glossarySearch, setGlossarySearch] = useState('');

  const order = lessonOrder();
  const lessonTotal = totalLessons();
  const pct = Math.round((completed.length / lessonTotal) * 100);

  function isUnlocked(lessonId: string): boolean {
    const idx = order.findIndex((o) => o.lessonId === lessonId);
    if (idx <= 0) return true;
    return completed.includes(order[idx - 1].lessonId);
  }

  const nextEntry = order.find(
    (o) => !completed.includes(o.lessonId) && isUnlocked(o.lessonId),
  );
  const nextModule = nextEntry
    ? COURSE.find((m) => m.lessons.some((l) => l.id === nextEntry.lessonId))
    : null;
  const nextLesson = nextEntry
    ? nextModule?.lessons.find((l) => l.id === nextEntry.lessonId)
    : null;
  const hasStartedAny = completed.length > 0;

  const filteredGlossary = glossarySearch.trim()
    ? GLOSSARY.filter((g) =>
        (g.term + ' ' + g.definition)
          .toLowerCase()
          .includes(glossarySearch.toLowerCase()),
      )
    : GLOSSARY;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-700 text-white">
          <GraduationCap size={18} />
        </span>
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            HVAC Course
          </h1>
          <p className="text-xs text-slate-500">
            {completed.length} of {lessonTotal} lessons · {COURSE.length}{' '}
            modules
          </p>
        </div>
      </div>

      {/* Featured "Continue learning" card */}
      {nextLesson && nextModule && (
        <Link
          to={`/course/${nextLesson.id}`}
          className="mt-4 block overflow-hidden rounded-2xl border border-teal-200 bg-gradient-to-br from-teal-600 to-teal-700 p-5 text-white shadow-sm transition hover:from-teal-700 hover:to-teal-800 dark:border-teal-800"
        >
          <p className="text-[11px] font-bold uppercase tracking-wide text-teal-100">
            {hasStartedAny ? 'Continue learning' : 'Start learning'} ·{' '}
            {nextModule.title}
          </p>
          <h2 className="mt-1 text-xl font-extrabold leading-tight">
            {nextLesson.title}
          </h2>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-teal-100">
            <span className="flex items-center gap-1">
              <Clock size={12} /> {lessonDurationMinutes(nextLesson)} min
            </span>
            <span>{nextLesson.xp} XP</span>
            <span>{nextLesson.quiz.length} quiz Qs</span>
            {nextLesson.challenges && nextLesson.challenges.length > 0 && (
              <span>{nextLesson.challenges.length} practice</span>
            )}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs font-medium text-teal-100">
              Slide-by-slide lesson · practice · quiz
            </span>
            <span className="flex items-center gap-1 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-teal-700">
              <Play size={13} fill="currentColor" /> Start
            </span>
          </div>
        </Link>
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

      {/* Overall progress */}
      <div className="mt-3">
        <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-700 transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-1 text-right text-xs text-slate-400">{pct}% complete</p>
      </div>

      {/* Tabs */}
      <div className="mt-5 flex border-b border-slate-200 dark:border-slate-800">
        {(
          [
            { id: 'lessons', label: 'Lessons', icon: <GraduationCap size={14} /> },
            { id: 'tools', label: 'Tools', icon: <Calculator size={14} /> },
            { id: 'glossary', label: 'Glossary', icon: <BookText size={14} /> },
          ] as { id: Tab; label: string; icon: React.ReactNode }[]
        ).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex flex-1 items-center justify-center gap-1.5 border-b-2 px-2 py-2.5 text-sm font-semibold transition ${
              tab === t.id
                ? 'border-teal-600 text-teal-700 dark:text-teal-300'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Tab: Lessons */}
      {tab === 'lessons' && (
        <>
          {/* Trophies */}
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
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

          {/* Snake-style module/lesson tree */}
          <div className="mt-6 space-y-7">
            {COURSE.map((module) => {
              const moduleDone = module.lessons.every((l) =>
                completed.includes(l.id),
              );
              return (
                <section key={module.id}>
                  {/* Module header */}
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                        moduleDone
                          ? 'bg-emerald-600 text-white'
                          : module.capstone
                            ? 'bg-ghana-600 text-white'
                            : 'bg-teal-700 text-white'
                      }`}
                    >
                      {moduleDone ? (
                        <Check size={22} />
                      ) : (
                        <Icon name={module.icon} size={22} />
                      )}
                    </span>
                    <div className="min-w-0">
                      <h2 className="font-bold text-slate-900 dark:text-white">
                        {module.title}
                      </h2>
                      <p className="text-xs text-slate-500">
                        {module.description}
                      </p>
                    </div>
                  </div>

                  {/* Lesson nodes — zig-zag snake path */}
                  <div className="relative mt-3">
                    {module.lessons.map((lesson, i) => {
                      const done = completed.includes(lesson.id);
                      const unlocked = isUnlocked(lesson.id);
                      const isNext = nextLesson?.id === lesson.id;
                      const score = quizScores[lesson.id];
                      const minutes = lessonDurationMinutes(lesson);
                      // Alternate left/right each row for the snake feel.
                      const isLeft = i % 2 === 0;

                      const nodeStateClasses = done
                        ? 'bg-emerald-500 text-white ring-emerald-200 dark:ring-emerald-900/60'
                        : isNext
                          ? 'bg-teal-600 text-white ring-teal-300 dark:ring-teal-800/60 animate-pulse-soft'
                          : unlocked
                            ? 'bg-teal-100 text-teal-700 ring-teal-100 dark:bg-teal-950 dark:text-teal-300 dark:ring-teal-950/80'
                            : 'bg-slate-200 text-slate-400 ring-slate-100 dark:bg-slate-800 dark:text-slate-500 dark:ring-slate-800';

                      const card = (
                        <div
                          className={`flex flex-1 items-center gap-3 rounded-2xl border p-3 transition ${
                            unlocked
                              ? 'border-slate-200 bg-white hover:border-teal-400 dark:border-slate-800 dark:bg-slate-900'
                              : 'border-slate-200 bg-slate-50 opacity-70 dark:border-slate-800 dark:bg-slate-900/50'
                          } ${isLeft ? '' : 'flex-row-reverse'}`}
                        >
                          <div className="min-w-0 flex-1">
                            <p
                              className={`truncate text-sm font-semibold ${
                                isLeft ? 'text-left' : 'text-right'
                              } text-slate-900 dark:text-white`}
                            >
                              {lesson.title}
                            </p>
                            <p
                              className={`flex flex-wrap gap-x-2 text-[11px] text-slate-500 ${
                                isLeft ? '' : 'justify-end'
                              }`}
                            >
                              <span className="flex items-center gap-0.5">
                                <Clock size={10} />
                                {minutes}m
                              </span>
                              <span>{lesson.xp} XP</span>
                              {done && score !== undefined && (
                                <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                                  best {score}%
                                </span>
                              )}
                            </p>
                            {module.capstone && (
                              <span
                                className={`mt-1 inline-block rounded-full bg-ghana-100 px-2 py-0.5 text-[10px] font-bold uppercase text-ghana-700 dark:bg-ghana-950 dark:text-ghana-300`}
                              >
                                Capstone
                              </span>
                            )}
                          </div>
                        </div>
                      );

                      const node = (
                        <span
                          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ring-8 ${nodeStateClasses}`}
                          aria-hidden="true"
                        >
                          {done ? (
                            <Check size={22} />
                          ) : unlocked ? (
                            <Play
                              size={20}
                              fill="currentColor"
                              className="ml-0.5"
                            />
                          ) : (
                            <Lock size={18} />
                          )}
                        </span>
                      );

                      const row = (
                        <div
                          className={`my-3 flex items-center gap-2 ${
                            isLeft ? '' : 'flex-row-reverse'
                          }`}
                        >
                          {node}
                          {card}
                        </div>
                      );

                      return unlocked ? (
                        <Link
                          key={lesson.id}
                          to={`/course/${lesson.id}`}
                          className="block"
                          aria-label={`${lesson.title}, ${minutes} minutes`}
                        >
                          {row}
                        </Link>
                      ) : (
                        <div
                          key={lesson.id}
                          aria-label={`${lesson.title} (locked)`}
                          className="cursor-not-allowed"
                        >
                          {row}
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </>
      )}

      {/* Tab: Tools */}
      {tab === 'tools' && (
        <div className="mt-5">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            All {TOOLS.length} engineering calculators run offline and switch
            between SI and IP units.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {TOOLS.map((t) => (
              <Link
                key={t.id}
                to={`/tools/${t.id}`}
                className="group flex flex-col rounded-xl border border-slate-200 bg-white p-4 transition hover:border-teal-400 dark:border-slate-800 dark:bg-slate-900"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300">
                  <Icon name={t.icon} size={18} />
                </span>
                <h2 className="mt-2.5 font-bold text-slate-900 dark:text-white">
                  {t.title}
                </h2>
                <p className="mt-1 flex-1 text-xs text-slate-500 dark:text-slate-400">
                  {t.description}
                </p>
                <span className="mt-3 flex items-center gap-1 text-xs font-semibold text-teal-700 dark:text-teal-400">
                  Open tool
                  <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Glossary */}
      {tab === 'glossary' && (
        <div className="mt-5">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-teal-600" />
            <input
              type="text"
              value={glossarySearch}
              onChange={(e) => setGlossarySearch(e.target.value)}
              placeholder="Search the glossary…"
              className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-teal-500 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <p className="mt-1 text-xs text-slate-400">
            {filteredGlossary.length} of {GLOSSARY.length} terms
          </p>
          <ul className="mt-3 space-y-2">
            {filteredGlossary.slice(0, 60).map((g) => (
              <li
                key={g.term}
                className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
              >
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {g.term}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  {g.definition}
                </p>
              </li>
            ))}
          </ul>
          {filteredGlossary.length > 60 && (
            <Link
              to="/glossary"
              className="mt-3 block text-center text-xs font-semibold text-teal-700 hover:text-teal-800 dark:text-teal-400"
            >
              See all {filteredGlossary.length} matching terms →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
