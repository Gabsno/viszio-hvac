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
    id: '2026-06-08-academy-export-7day',
    date: 'June 2026',
    title: 'Viszio HVAC retires on 15 June — export your progress now',
    items: [
      'Viszio HVAC is moving into a new MEPF mobile app called Viszio Academy — Mechanical, Electrical, Plumbing and Fire in one place. It will be on the Play Store and the App Store.',
      'The current web app retires on 15 June 2026 at 23:59 UTC. After that the URL shows a retirement screen — but you can still download your data one last time from it.',
      'To carry your progress over: go to Profile → "Move to Viszio Academy" and tap Download my progress. You\'ll get a small JSON file with your XP, streaks, bookmarks, notes, completed lessons and trophies. Keep it safe.',
      'When Viszio Academy launches, you\'ll tap "Import from Viszio HVAC" on first sign-in, pick that file, and everything is restored.',
      'A countdown banner at the top of every screen will get more urgent as the date approaches — please don\'t leave the export until the last hour.',
    ],
  },
];

export function latestWhatsNew(): WhatsNewEntry | undefined {
  return WHATS_NEW[0];
}
