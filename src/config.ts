// Global configuration flags for Viszio HVAC.

// Master switch for the SaaS layer. While false, all tier gating is bypassed
// and every visitor is treated as an authenticated Pro user (free beta).
// Flipping this to true activates auth + paywall behaviour once a backend
// is wired up — no rewrite required.
export const SAAS_MODE_ENABLED = false;

// --- Access gate ----------------------------------------------------------
// Legacy shared access-code lock. Kept for safety while Supabase auth is
// being rolled out; flip ACCESS_GATE_ENABLED to false once email auth is
// live and proven.
//
// To turn the gate OFF, set ACCESS_GATE_ENABLED to false.
// To change the code, run:  node scripts/make-access-code.mjs "new code"
// then paste the printed hash into ACCESS_CODE_HASH below.
// Stays true until Supabase auth is configured below. Once SUPABASE_URL and
// SUPABASE_ANON_KEY are populated and the SQL migration has run, you can
// safely set this to false — email login replaces the shared code.
export const ACCESS_GATE_ENABLED = true;
export const ACCESS_CODE_HASH =
  '00c2025e12343c7719622af6555d843571afc0d0e083ac3e14dd86e45ad10b4a';

// --- Supabase auth -------------------------------------------------------
// Email + password authentication via Supabase. While the URL or anon key
// below are empty strings, AUTH_ENABLED is treated as false and the app
// falls back to the legacy access-code path.
//
// To enable real accounts:
//   1. Create a free project at https://supabase.com (no credit card).
//   2. From Project Settings → API, copy the Project URL and the anon key.
//   3. Paste them into the two strings below.
//   4. Run the SQL in supabase/migrations/001_initial.sql in the Supabase
//      SQL editor to create the profiles + user_progress tables and the
//      row-level security policies.
//   5. Commit and deploy. The app will switch to email login automatically.
//
// On first login of an existing tester, their localStorage progress is
// migrated to their new account so XP, bookmarks, notes and streaks are
// preserved.
export const SUPABASE_URL = '';
export const SUPABASE_ANON_KEY = '';
export const AUTH_ENABLED = SUPABASE_URL.length > 0 && SUPABASE_ANON_KEY.length > 0;

// --- Usage analytics ------------------------------------------------------
// Anonymous, cookieless, aggregate page-view analytics — it shows which
// articles and tools are read, visitor counts, devices and countries. It
// records NO personal data, NO accounts, and NEVER the users' private notes.
//
// Disabled until configured. To switch it on:
//   1. Create a free account with the chosen provider:
//      - GoatCounter — https://www.goatcounter.com (free, cookieless)
//      - Plausible   — https://plausible.io (paid, privacy-first)
//   2. Set `enabled: true` and `site` below, then commit and push.
// For GoatCounter, `site` is your code (e.g. 'viszio' for viszio.goatcounter.com).
// For Plausible, `site` is the domain (e.g. 'gabsno.github.io').
export const ANALYTICS: {
  enabled: boolean;
  provider: 'goatcounter' | 'plausible';
  site: string;
} = {
  enabled: true,
  provider: 'goatcounter',
  site: 'viszio',
};

export const APP_NAME = 'Viszio HVAC';
export const APP_TAGLINE = 'HVAC engineering, made learnable.';
export const SUPPORT_EMAIL = 'visziogh@gmail.com';

// GitHub Pages base — also used to fetch version.json at runtime.
export const BASE_URL = import.meta.env.BASE_URL;

// How often the app polls version.json for a new deploy (ms).
export const VERSION_CHECK_INTERVAL = 60_000;

// Embedded build version — replaced from version.json at build time via the
// stamp-version script. We import the shipped value below for comparison.
export const APP_VERSION = '1.0.0';

// AI tutor model defaults.
export const GEMINI_MODEL = 'gemini-2.0-flash';
export const CLAUDE_MODEL = 'claude-haiku-4-5-20251001';
