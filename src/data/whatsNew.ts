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
    id: '2026-05-28-visual-polish',
    date: 'May 2026',
    title: 'Visual polish — premium look, native-app feel',
    items: [
      'Custom hand-crafted SVG hero illustration on Home (isometric chiller, AHU and ductwork) — replaces the plain gradient with real product personality.',
      'Snake-path lesson nodes are now bigger, with soft gradient fills and depth shadows. The next-up node pulses against a richer teal halo. Done lessons get a brighter emerald gradient.',
      'Bottom navigation now uses a pill-style highlight for the active tab — same idiom as iOS and Duolingo. Cleaner, more obvious.',
      'New reusable EmptyState component — used on Bookmarks (Profile) and the Library no-results screen. Friendly icon, clear copy, and a CTA back to where you fill the list.',
      'Subtle teal-tinted ambient gradient on the page background (light and dark), Inter font features enabled, micro-press scale on interactive elements, and a refined card depth system.',
    ],
  },
];

export function latestWhatsNew(): WhatsNewEntry | undefined {
  return WHATS_NEW[0];
}
