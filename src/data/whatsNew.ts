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
    id: '2026-05-28-interactive-challenges',
    date: 'May 2026',
    title: 'Interactive practice challenges',
    items: [
      'Lessons now have a Practice phase between the slides and the quiz. Five new challenge types: type a number with units (e.g. convert 30 tons to kW), fill in a missing word, reorder a sequence of operations, match terms to definitions, and select all that apply.',
      'Live in three demo lessons to start: "What psychrometrics is" (Module 1), "Airflow & units" (Module 1), "The load calculation process" (Module 2), and "Volume & balancing dampers" (Module 9). More will be added across all modules.',
      'Each challenge gives instant feedback with an explanation. Tap Skip practice if you want to jump straight to the quiz.',
      'Plus everything from before: slide-by-slide lessons, Continue Learning card, full Listen player controls, six voice presets, speed/pitch sliders.',
    ],
  },
];

export function latestWhatsNew(): WhatsNewEntry | undefined {
  return WHATS_NEW[0];
}
