import { useState } from 'react';
import {
  Sparkles,
  CreditCard,
  Palette,
  Info,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  Accessibility,
  Shield,
} from 'lucide-react';
import type { FontSize, ReadingMode } from '../store/useSettingsStore';
import { useSettingsStore } from '../store/useSettingsStore';
import { useProgressStore } from '../store/useProgressStore';
import { useUserStore } from '../store/useUserStore';
import { BUILD_INFO } from '../lib/version';
import {
  APP_NAME,
  SUPPORT_EMAIL,
  SAAS_MODE_ENABLED,
  ANALYTICS,
} from '../config';

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {icon}
        {title}
      </h2>
      {children}
    </section>
  );
}

export function SettingsPage() {
  const {
    aiProvider,
    geminiKey,
    claudeKey,
    theme,
    fontSize,
    readingMode,
    setProvider,
    setGeminiKey,
    setClaudeKey,
    setTheme,
    setFontSize,
    setReadingMode,
  } = useSettingsStore();
  const resetProgress = useProgressStore((s) => s.resetProgress);
  const tier = useUserStore((s) => s.tier);

  const [showKey, setShowKey] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <div className="mx-auto max-w-2xl space-y-5 px-4 py-6 sm:px-6">
      <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        Settings
      </h1>

      {/* AI Tutor */}
      <Section icon={<Sparkles size={15} />} title="AI Tutor">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Choose an AI provider and paste an API key. Keys are stored only in
          this browser and sent directly to the provider — never to us.
        </p>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            onClick={() => setProvider('gemini')}
            className={`rounded-lg border p-3 text-left transition ${
              aiProvider === 'gemini'
                ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/50'
                : 'border-slate-300 dark:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                Google Gemini
              </span>
              <span className="rounded bg-emerald-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                FREE
              </span>
            </div>
            <p className="mt-0.5 text-xs text-slate-500">
              Free key from Google AI Studio
            </p>
          </button>
          <button
            onClick={() => setProvider('claude')}
            className={`rounded-lg border p-3 text-left transition ${
              aiProvider === 'claude'
                ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/50'
                : 'border-slate-300 dark:border-slate-700'
            }`}
          >
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              Anthropic Claude
            </span>
            <p className="mt-0.5 text-xs text-slate-500">Paid API key</p>
          </button>
        </div>

        <div className="mt-3">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            {aiProvider === 'gemini' ? 'Gemini API key' : 'Claude API key'}
          </label>
          <div className="relative mt-1">
            <input
              type={showKey ? 'text' : 'password'}
              value={aiProvider === 'gemini' ? geminiKey : claudeKey}
              onChange={(e) =>
                aiProvider === 'gemini'
                  ? setGeminiKey(e.target.value)
                  : setClaudeKey(e.target.value)
              }
              placeholder={
                aiProvider === 'gemini' ? 'AIza…' : 'sk-ant-…'
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 pr-10 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 dark:border-slate-700 dark:bg-slate-800"
            />
            <button
              onClick={() => setShowKey((s) => !s)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label={showKey ? 'Hide key' : 'Show key'}
            >
              {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <p className="mt-1.5 text-xs text-slate-500">
            {aiProvider === 'gemini' ? (
              <>
                Get a free key at{' '}
                <a
                  href="https://aistudio.google.com/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-teal-700 underline dark:text-teal-400"
                >
                  aistudio.google.com/apikey
                </a>
              </>
            ) : (
              <>
                Get a key at{' '}
                <a
                  href="https://console.anthropic.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-teal-700 underline dark:text-teal-400"
                >
                  console.anthropic.com
                </a>
              </>
            )}
          </p>
        </div>
      </Section>

      {/* Subscription */}
      <Section icon={<CreditCard size={15} />} title="Subscription">
        <div className="flex items-center gap-3 rounded-lg bg-teal-50 p-3 dark:bg-teal-950/50">
          <CheckCircle2 size={20} className="shrink-0 text-teal-600" />
          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              Free tier — full access during beta
            </p>
            <p className="text-xs text-slate-500">
              Every article and lesson is unlocked. Current plan:{' '}
              <span className="font-semibold uppercase">{tier}</span>.
              {!SAAS_MODE_ENABLED &&
                ' Paid plans arrive after the beta.'}
            </p>
          </div>
        </div>
      </Section>

      {/* Appearance */}
      <Section icon={<Palette size={15} />} title="Appearance">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-700 dark:text-slate-300">
            Theme
          </span>
          <div className="flex rounded-lg bg-slate-100 p-0.5 dark:bg-slate-800">
            {(['light', 'dark'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold capitalize transition ${
                  theme === t
                    ? 'bg-white text-teal-700 shadow-sm dark:bg-slate-700 dark:text-teal-300'
                    : 'text-slate-500'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* Accessibility */}
      <Section
        icon={<Accessibility size={15} />}
        title="Accessibility & reading"
      >
        <div className="space-y-4">
          <div>
            <p className="mb-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
              Text size
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(
                [
                  ['small', 'Small'],
                  ['normal', 'Normal'],
                  ['large', 'Large'],
                  ['xlarge', 'Largest'],
                ] as [FontSize, string][]
              ).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setFontSize(val)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    fontSize === val
                      ? 'bg-teal-700 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
              Reading mode
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(
                [
                  ['default', 'Default'],
                  ['high-contrast', 'High contrast'],
                  ['dyslexia', 'Dyslexia-friendly'],
                ] as [ReadingMode, string][]
              ).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setReadingMode(val)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    readingMode === val
                      ? 'bg-teal-700 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="mt-1.5 text-xs text-slate-400">
              Dyslexia-friendly mode adds letter and line spacing in articles.
              High contrast maximises text contrast for easier reading.
            </p>
          </div>
        </div>
      </Section>

      {/* Data */}
      <Section icon={<Trash2 size={15} />} title="Your data">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Bookmarks, notes, read progress, XP and streaks are stored on this
          device only. Resetting clears course progress, XP, streaks and
          trophies.
        </p>
        {confirmReset ? (
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={() => {
                resetProgress();
                setConfirmReset(false);
              }}
              className="rounded-lg bg-rose-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-rose-700"
            >
              Confirm reset
            </button>
            <button
              onClick={() => setConfirmReset(false)}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-600 dark:border-slate-700"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmReset(true)}
            className="mt-3 rounded-lg border border-rose-300 px-3 py-1.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:border-rose-800 dark:hover:bg-rose-950/40"
          >
            Reset course progress
          </button>
        )}
      </Section>

      {/* Privacy */}
      <Section icon={<Shield size={15} />} title="Privacy">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Your bookmarks, notes, course progress and settings are stored only
          on this device. They are never uploaded, and the Viszio HVAC team
          cannot see them.
        </p>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {ANALYTICS.enabled
            ? 'Anonymous, cookieless usage statistics — which pages are viewed — are collected to understand which content is most useful. No personal data, no accounts, and never your private notes.'
            : 'No usage tracking is currently active.'}
        </p>
      </Section>

      {/* About */}
      <Section icon={<Info size={15} />} title="About">
        <dl className="space-y-1.5 text-sm">
          <div className="flex justify-between">
            <dt className="text-slate-500">App</dt>
            <dd className="font-semibold text-slate-800 dark:text-slate-200">
              {APP_NAME}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">Version</dt>
            <dd className="font-mono text-slate-800 dark:text-slate-200">
              {BUILD_INFO.version} ({BUILD_INFO.buildHash})
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">Support</dt>
            <dd>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="font-semibold text-teal-700 underline dark:text-teal-400"
              >
                {SUPPORT_EMAIL}
              </a>
            </dd>
          </div>
        </dl>
        <p className="mt-3 text-xs text-slate-400">
          Standards study guides are independent and not affiliated with
          ASHRAE, SMACNA, ACCA, AHRI or ICC.
        </p>
      </Section>
    </div>
  );
}
