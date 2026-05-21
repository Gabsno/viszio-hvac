import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getArticles } from '../lib/content';
import { topicTitle } from '../lib/content';

interface Props {
  ids: string[];
  title?: string;
}

/** "What to read next" footer block. */
export function RelatedArticles({ ids, title = 'What to read next' }: Props) {
  const articles = getArticles(ids);
  if (articles.length === 0) return null;

  return (
    <section className="mt-10 border-t border-slate-200 pt-6 dark:border-slate-800">
      <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {title}
      </h2>
      <div className="grid gap-2 sm:grid-cols-2">
        {articles.map((a) => (
          <Link
            key={a.id}
            to={`/article/${a.id}`}
            className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 transition hover:border-teal-400 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-teal-600"
          >
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-400">
                {topicTitle(a.topic)}
              </p>
              <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                {a.title}
              </p>
            </div>
            <ArrowRight
              size={16}
              className="shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-teal-600"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
