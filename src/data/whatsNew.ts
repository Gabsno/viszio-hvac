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
    id: '2026-05-28-auth-scaffold',
    date: 'May 2026',
    title: 'Email accounts (coming soon)',
    items: [
      'Scaffolded full email login + signup with Supabase. The screens, auth state, and migration logic are all in place — just waiting for the backend project to be wired up (see SUPABASE_SETUP.md in the repo).',
      'When email auth is enabled, existing testers log in for the first time and their localStorage progress (XP, bookmarks, notes, streaks, lessons) is automatically migrated to their new account. Nothing is lost.',
      'Until the backend is connected, the access code gate (delta-tango-7) still works the same way it always has.',
      'New illustrations, snake-path lesson tree, bottom nav and dashboard are all unchanged.',
    ],
  },
];

export function latestWhatsNew(): WhatsNewEntry | undefined {
  return WHATS_NEW[0];
}
