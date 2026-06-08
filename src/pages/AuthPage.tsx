import { useState } from 'react';
import { Eye, EyeOff, Loader2, Mail, Sparkles } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { APP_NAME, APP_TAGLINE } from '../config';

type Mode = 'signin' | 'signup';

export function AuthPage() {
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<string | null>(null);
  const signIn = useAuthStore((s) => s.signIn);
  const signUp = useAuthStore((s) => s.signUp);
  const error = useAuthStore((s) => s.error);
  const clearError = useAuthStore((s) => s.clearError);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    clearError();
    setInfo(null);
    setLoading(true);
    const trimmedEmail = email.trim().toLowerCase();
    let ok = false;
    if (mode === 'signup') {
      ok = await signUp(trimmedEmail, password);
      if (ok) {
        setInfo(
          'Account created. If email confirmations are on, check your inbox to verify before logging in.',
        );
      }
    } else {
      ok = await signIn(trimmedEmail, password);
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-teal-50 px-4 py-10 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950/30">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-700 text-white shadow-md">
            <Sparkles size={22} />
          </span>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {APP_NAME}
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {APP_TAGLINE}
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-4 grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          {(['signin', 'signup'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                clearError();
                setInfo(null);
              }}
              className={`rounded-lg py-1.5 text-sm font-bold transition ${
                mode === m
                  ? 'bg-white text-teal-700 shadow-sm dark:bg-slate-900 dark:text-teal-300'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {m === 'signin' ? 'Log in' : 'Sign up'}
            </button>
          ))}
        </div>

        {/* Form */}
        <form
          onSubmit={submit}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Email
          </label>
          <div className="mt-1 flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-800">
            <Mail size={15} className="shrink-0 text-slate-400" />
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
          </div>

          <label className="mt-3 block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Password
          </label>
          <div className="mt-1 flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-800">
            <input
              type={showPassword ? 'text' : 'password'}
              autoComplete={
                mode === 'signin' ? 'current-password' : 'new-password'
              }
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={
                mode === 'signin' ? 'Your password' : 'At least 6 characters'
              }
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          {error && (
            <p className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">
              {error}
            </p>
          )}
          {info && !error && (
            <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
              {info}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !email || password.length < 6}
            className="tap mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading && <Loader2 size={15} className="animate-spin-slow" />}
            {mode === 'signin' ? 'Log in' : 'Create account'}
          </button>

          <p className="mt-3 text-center text-[11px] text-slate-400">
            {mode === 'signin' ? (
              <>
                New here?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="font-semibold text-teal-700 hover:underline dark:text-teal-300"
                >
                  Create an account
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="font-semibold text-teal-700 hover:underline dark:text-teal-300"
                >
                  Log in
                </button>
              </>
            )}
          </p>
        </form>

        <p className="mt-4 text-center text-[11px] text-slate-400">
          Your email is used to save your progress and let you sign in from any
          device. We don't sell it or use it for marketing.
        </p>
      </div>
    </div>
  );
}
