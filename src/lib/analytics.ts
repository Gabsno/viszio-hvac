import { ANALYTICS } from '../config';

// Anonymous, cookieless page-view analytics. The app is a hash-routed SPA, so
// page views are sent manually on each route change rather than only on load.
// No personal data, no cookies, no notes — only aggregate page paths.

let started = false;

interface GoatCounter {
  count?: (opts: { path: string; title?: string; event?: boolean }) => void;
}
type AnalyticsWindow = Window & {
  goatcounter?: GoatCounter;
  plausible?: (event: string, opts?: { u?: string }) => void;
};

/** Inject the analytics provider script once. Safe to call when disabled. */
export function initAnalytics(): void {
  if (started || !ANALYTICS.enabled || !ANALYTICS.site) return;
  started = true;
  const s = document.createElement('script');
  if (ANALYTICS.provider === 'plausible') {
    s.src = 'https://plausible.io/js/script.manual.js';
    s.defer = true;
    s.setAttribute('data-domain', ANALYTICS.site);
  } else {
    // GoatCounter — disable the automatic on-load count; we send our own.
    s.src = 'https://gc.zgo.at/count.js';
    s.async = true;
    s.setAttribute(
      'data-goatcounter',
      `https://${ANALYTICS.site}.goatcounter.com/count`,
    );
    s.setAttribute('data-goatcounter-settings', '{"no_onload":true}');
  }
  document.head.appendChild(s);
}

/** Record a page view for the given in-app route path. */
export function trackPage(path: string): void {
  if (!ANALYTICS.enabled || !ANALYTICS.site) return;
  const w = window as AnalyticsWindow;
  if (ANALYTICS.provider === 'plausible') {
    w.plausible?.('pageview', {
      u: `${location.origin}${location.pathname}#${path}`,
    });
  } else {
    w.goatcounter?.count?.({ path });
  }
}

/**
 * Record an anonymous action event (a search, a tool used, a lesson
 * completed, etc.) — distinct from a page view. No personal data.
 */
export function trackEvent(name: string): void {
  if (!ANALYTICS.enabled || !ANALYTICS.site) return;
  const w = window as AnalyticsWindow;
  if (ANALYTICS.provider === 'plausible') {
    w.plausible?.(name);
  } else {
    w.goatcounter?.count?.({ path: name, title: name, event: true });
  }
}
