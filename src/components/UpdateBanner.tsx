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
    <div className="animate-slide-up fixed inset-x-0 top-0 z-[70] flex items-center gap-3 border-b-2 border-teal-400 bg-teal-700 px-4 py-3 text-white shadow-xl">
      <RefreshCw size={18} className="shrink-0 animate-spin-slow" />
      <p className="flex-1 text-sm font-semibold">
        A new version is ready — tap Refresh to load the latest.
      </p>
      <button
        onClick={async () => {
          // Clear the service worker cache so the next load definitely
          // gets the new build (PWAs are aggressive about caching).
          try {
            if ('serviceWorker' in navigator) {
              const regs = await navigator.serviceWorker.getRegistrations();
              await Promise.all(regs.map((r) => r.update()));
            }
            if ('caches' in window) {
              const keys = await caches.keys();
              await Promise.all(keys.map((k) => caches.delete(k)));
            }
          } catch {
            /* ignore — reload will still happen */
          }
          window.location.reload();
        }}
        className="rounded-lg bg-white px-4 py-1.5 text-sm font-bold text-teal-700 hover:bg-teal-50"
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
