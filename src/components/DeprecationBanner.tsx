import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, X } from 'lucide-react';
import { DEPRECATION } from '../config';

const DISMISS_KEY = 'viszio-hvac-deprecation-dismissed-v1';

/**
 * Top-of-page banner announcing the move to Viszio Academy. Dismissible
 * for a calmer browsing experience, but the dismissal is keyed to the
 * banner version so a future urgent update re-shows itself.
 */
export function DeprecationBanner() {
  const [dismissed, setDismissed] = useState<boolean>(() => {
    try {
      return localStorage.getItem(DISMISS_KEY) === '1';
    } catch {
      return false;
    }
  });

  if (!DEPRECATION.enabled || dismissed) return null;

  function dismiss() {
    try {
      localStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* ignore */
    }
    setDismissed(true);
  }

  return (
    <div className="sticky top-0 z-30 border-b border-ghana-300 bg-gradient-to-r from-ghana-50 to-amber-50 px-3 py-2 dark:border-ghana-700 dark:from-ghana-950/60 dark:to-amber-950/40">
      <div className="mx-auto flex max-w-5xl items-center gap-3">
        <p className="min-w-0 flex-1 text-xs font-medium text-ghana-800 dark:text-ghana-100">
          {DEPRECATION.message}
        </p>
        <Link
          to={DEPRECATION.exportUrl}
          className="shrink-0 inline-flex items-center gap-1 rounded-lg bg-ghana-600 px-3 py-1 text-xs font-bold text-white hover:bg-ghana-700"
        >
          <Download size={12} /> Export
        </Link>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="shrink-0 rounded p-1 text-ghana-700 hover:bg-ghana-100 dark:text-ghana-200 dark:hover:bg-ghana-900/40"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
