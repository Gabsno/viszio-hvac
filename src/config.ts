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
  '52046c72e54f0daa329426950f6d54aa23ba2069c8092e83105b1ea6309ca860';

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
