import { Link } from 'react-router-dom';
import { Clock, CheckCircle2 } from 'lucide-react';
import { pillarTitle, topicTitle } from '../lib/content';
import { DifficultyBadge, TierBadge, RegionBadge } from './Badges';
import { useProgressStore } from '../store/useProgressStore';
import type { Article } from '../types';

export function ArticleCard({ article }: { article: Article }) {
  const isRead = useProgressStore((s) => s.readArticles.includes(article.id));

  return (
    <Link
      to={`/article/${article.id}`}
      className="group flex flex-col rounded-xl border border-slate-200 bg-white p-4 transition hover:border-teal-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-teal-600"
    >
      <div className="mb-1.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-400">
        <span className="truncate">
          {pillarTitle(article.pillar)} › {topicTitle(article.topic)}
        </span>
        {isRead && (
          <CheckCircle2 size={13} className="ml-auto shrink-0 text-emerald-500" />
        )}
      </div>
      <h3 className="text-[15px] font-bold leading-snug text-slate-900 group-hover:text-teal-800 dark:text-white dark:group-hover:text-teal-300">
        {article.title}
      </h3>
      <p className="mt-1.5 line-clamp-2 flex-1 text-xs text-slate-500 dark:text-slate-400">
        {article.excerpt}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <DifficultyBadge value={article.difficulty} />
        <TierBadge value={article.tier} />
        <RegionBadge value={article.region} />
        <span className="ml-auto flex items-center gap-1 text-[11px] text-slate-400">
          <Clock size={11} />
          {article.estimated_minutes} min
        </span>
      </div>
    </Link>
  );
}
