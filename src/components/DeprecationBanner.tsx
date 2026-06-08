import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, X, AlertTriangle } from 'lucide-react';
import { DEPRECATION } from '../config';

const DISMISS_KEY = 'viszio-hvac-deprecation-dismissed-v2';

type Severity = 'calm' | 'urgent' | 'critical' | 'retired';

function severityFor(daysLeft: number, hoursLeft: number): Severity {
  if (daysLeft < 0 && hoursLeft <= 0) return 'retired';
  if (hoursLeft <= 24) return 'critical';
  if (daysLeft <= 3) return 'urgent';
  return 'calm';
}

function format(daysLeft: number, hoursLeft: number): string {
  if (daysLeft >= 1) {
    return `Retires in ${daysLeft} day${daysLeft === 1 ? '' : 's'}`;
  }
  if (hoursLeft >= 2) {
    return `Retires in ${hoursLeft} hours`;
  }
  if (hoursLeft >= 1) {
    return `Retires in under an hour`;
  }
  return `Retiring now`;
}

/**
 * Top-of-page deprecation banner. Calm pumpkin tone in the early days,
 * shifts to urgent amber inside 3 days, critical rose inside 24 hours,
 * and a final retired-but-export-still-works state once the window
 * closes (the live revoke happens via the GitHub Action; this UI is the
 * user-facing countdown that arrives ahead of it).
 */
export function DeprecationBanner() {
  const [dismissed, setDismissed] = useState<boolean>(() => {
    try {
      return localStorage.getItem(DISMISS_KEY) === '1';
    } catch {
      return false;
    }
  });
  // Tick once a minute so the countdown stays fresh without thrashing render.
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!DEPRECATION.enabled) return null;

  const target = new Date(DEPRECATION.revocationDate).getTime();
  const now = Date.now();
  const msLeft = target - now;
  const hoursLeft = Math.floor(msLeft / 3_600_000);
  const daysLeft = Math.floor(msLeft / 86_400_000);
  const sev = severityFor(daysLeft, hoursLeft);

  // Calm banner can be dismissed; the urgent / critical / retired ones cannot.
  if (sev === 'calm' && dismissed) return null;

  function dismiss() {
    try {
      localStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* ignore */
    }
    setDismissed(true);
  }

  const palette: Record<
    Severity,
    {
      bg: string;
      text: string;
      icon: React.ReactNode;
      label: string;
      cta: string;
      ctaBg: string;
    }
  > = {
    calm: {
      bg: 'border-ghana-300 bg-gradient-to-r from-ghana-50 to-amber-50 dark:border-ghana-700 dark:from-ghana-950/60 dark:to-amber-950/40',
      text: 'text-ghana-800 dark:text-ghana-100',
      icon: null,
      label: format(daysLeft, hoursLeft),
      cta: 'Export',
      ctaBg: 'bg-ghana-600 hover:bg-ghana-700',
    },
    urgent: {
      bg: 'border-amber-400 bg-gradient-to-r from-amber-100 to-orange-100 dark:border-amber-700 dark:from-amber-950/70 dark:to-orange-950/60',
      text: 'text-amber-900 dark:text-amber-100',
      icon: <AlertTriangle size={14} />,
      label: format(daysLeft, hoursLeft),
      cta: 'Export now',
      ctaBg: 'bg-amber-600 hover:bg-amber-700',
    },
    critical: {
      bg: 'border-rose-400 bg-gradient-to-r from-rose-100 to-rose-50 animate-pulse-soft dark:border-rose-700 dark:from-rose-950/70 dark:to-rose-900/60',
      text: 'text-rose-900 dark:text-rose-100',
      icon: <AlertTriangle size={14} />,
      label: format(daysLeft, hoursLeft),
      cta: 'Export now',
      ctaBg: 'bg-rose-600 hover:bg-rose-700',
    },
    retired: {
      bg: 'border-slate-400 bg-gradient-to-r from-slate-200 to-slate-100 dark:border-slate-600 dark:from-slate-900 dark:to-slate-800',
      text: 'text-slate-900 dark:text-slate-100',
      icon: <AlertTriangle size={14} />,
      label: 'Viszio HVAC has retired',
      cta: 'Last export',
      ctaBg: 'bg-slate-700 hover:bg-slate-800',
    },
  };
  const p = palette[sev];

  return (
    <div
      role="status"
      className={`sticky top-0 z-30 border-b ${p.bg} px-3 py-2`}
    >
      <div className="mx-auto flex max-w-5xl items-center gap-3">
        <div
          className={`flex min-w-0 flex-1 items-center gap-1.5 text-xs font-medium ${p.text}`}
        >
          {p.icon && <span className="shrink-0">{p.icon}</span>}
          <span className="shrink-0 font-bold">{p.label}</span>
          <span className="hidden truncate sm:inline">·</span>
          <span className="hidden truncate sm:inline">
            Viszio HVAC is moving to Viszio Academy — export your progress.
          </span>
        </div>
        <Link
          to={DEPRECATION.exportUrl}
          className={`shrink-0 inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-bold text-white ${p.ctaBg}`}
        >
          <Download size={12} /> {p.cta}
        </Link>
        {sev === 'calm' && (
          <button
            onClick={dismiss}
            aria-label="Dismiss"
            className={`shrink-0 rounded p-1 ${p.text} hover:bg-white/30`}
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
