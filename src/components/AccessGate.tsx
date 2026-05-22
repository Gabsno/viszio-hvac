import { useState, type FormEvent, type ReactNode } from 'react';
import { Lock, KeyRound } from 'lucide-react';
import { ACCESS_GATE_ENABLED, ACCESS_CODE_HASH, APP_NAME } from '../config';
import { trackEvent } from '../lib/analytics';

const STORAGE_KEY = 'viszio-hvac-access';

/** SHA-256 of a string as lowercase hex (matches scripts/make-access-code.mjs). */
async function sha256Hex(text: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(text),
  );
  return [...new Uint8Array(buf)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Shared access-code lock. While ACCESS_GATE_ENABLED is true, the app is
 * hidden behind a code screen until the visitor enters the correct code
 * (verified against a SHA-256 hash). The unlock is remembered on the device.
 */
export function AccessGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(
    () =>
      !ACCESS_GATE_ENABLED ||
      localStorage.getItem(STORAGE_KEY) === ACCESS_CODE_HASH,
  );
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(false);

  if (unlocked) return <>{children}</>;

  async function submit(e: FormEvent) {
    e.preventDefault();
    const value = code.trim();
    if (!value || checking) return;
    setChecking(true);
    setError(false);
    const hash = await sha256Hex(value);
    if (hash === ACCESS_CODE_HASH) {
      localStorage.setItem(STORAGE_KEY, hash);
      trackEvent('access-unlocked');
      setUnlocked(true);
    } else {
      trackEvent('access-failed');
      setError(true);
      setChecking(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-800 via-teal-900 to-teal-950 p-5">
      <div className="w-full max-w-sm rounded-2xl bg-white p-7 shadow-2xl dark:bg-slate-900">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-teal-700 text-white">
          <Lock size={22} />
        </div>
        <h1 className="mt-4 text-center text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
          {APP_NAME}
        </h1>
        <p className="mt-1 text-center text-sm text-slate-500 dark:text-slate-400">
          This is a private preview. Enter your access code to continue.
        </p>

        <form onSubmit={submit} className="mt-5">
          <div className="relative">
            <KeyRound
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="password"
              autoFocus
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError(false);
              }}
              placeholder="Access code"
              className={`w-full rounded-lg border bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:ring-2 dark:bg-slate-800 ${
                error
                  ? 'border-rose-400 focus:ring-rose-400/30'
                  : 'border-slate-300 focus:border-teal-500 focus:ring-teal-500/30 dark:border-slate-700'
              }`}
            />
          </div>
          {error && (
            <p className="mt-2 text-xs font-medium text-rose-600 dark:text-rose-400">
              That code is not correct. Please check and try again.
            </p>
          )}
          <button
            type="submit"
            disabled={checking || !code.trim()}
            className="mt-3 w-full rounded-lg bg-teal-700 py-2.5 text-sm font-bold text-white hover:bg-teal-800 disabled:opacity-50"
          >
            {checking ? 'Checking…' : 'Unlock'}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-slate-400">
          Need a code? Contact the Viszio HVAC team.
        </p>
      </div>
    </div>
  );
}
