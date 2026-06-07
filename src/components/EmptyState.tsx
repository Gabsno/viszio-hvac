import { Link } from 'react-router-dom';

interface Props {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    to: string;
  };
}

/**
 * Empty-state placeholder. Shown when a list has no items yet: bookmarks,
 * notes, search no-results, locked content. Always pairs a friendly icon
 * with a one-line "what is this", a sentence of help, and an optional CTA
 * to the place that fills the empty list.
 */
export function EmptyState({ icon, title, description, action }: Props) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 py-10 text-center dark:border-slate-700 dark:bg-slate-900/60">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-100 to-teal-50 text-teal-700 ring-1 ring-teal-200 dark:from-teal-950 dark:to-teal-950/40 dark:text-teal-300 dark:ring-teal-900">
        {icon}
      </span>
      <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
        {description}
      </p>
      {action && (
        <Link
          to={action.to}
          className="tap mt-4 inline-flex items-center gap-1.5 rounded-lg bg-teal-700 px-4 py-2 text-sm font-bold text-white hover:bg-teal-800"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
