import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Info, ArrowRight, Download } from 'lucide-react';
import { VERSION_CHECK_INTERVAL, APP_NAME } from '../config';
import { fetchDeployedVersion, isRevoked, lockdown } from '../lib/version';
import { downloadExport, hasAnyProgress } from '../lib/exportData';

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
      await lockdown(v?.wipe === true);
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
  const canExport = hasAnyProgress();
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
            'This version of the app has retired. Viszio HVAC is becoming part of Viszio Academy — a mobile app on the Play Store and App Store.'}
        </p>
        {canExport && (
          <div className="mt-4 rounded-lg border border-ghana-300 bg-ghana-50 p-3 dark:border-ghana-700 dark:bg-ghana-950/40">
            <p className="text-xs font-semibold text-ghana-800 dark:text-ghana-200">
              You still have local progress on this device. Download it
              before closing this tab — Viszio Academy can import it.
            </p>
            <button
              onClick={() => downloadExport()}
              className="tap mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-ghana-600 px-4 py-2 text-xs font-bold text-white hover:bg-ghana-700"
            >
              <Download size={13} /> Download my progress
            </button>
          </div>
        )}
        {url && (
          <a
            href={url}
            className="tap mt-4 inline-flex items-center gap-1.5 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-teal-800"
          >
            Open Viszio Academy <ArrowRight size={15} />
          </a>
        )}
      </div>
    </div>
  );
}
