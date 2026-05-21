import { Link } from 'react-router-dom';
import {
  Check,
  Lock,
  Play,
  Flame,
  Star,
  Trophy,
  Award,
  GraduationCap,
} from 'lucide-react';
import { COURSE, TROPHIES, lessonOrder, totalLessons } from '../course/courseData';
import { Icon } from '../components/Icon';
import { useProgressStore } from '../store/useProgressStore';

const TROPHY_ICONS: Record<string, React.ReactNode> = {
  Star: <Star size={18} />,
  Flame: <Flame size={18} />,
  Award: <Award size={18} />,
  Trophy: <Trophy size={18} />,
  GraduationCap: <GraduationCap size={18} />,
};

export function CoursePage() {
  const completed = useProgressStore((s) => s.completedLessons);
  const quizScores = useProgressStore((s) => s.quizScores);
  const xp = useProgressStore((s) => s.xp);
  const streak = useProgressStore((s) => s.currentStreak);
  const longest = useProgressStore((s) => s.longestStreak);
  const trophies = useProgressStore((s) => s.trophies);

  const order = lessonOrder();
  const lessonTotal = totalLessons();
  const pct = Math.round((completed.length / lessonTotal) * 100);

  // A lesson is unlocked if it is the first, or the previous lesson is done.
  function isUnlocked(lessonId: string): boolean {
    const idx = order.findIndex((o) => o.lessonId === lessonId);
    if (idx <= 0) return true;
    return completed.includes(order[idx - 1].lessonId);
  }

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
            {completed.length} of {lessonTotal} lessons · {COURSE.length} modules
          </p>
        </div>
      </div>

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

      {/* Module path */}
      <div className="mt-6 space-y-6">
        {COURSE.map((module) => {
          const moduleDone = module.lessons.every((l) =>
            completed.includes(l.id),
          );
          return (
            <section key={module.id}>
              <div className="flex items-center gap-2.5">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    moduleDone
                      ? 'bg-emerald-600 text-white'
                      : module.capstone
                        ? 'bg-ghana-600 text-white'
                        : 'bg-teal-700 text-white'
                  }`}
                >
                  {moduleDone ? <Check size={20} /> : <Icon name={module.icon} size={20} />}
                </span>
                <div>
                  <h2 className="font-bold text-slate-900 dark:text-white">
                    {module.title}
                  </h2>
                  <p className="text-xs text-slate-500">{module.description}</p>
                </div>
              </div>

              <div className="ml-5 mt-2 border-l-2 border-dashed border-slate-200 pl-6 dark:border-slate-700">
                {module.lessons.map((lesson) => {
                  const done = completed.includes(lesson.id);
                  const unlocked = isUnlocked(lesson.id);
                  const score = quizScores[lesson.id];
                  const cls = `my-2 flex items-center gap-3 rounded-xl border p-3 transition ${
                    unlocked
                      ? 'cursor-pointer border-slate-200 bg-white hover:border-teal-400 dark:border-slate-800 dark:bg-slate-900'
                      : 'cursor-not-allowed border-slate-200 bg-slate-50 opacity-70 dark:border-slate-800 dark:bg-slate-900/50'
                  }`;
                  const inner = (
                    <>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                          done
                            ? 'bg-emerald-500 text-white'
                            : unlocked
                              ? 'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300'
                              : 'bg-slate-200 text-slate-400 dark:bg-slate-700'
                        }`}
                      >
                        {done ? (
                          <Check size={16} />
                        ) : unlocked ? (
                          <Play size={14} />
                        ) : (
                          <Lock size={14} />
                        )}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                          {lesson.title}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {lesson.xp} XP · {lesson.quiz.length} questions
                          {done && score !== undefined
                            ? ` · best ${score}%`
                            : ''}
                        </p>
                      </div>
                      {module.capstone && (
                        <span className="rounded-full bg-ghana-100 px-2 py-0.5 text-[10px] font-bold uppercase text-ghana-700 dark:bg-ghana-950 dark:text-ghana-300">
                          Capstone
                        </span>
                      )}
                    </>
                  );
                  return unlocked ? (
                    <Link key={lesson.id} to={`/course/${lesson.id}`} className={cls}>
                      {inner}
                    </Link>
                  ) : (
                    <div key={lesson.id} className={cls}>
                      {inner}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
