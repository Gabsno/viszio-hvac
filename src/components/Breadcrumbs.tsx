import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { pillarTitle, topicTitle } from '../lib/content';
import type { Article } from '../types';

export function Breadcrumbs({ article }: { article: Article }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-1 text-xs text-slate-500 dark:text-slate-400"
    >
      <Link to="/library" className="hover:text-teal-700 dark:hover:text-teal-400">
        Library
      </Link>
      <ChevronRight size={13} className="text-slate-300" />
      <Link
        to={`/library?pillar=${article.pillar}`}
        className="hover:text-teal-700 dark:hover:text-teal-400"
      >
        {pillarTitle(article.pillar)}
      </Link>
      <ChevronRight size={13} className="text-slate-300" />
      <span className="font-medium text-slate-700 dark:text-slate-300">
        {topicTitle(article.topic)}
      </span>
    </nav>
  );
}
