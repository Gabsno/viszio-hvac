import { Link } from 'react-router-dom';
import { Calculator, ArrowRight } from 'lucide-react';
import { TOOLS } from '../tools';
import { Icon } from '../components/Icon';

export function ToolsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-700 text-white">
          <Calculator size={18} />
        </span>
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            HVAC Tools
          </h1>
          <p className="text-xs text-slate-500">
            {TOOLS.length} engineering calculators — everything runs in your
            browser, even offline.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((t) => (
          <Link
            key={t.id}
            to={`/tools/${t.id}`}
            className="group flex flex-col rounded-xl border border-slate-200 bg-white p-4 transition hover:border-teal-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-teal-600"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300">
              <Icon name={t.icon} size={18} />
            </span>
            <h2 className="mt-2.5 font-bold text-slate-900 group-hover:text-teal-800 dark:text-white dark:group-hover:text-teal-300">
              {t.title}
            </h2>
            <p className="mt-1 flex-1 text-xs text-slate-500 dark:text-slate-400">
              {t.description}
            </p>
            <span className="mt-3 flex items-center gap-1 text-xs font-semibold text-teal-700 dark:text-teal-400">
              Open tool
              <ArrowRight
                size={13}
                className="transition group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
