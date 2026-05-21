import { useEffect, useState } from 'react';
import { RefreshCw, X } from 'lucide-react';
import { VERSION_CHECK_INTERVAL } from '../config';
import { fetchDeployedVersion, isStale } from '../lib/version';

/**
 * Polls version.json every 60s. When the deployed build differs from the
 * running build, slides up a banner prompting a reload.
 */
export function UpdateBanner() {
  const [stale, setStale] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function check() {
      const deployed = await fetchDeployedVersion();
      if (!cancelled && isStale(deployed)) setStale(true);
    }
    check();
    const timer = setInterval(check, VERSION_CHECK_INTERVAL);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  if (!stale || dismissed) return null;

  return (
    <div className="animate-slide-up fixed inset-x-0 bottom-0 z-[70] flex items-center gap-3 border-t border-teal-500 bg-teal-700 px-4 py-3 text-white shadow-2xl sm:inset-x-auto sm:bottom-4 sm:right-4 sm:rounded-xl sm:border">
      <RefreshCw size={18} className="shrink-0" />
      <p className="flex-1 text-sm font-medium">
        A new version of Viszio HVAC is ready.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="rounded-lg bg-white px-3 py-1.5 text-sm font-bold text-teal-700 hover:bg-teal-50"
      >
        Refresh
      </button>
      <button
        onClick={() => setDismissed(true)}
        className="rounded-lg p-1 text-teal-200 hover:bg-teal-600 hover:text-white"
        aria-label="Dismiss"
      >
        <X size={16} />
      </button>
    </div>
  );
}
