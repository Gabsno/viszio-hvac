import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getTool, TOOLS } from '../tools';
import { Icon } from '../components/Icon';
import { trackEvent } from '../lib/analytics';
import { useProgressStore } from '../store/useProgressStore';

export function ToolPage() {
  const { id = '' } = useParams();
  const tool = getTool(id);
  const recordToolUse = useProgressStore((s) => s.recordToolUse);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (getTool(id)) {
      trackEvent(`tool: ${id}`);
      recordToolUse(id);
    }
  }, [id, recordToolUse]);

  if (!tool) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Tool not found
        </h1>
        <Link
          to="/tools"
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white"
        >
          <ArrowLeft size={15} /> All tools
        </Link>
      </div>
    );
  }

  const { Component } = tool;

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
      <Link
        to="/tools"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal-700"
      >
        <ArrowLeft size={14} /> All tools
      </Link>

      <div className="mt-2 flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-700 text-white">
          <Icon name={tool.icon} size={18} />
        </span>
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {tool.title}
          </h1>
          <p className="text-xs text-slate-500">{tool.description}</p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <Component />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {TOOLS.filter((t) => t.id !== tool.id)
          .slice(0, 4)
          .map((t) => (
            <Link
              key={t.id}
              to={`/tools/${t.id}`}
              className="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-600 hover:border-teal-400 hover:text-teal-700 dark:border-slate-700 dark:text-slate-300"
            >
              {t.title}
            </Link>
          ))}
      </div>
    </div>
  );
}
