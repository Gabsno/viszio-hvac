import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronDown, CheckCircle2, Circle } from 'lucide-react';
import { TREE } from '../lib/content';
import { getArticle } from '../lib/content';
import { Icon } from './Icon';
import { useProgressStore } from '../store/useProgressStore';
import { useUIStore } from '../store/useUIStore';

export function Sidebar() {
  const { id: activeId } = useParams();
  const readArticles = useProgressStore((s) => s.readArticles);
  const closeDrawer = useUIStore((s) => s.setSidebarOpen);

  const activeArticle = activeId ? getArticle(activeId) : undefined;
  const [openPillars, setOpenPillars] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    for (const p of TREE) {
      init[p.meta.slug] =
        activeArticle?.pillar === p.meta.slug || TREE.length <= 2;
    }
    // Default: open the first pillar so the tree never looks empty.
    if (!activeArticle && TREE[0]) init[TREE[0].meta.slug] = true;
    return init;
  });

  return (
    <nav className="flex h-full flex-col overflow-y-auto px-3 py-4">
      <p className="px-2 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
        Library
      </p>

      {TREE.map((pillar) => {
        const open = openPillars[pillar.meta.slug];
        return (
          <div key={pillar.meta.slug} className="mb-0.5">
            <button
              onClick={() =>
                setOpenPillars((s) => ({
                  ...s,
                  [pillar.meta.slug]: !s[pillar.meta.slug],
                }))
              }
              className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Icon
                name={pillar.meta.icon}
                size={16}
                className="text-teal-600 dark:text-teal-400"
              />
              <span className="flex-1">{pillar.meta.title}</span>
              <span className="text-[11px] font-normal text-slate-400">
                {pillar.articleCount}
              </span>
              <ChevronDown
                size={15}
                className={`text-slate-400 transition-transform ${
                  open ? '' : '-rotate-90'
                }`}
              />
            </button>

            {open && (
              <div className="ml-3 border-l border-slate-200 pl-2 dark:border-slate-800">
                {pillar.topics.map((topic) => (
                  <div key={topic.slug} className="mb-1 mt-1.5">
                    <p className="px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                      {topic.title}
                    </p>
                    {topic.articles.map((article) => {
                      const isActive = article.id === activeId;
                      const isRead = readArticles.includes(article.id);
                      return (
                        <Link
                          key={article.id}
                          to={`/article/${article.id}`}
                          onClick={() => closeDrawer(false)}
                          className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[13px] transition ${
                            isActive
                              ? 'bg-teal-50 font-semibold text-teal-800 dark:bg-teal-950/60 dark:text-teal-300'
                              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                          }`}
                        >
                          {isRead ? (
                            <CheckCircle2
                              size={14}
                              className="shrink-0 text-emerald-500"
                            />
                          ) : (
                            <Circle
                              size={14}
                              className="shrink-0 text-slate-300 dark:text-slate-600"
                            />
                          )}
                          <span className="leading-snug">{article.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
