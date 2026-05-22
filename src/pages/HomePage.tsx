import { Link } from 'react-router-dom';
import {
  BookOpen,
  GraduationCap,
  Flame,
  Star,
  CheckCircle2,
  Bookmark,
  ArrowRight,
  Calculator,
  MapPin,
  BookA,
  Layers,
} from 'lucide-react';
import { ARTICLES, TREE, getArticles } from '../lib/content';
import { PILLARS } from '../content/pillars';
import { Icon } from '../components/Icon';
import { ArticleCard } from '../components/ArticleCard';
import { useProgressStore } from '../store/useProgressStore';
import { COURSE, totalLessons } from '../course/courseData';
import { APP_TAGLINE } from '../config';

export function HomePage() {
  const readArticles = useProgressStore((s) => s.readArticles);
  const bookmarks = useProgressStore((s) => s.bookmarks);
  const xp = useProgressStore((s) => s.xp);
  const streak = useProgressStore((s) => s.currentStreak);
  const completedLessons = useProgressStore((s) => s.completedLessons);

  const bookmarked = getArticles(bookmarks).slice(0, 3);
  const lessonCount = totalLessons();
  const coursePct = lessonCount
    ? Math.round((completedLessons.length / lessonCount) * 100)
    : 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      {/* Hero */}
      <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-teal-700 via-teal-800 to-teal-950 p-7 text-white sm:p-10">
        <h1 className="max-w-2xl text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          HVAC engineering, made learnable.
        </h1>
        <p className="mt-2 max-w-xl text-sm text-teal-100 sm:text-base">
          {APP_TAGLINE} A searchable library and a Duolingo-style course —
          psychrometrics to VRF, ASHRAE to IFC EDGE, global-first with a Ghana
          lens.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to="/library"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-teal-800 hover:bg-teal-50"
          >
            <BookOpen size={17} /> Browse the library
          </Link>
          <Link
            to="/course"
            className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-bold text-white ring-1 ring-teal-400 hover:bg-teal-500"
          >
            <GraduationCap size={17} /> Start the course
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat
          icon={<CheckCircle2 size={18} />}
          value={`${readArticles.length}/${ARTICLES.length}`}
          label="Articles read"
        />
        <Stat
          icon={<Flame size={18} />}
          value={String(streak)}
          label={streak === 1 ? 'Day streak' : 'Day streak'}
        />
        <Stat icon={<Star size={18} />} value={String(xp)} label="XP earned" />
        <Stat
          icon={<GraduationCap size={18} />}
          value={`${coursePct}%`}
          label="Course done"
        />
      </section>

      {/* Bookmarks */}
      {bookmarked.length > 0 && (
        <section className="mt-8">
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

      {/* Pillars */}
      <section className="mt-8">
        <h2 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">
          Explore by pillar
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p) => {
            const node = TREE.find((t) => t.meta.slug === p.slug);
            return (
              <Link
                key={p.slug}
                to={`/library?pillar=${p.slug}`}
                className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:border-teal-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-teal-600"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300">
                    <Icon name={p.icon} size={18} />
                  </span>
                  <h3 className="flex-1 font-bold text-slate-900 group-hover:text-teal-800 dark:text-white">
                    {p.title}
                  </h3>
                </div>
                <p className="mt-2 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
                  {p.description}
                </p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-teal-600 dark:text-teal-400">
                  {node?.articleCount ?? 0} articles
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Course callout */}
      <section className="mt-8">
        <Link
          to="/course"
          className="group flex items-center gap-4 rounded-2xl border border-teal-200 bg-teal-50 p-5 transition hover:border-teal-400 dark:border-teal-800 dark:bg-teal-950/40"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-700 text-white">
            <GraduationCap size={24} />
          </span>
          <div className="flex-1">
            <h3 className="font-bold text-slate-900 dark:text-white">
              {COURSE.length}-module guided course
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {completedLessons.length} of {lessonCount} lessons complete · earn
              XP, build a streak, win trophies.
            </p>
          </div>
          <ArrowRight
            size={20}
            className="shrink-0 text-teal-600 transition group-hover:translate-x-1"
          />
        </Link>
      </section>

      {/* More to explore */}
      <section className="mt-8">
        <h2 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">
          More to explore
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <MoreCard
            to="/tools"
            icon={<Calculator size={18} />}
            title="Tools"
            text="Seven engineering calculators."
          />
          <MoreCard
            to="/design-data"
            icon={<MapPin size={18} />}
            title="Design Data"
            text="Ghana & Africa climate design conditions."
          />
          <MoreCard
            to="/glossary"
            icon={<BookA size={18} />}
            title="Glossary"
            text="HVAC terms explained plainly."
          />
          <MoreCard
            to="/flashcards"
            icon={<Layers size={18} />}
            title="Flashcards"
            text="Revise key terms, card by card."
          />
        </div>
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
      className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:border-teal-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-teal-600"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300">
        {icon}
      </span>
      <h3 className="mt-2.5 font-bold text-slate-900 group-hover:text-teal-800 dark:text-white dark:group-hover:text-teal-300">
        {title}
      </h3>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{text}</p>
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
    <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-1.5 text-teal-600 dark:text-teal-400">
        {icon}
        <span className="text-xl font-extrabold text-slate-900 dark:text-white">
          {value}
        </span>
      </div>
      <p className="mt-0.5 text-xs text-slate-500">{label}</p>
    </div>
  );
}
