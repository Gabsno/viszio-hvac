import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookA,
  BookOpen,
  Bookmark,
  Calculator,
  CheckCircle2,
  ChevronRight,
  Clock,
  Flame,
  GraduationCap,
  History,
  Layers,
  MapPin,
  Play,
  Sparkles,
  Star,
} from 'lucide-react';
import { ARTICLES, TREE, getArticles } from '../lib/content';
import { PILLARS } from '../content/pillars';
import { Icon } from '../components/Icon';
import { ArticleCard } from '../components/ArticleCard';
import { HeroIllustration } from '../components/HeroIllustration';
import { useProgressStore } from '../store/useProgressStore';
import { useSettingsStore } from '../store/useSettingsStore';
import { findLesson, lessonOrder, totalLessons } from '../course/courseData';
import { lessonDurationMinutes } from '../course/lessonStats';
import { todaysLesson } from '../course/dailyLesson';
import { getTool, TOOLS } from '../tools';
import { APP_TAGLINE } from '../config';

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export function HomePage() {
  const readArticles = useProgressStore((s) => s.readArticles);
  const bookmarks = useProgressStore((s) => s.bookmarks);
  const xp = useProgressStore((s) => s.xp);
  const streak = useProgressStore((s) => s.currentStreak);
  const completedLessons = useProgressStore((s) => s.completedLessons);
  const recentArticles = useProgressStore((s) => s.recentArticles);
  const recentLessons = useProgressStore((s) => s.recentLessons);
  const recentTools = useProgressStore((s) => s.recentTools);
  const userName = useSettingsStore((s) => s.userName);

  const order = lessonOrder();
  const lessonCount = totalLessons();
  const coursePct = lessonCount
    ? Math.round((completedLessons.length / lessonCount) * 100)
    : 0;

  function isUnlocked(id: string): boolean {
    const idx = order.findIndex((o) => o.lessonId === id);
    if (idx <= 0) return true;
    return completedLessons.includes(order[idx - 1].lessonId);
  }

  // Continue-learning: the next sequential lesson.
  const nextEntry = order.find(
    (o) => !completedLessons.includes(o.lessonId) && isUnlocked(o.lessonId),
  );
  const continueLesson = nextEntry ? findLesson(nextEntry.lessonId) : null;

  // Today's pick: deterministic daily-rotation lesson.
  const daily = todaysLesson(completedLessons);
  const dailyIsSameAsContinue = daily?.lesson.id === continueLesson?.lesson.id;

  const bookmarked = getArticles(bookmarks).slice(0, 3);
  const recentArticleObjs = getArticles(recentArticles).slice(0, 4);
  const recentLessonObjs = recentLessons
    .map((id) => findLesson(id))
    .filter(Boolean)
    .slice(0, 3);
  const recentToolObjs = recentTools
    .map((id) => getTool(id))
    .filter(Boolean)
    .slice(0, 3);

  const hasAnyRecent =
    recentArticleObjs.length > 0 ||
    recentLessonObjs.length > 0 ||
    recentToolObjs.length > 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      {/* Greeting strip */}
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-400">
            {greeting()}
          </p>
          <h1 className="truncate text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            {userName ? userName.split(' ')[0] : 'Welcome back'}
          </h1>
        </div>
        <div className="flex shrink-0 gap-2">
          <div className="flex items-center gap-1.5 rounded-full border border-ghana-200 bg-ghana-50 px-3 py-1 text-xs font-bold text-ghana-700 dark:border-ghana-800 dark:bg-ghana-950/40 dark:text-ghana-200">
            <Flame size={14} /> {streak}
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700 dark:border-teal-800 dark:bg-teal-950/40 dark:text-teal-200">
            <Star size={14} /> {xp}
          </div>
        </div>
      </div>

      {/* Continue Learning */}
      {continueLesson && (
        <Link
          to={`/course/${continueLesson.lesson.id}`}
          className="mt-4 block overflow-hidden rounded-2xl border border-teal-200 bg-gradient-to-br from-teal-600 to-teal-700 p-5 text-white shadow-sm transition hover:from-teal-700 hover:to-teal-800 dark:border-teal-800"
        >
          <p className="text-[11px] font-bold uppercase tracking-wide text-teal-100">
            {completedLessons.length > 0
              ? 'Continue learning'
              : 'Start learning'}{' '}
            · {continueLesson.module.title}
          </p>
          <h2 className="mt-1 text-xl font-extrabold leading-tight">
            {continueLesson.lesson.title}
          </h2>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-teal-100">
            <span className="flex items-center gap-1">
              <Clock size={12} /> {lessonDurationMinutes(continueLesson.lesson)}{' '}
              min
            </span>
            <span>{continueLesson.lesson.xp} XP</span>
            <span>{continueLesson.lesson.quiz.length} quiz Qs</span>
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs font-medium text-teal-100">
              Slide-by-slide lesson · practice · quiz
            </span>
            <span className="flex items-center gap-1 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-teal-700">
              <Play size={13} fill="currentColor" /> Resume
            </span>
          </div>
        </Link>
      )}

      {/* Daily lesson (when different from continue) */}
      {daily && !dailyIsSameAsContinue && (
        <Link
          to={`/course/${daily.lesson.id}`}
          className="mt-3 flex items-center gap-3 rounded-2xl border border-ghana-200 bg-gradient-to-r from-ghana-50 to-amber-50 p-4 transition hover:border-ghana-400 dark:border-ghana-800/80 dark:from-ghana-950/40 dark:to-amber-950/30"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ghana-600 text-white">
            <Sparkles size={20} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-wide text-ghana-700 dark:text-ghana-300">
              Today's pick · {daily.moduleTitle}
            </p>
            <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
              {daily.lesson.title}
            </p>
            <p className="text-[11px] text-slate-500">
              {lessonDurationMinutes(daily.lesson)} min · resets at midnight
            </p>
          </div>
          <ChevronRight
            size={18}
            className="shrink-0 text-ghana-600 dark:text-ghana-300"
          />
        </Link>
      )}

      {/* Stats row */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat
          icon={<CheckCircle2 size={16} />}
          value={`${readArticles.length}`}
          label={`of ${ARTICLES.length} read`}
        />
        <Stat
          icon={<Flame size={16} />}
          value={String(streak)}
          label="day streak"
        />
        <Stat icon={<Star size={16} />} value={String(xp)} label="XP" />
        <Stat
          icon={<GraduationCap size={16} />}
          value={`${coursePct}%`}
          label="course done"
        />
      </div>

      {/* Recent activity */}
      {hasAnyRecent && (
        <section className="mt-7">
          <div className="mb-3 flex items-center gap-2">
            <History size={17} className="text-teal-600" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Pick up where you left off
            </h2>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {recentArticleObjs.map((a) => (
              <Link
                key={`a-${a.id}`}
                to={`/article/${a.id}`}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition hover:border-teal-400 dark:border-slate-800 dark:bg-slate-900"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300">
                  <BookOpen size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Article
                  </p>
                  <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                    {a.title}
                  </p>
                </div>
              </Link>
            ))}
            {recentLessonObjs.map((found) =>
              !found ? null : (
                <Link
                  key={`l-${found.lesson.id}`}
                  to={`/course/${found.lesson.id}`}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition hover:border-teal-400 dark:border-slate-800 dark:bg-slate-900"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ghana-50 text-ghana-700 dark:bg-ghana-950/40 dark:text-ghana-300">
                    <GraduationCap size={16} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      Lesson · {found.module.title}
                    </p>
                    <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                      {found.lesson.title}
                    </p>
                  </div>
                </Link>
              ),
            )}
            {recentToolObjs.map((t) =>
              !t ? null : (
                <Link
                  key={`t-${t.id}`}
                  to={`/tools/${t.id}`}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition hover:border-teal-400 dark:border-slate-800 dark:bg-slate-900"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    <Icon name={t.icon} size={16} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      Tool
                    </p>
                    <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                      {t.title}
                    </p>
                  </div>
                </Link>
              ),
            )}
          </div>
        </section>
      )}

      {/* First-time hero (only shown when there's nothing to continue) */}
      {!continueLesson && !hasAnyRecent && (
        <section className="mt-6 overflow-hidden rounded-2xl shadow-md">
          <HeroIllustration className="block h-auto w-full" />
          <div className="bg-gradient-to-br from-teal-700 via-teal-800 to-teal-950 p-6 text-white sm:p-8">
            <h2 className="max-w-2xl text-xl font-extrabold leading-tight tracking-tight sm:text-3xl">
              HVAC engineering, made learnable.
            </h2>
            <p className="mt-2 max-w-xl text-sm text-teal-100">
              {APP_TAGLINE} A searchable library, a Duolingo-style course,
              engineering calculators and a Ghana-aware design data hub.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <Link
                to="/library"
                className="tap inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-teal-800 hover:bg-teal-50"
              >
                <BookOpen size={16} /> Browse library
              </Link>
              <Link
                to="/course"
                className="tap inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-bold text-white ring-1 ring-teal-400 hover:bg-teal-500"
              >
                <GraduationCap size={16} /> Start course
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Bookmarks */}
      {bookmarked.length > 0 && (
        <section className="mt-7">
          <div className="mb-3 flex items-center gap-2">
            <Bookmark size={17} className="text-teal-600" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Your bookmarks
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {bookmarked.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      )}

      {/* Quick tools */}
      <section className="mt-7">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Calculator size={17} className="text-teal-600" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Quick tools
            </h2>
          </div>
          <Link
            to="/tools"
            className="text-xs font-semibold text-teal-700 hover:text-teal-800 dark:text-teal-300"
          >
            All {TOOLS.length} →
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TOOLS.slice(0, 4).map((t) => (
            <Link
              key={t.id}
              to={`/tools/${t.id}`}
              className="group rounded-xl border border-slate-200 bg-white p-3 transition hover:border-teal-400 dark:border-slate-800 dark:bg-slate-900"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300">
                <Icon name={t.icon} size={16} />
              </span>
              <h3 className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                {t.title}
              </h3>
              <p className="mt-0.5 line-clamp-2 text-[11px] text-slate-500 dark:text-slate-400">
                {t.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Explore by pillar */}
      <section className="mt-7">
        <h2 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">
          Explore by pillar
        </h2>
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p) => {
            const node = TREE.find((t) => t.meta.slug === p.slug);
            return (
              <Link
                key={p.slug}
                to={`/library?pillar=${p.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition hover:border-teal-400 dark:border-slate-800 dark:bg-slate-900"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300">
                  <Icon name={p.icon} size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
                    {p.title}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {node?.articleCount ?? 0} articles
                  </p>
                </div>
                <ArrowRight
                  size={14}
                  className="shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-teal-600"
                />
              </Link>
            );
          })}
        </div>
      </section>

      {/* More to explore */}
      <section className="mt-7 grid gap-3 sm:grid-cols-3">
        <MoreCard
          to="/design-data"
          icon={<MapPin size={16} />}
          title="Design Data"
          text="Ghana & Africa climate design conditions."
        />
        <MoreCard
          to="/glossary"
          icon={<BookA size={16} />}
          title="Glossary"
          text="110 HVAC terms explained plainly."
        />
        <MoreCard
          to="/flashcards"
          icon={<Layers size={16} />}
          title="Flashcards"
          text="Revise key terms, card by card."
        />
      </section>
    </div>
  );
}

function MoreCard({
  to,
  icon,
  title,
  text,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition hover:border-teal-400 dark:border-slate-800 dark:bg-slate-900"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          {title}
        </h3>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">{text}</p>
      </div>
    </Link>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-1 text-teal-600 dark:text-teal-400">
        {icon}
      </div>
      <p className="mt-1 text-lg font-extrabold text-slate-900 dark:text-white">
        {value}
      </p>
      <p className="text-[11px] text-slate-500">{label}</p>
    </div>
  );
}
