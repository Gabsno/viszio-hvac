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
    id: '2026-06-08-academy-export',
    date: 'June 2026',
    title: 'Viszio HVAC is becoming Viszio Academy — export your progress',
    items: [
      'Viszio HVAC is moving into a new MEPF mobile app called Viszio Academy that covers Mechanical, Electrical, Plumbing and Fire in one place. It will be on the Play Store and the App Store.',
      'Head to Profile → "Move to Viszio Academy" and tap Download my progress. You\'ll get a small JSON file with your XP, streaks, bookmarks, notes, completed lessons and trophies. Keep it somewhere safe.',
      'When Viszio Academy launches, you\'ll tap "Import from Viszio HVAC" on first sign-in, pick that file, and everything is restored.',
      'The current Viszio HVAC web app stays live until the new app is in the stores. No action required today — just don\'t lose the export file when the time comes.',
    ],
  },
];

export function latestWhatsNew(): WhatsNewEntry | undefined {
  return WHATS_NEW[0];
}
