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
    id: '2026-05-28-illustrations',
    date: 'May 2026',
    title: 'Custom AI-generated illustrations',
    items: [
      'New AI-generated hero illustration on Home — isometric mechanical room with a chiller, air handling unit and ductwork, on a faint blueprint grid. Brand-coherent teal and warm orange palette, much richer than the placeholder SVG.',
      'Empty-state graphic on the Bookmarks panel in Profile — a teal bookmark ribbon with floating engineering symbols (gauge, duct, droplet). The blank screen finally invites action.',
      'Course completion banner on the Certificate page now shows a gold engineering medal with confetti — a real celebration moment when you hit 100%.',
      'All illustrations generated via Gemini Nano Banana with the engineering aesthetic, then baked into the app — they ship offline with the PWA.',
      'Snake-path nodes, bottom-nav active pill, ambient gradient background and all the other polish from yesterday are still in place.',
    ],
  },
];

export function latestWhatsNew(): WhatsNewEntry | undefined {
  return WHATS_NEW[0];
}
