// What's New entries. The most recent entry (top of the list) is shown to
// every user who hasn't dismissed it yet. Dismissals are tracked by the
// entry's `id` in localStorage — bump the id when you ship a new update.

export interface WhatsNewEntry {
  id: string;
  date: string;
  title: string;
  items: string[];
}

export const WHATS_NEW: WhatsNewEntry[] = [
  {
    id: '2026-05-28-mobile-shell',
    date: 'May 2026',
    title: 'Mobile-app feel — bottom nav, Profile, page transitions',
    items: [
      'Persistent bottom navigation on mobile — one tap between Home, Course, Library, Tools and Profile. The app finally feels like a real native app instead of a website.',
      'New Profile page (the rightmost tab) brings together your streak, XP, trophies, certificate, bookmarks, name and the reset button. The Course page is now decluttered — it focuses on the snake-path lesson tree.',
      'Subtle fade transition between pages so route changes feel intentional, not jarring.',
      'Haptic feedback on correct and wrong answers in the practice phase, on supported phones.',
      'The "new version" banner is now a prominent top bar (instead of an easy-to-miss corner toast) and clears the service-worker cache when you tap Refresh, so the new build actually loads.',
      'Reduce-motion preference fully respected — if you have it on at the OS level, animations are skipped.',
    ],
  },
];

export function latestWhatsNew(): WhatsNewEntry | undefined {
  return WHATS_NEW[0];
}
