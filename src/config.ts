// Global configuration flags for Viszio HVAC.

// Master switch for the SaaS layer. While false, all tier gating is bypassed
// and every visitor is treated as an authenticated Pro user (free beta).
// Flipping this to true activates auth + paywall behaviour once a backend
// is wired up — no rewrite required.
export const SAAS_MODE_ENABLED = false;

// --- Access gate ----------------------------------------------------------
// A shared access-code lock. While ACCESS_GATE_ENABLED is true, visitors must
// enter the code once before they can use the app — useful for a private
// beta or sharing with a chosen group.
//
// This is a deterrent, not hard security: a static site ships all of its
// content to the browser, so a determined person could still extract it. For
// true per-user control, put the site behind Cloudflare Access or build the
// SaaS auth backend.
//
// To turn the gate OFF, set ACCESS_GATE_ENABLED to false.
// To change the code, run:  node scripts/make-access-code.mjs "new code"
// then paste the printed hash into ACCESS_CODE_HASH below.
export const ACCESS_GATE_ENABLED = true;
export const ACCESS_CODE_HASH =
  '00c2025e12343c7719622af6555d843571afc0d0e083ac3e14dd86e45ad10b4a';

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

// --- Feature flags --------------------------------------------------------
// Temporarily hide the Tools section across the app (bottom nav, course
// tabs, Home dashboard, recent activity). Set back to true to restore.
// The /tools and /tools/:id routes are left in place so direct links keep
// working — only the visual entry points are removed.
export const TOOLS_ENABLED = false;

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
