import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { AuthPage } from '../pages/AuthPage';
import { AUTH_ENABLED } from '../config';
import { ensureProgressMigrated } from '../lib/migrateProgress';

/**
 * Wraps the authenticated portion of the app. While Supabase auth is
 * configured, users must sign in to see anything. When AUTH_ENABLED is
 * false, this is a transparent passthrough so the legacy access-code
 * gate still works.
 *
 * On first authenticated render for a user we run the one-time progress
 * migration so existing testers don't lose their localStorage data.
 */
export function AuthGate({ children }: { children: React.ReactNode }) {
  const initializing = useAuthStore((s) => s.initializing);
  const initialized = useAuthStore((s) => s.initialized);
  const user = useAuthStore((s) => s.user);
  const init = useAuthStore((s) => s.init);

  // Track whether we've already kicked off migration for the current user.
  const migratedFor = useRef<string | null>(null);
  const [migrating, setMigrating] = useState(false);

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!AUTH_ENABLED) return;
    if (!user) {
      migratedFor.current = null;
      return;
    }
    if (migratedFor.current === user.id) return;
    migratedFor.current = user.id;
    setMigrating(true);
    ensureProgressMigrated(user.id).finally(() => setMigrating(false));
  }, [user]);

  if (!AUTH_ENABLED) return <>{children}</>;

  if (initializing || !initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 size={28} className="animate-spin-slow text-teal-600" />
      </div>
    );
  }

  if (!user) return <AuthPage />;

  if (migrating) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-50 dark:bg-slate-950">
        <Loader2 size={28} className="animate-spin-slow text-teal-600" />
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Preparing your account…
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
