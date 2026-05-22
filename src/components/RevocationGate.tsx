import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Info, ArrowRight } from 'lucide-react';
import { VERSION_CHECK_INTERVAL, APP_NAME } from '../config';
import { fetchDeployedVersion, isRevoked, lockdown } from '../lib/version';

interface RevokedInfo {
  message: string;
  newUrl: string;
}

/**
 * Remote kill switch. Polls version.json; if the owner has set status to
 * 'revoked', this copy wipes its saved data and offline cache, unregisters
 * its service worker, and shows the retired screen instead of the app.
 *
 * A device that is offline is simply not reached — it locks the next time it
 * connects. Copies installed before this gate existed cannot be revoked.
 */
export function RevocationGate({ children }: { children: ReactNode }) {
  const [revoked, setRevoked] = useState<RevokedInfo | null>(null);
  const handled = useRef(false);

  useEffect(() => {
    let cancelled = false;
    async function check() {
      const v = await fetchDeployedVersion();
      if (cancelled || handled.current || !isRevoked(v)) return;
      handled.current = true;
      setRevoked({ message: v?.message ?? '', newUrl: v?.newUrl ?? '' });
      await lockdown();
    }
    check();
    const timer = setInterval(check, VERSION_CHECK_INTERVAL);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  if (revoked) return <RetiredScreen info={revoked} />;
  return <>{children}</>;
}

function RetiredScreen({ info }: { info: RevokedInfo }) {
  const url = info.newUrl.trim();
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-5">
      <div className="w-full max-w-sm rounded-2xl bg-white p-7 text-center shadow-2xl dark:bg-slate-900">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-700 text-white">
          <Info size={22} />
        </div>
        <h1 className="mt-4 text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
          {APP_NAME}
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {info.message.trim() ||
            'This version of the app is no longer available. Please contact the Viszio HVAC team.'}
        </p>
        {url && (
          <a
            href={url}
            className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-teal-800"
          >
            Open the new app <ArrowRight size={15} />
          </a>
        )}
      </div>
    </div>
  );
}
