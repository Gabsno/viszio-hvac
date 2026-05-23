import { useEffect, useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { latestWhatsNew } from '../data/whatsNew';
import { trackEvent } from '../lib/analytics';

const STORAGE_KEY = 'viszio-hvac-whats-new-seen';

export function WhatsNewModal() {
  const entry = latestWhatsNew();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!entry) return;
    try {
      const seen = localStorage.getItem(STORAGE_KEY);
      if (seen !== entry.id) {
        setOpen(true);
        trackEvent(`whats-new-shown: ${entry.id}`);
      }
    } catch {
      /* localStorage may be unavailable — fail closed (don't show). */
    }
  }, [entry]);

  function dismiss() {
    if (entry) {
      try {
        localStorage.setItem(STORAGE_KEY, entry.id);
      } catch {
        /* ignore */
      }
      trackEvent(`whats-new-dismissed: ${entry.id}`);
    }
    setOpen(false);
  }

  if (!entry || !open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
      onClick={dismiss}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
      >
        <div className="flex items-center justify-between bg-gradient-to-r from-teal-700 to-teal-600 px-5 py-4 text-white">
          <div className="flex items-center gap-2">
            <Sparkles size={18} />
            <h2 className="text-sm font-bold uppercase tracking-wide">
              What's New
            </h2>
          </div>
          <button
            onClick={dismiss}
            aria-label="Close"
            className="rounded-full p-1 text-white/80 hover:bg-white/10 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-5 py-4">
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-300">
            {entry.date}
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
            {entry.title}
          </h3>
          <ul className="mt-3 space-y-2">
            {entry.items.map((item, i) => (
              <li
                key={i}
                className="flex gap-2 text-sm text-slate-700 dark:text-slate-300"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-end border-t border-slate-200 px-5 py-3 dark:border-slate-700">
          <button
            onClick={dismiss}
            className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
