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
    id: '2026-05-28-course-bundle',
    date: 'May 2026',
    title: 'Course tabs, snake-path lessons, share & duration',
    items: [
      'New tabs at the top of the Course page — Lessons, Tools, Glossary — so calculators and term lookups are one tap away while you are mid-course.',
      'Lesson tree is now a snake-style path: lessons zig-zag down the page with circular nodes, the next lesson pulses, done lessons get an emerald checkmark, locked lessons are greyed.',
      'Every lesson card now shows a duration (e.g. 8 min) computed from its articles plus practice and quiz time.',
      'Share button on every lesson — uses your phone’s native share sheet on mobile, falls back to copying the link on desktop.',
      'Practice challenges still live in modules 1, 2 and 9. More coming.',
    ],
  },
];

export function latestWhatsNew(): WhatsNewEntry | undefined {
  return WHATS_NEW[0];
}
