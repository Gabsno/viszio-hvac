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
    id: '2026-05-28-slide-lessons',
    date: 'May 2026',
    title: 'Slide-paced lessons + Continue learning',
    items: [
      'Course lessons are now slide-by-slide. Each article splits into bite-sized slides — one concept per screen, progress dots at the top, big Next button at the bottom. No more scrolling through a wall of text before the quiz.',
      "Course page now features a Continue Learning card at the top — one tap takes you straight to the next lesson you should do, so you never lose your place.",
      'Listen, Pause, Resume, Restart, Stop on every slide — and switching slides automatically stops the previous narration.',
      'Tutor stays one tap away on every slide too.',
      'All the earlier listening upgrades still apply: six voice presets in Settings, speed/pitch sliders, English-only voice picker, and the keep-alive that prevents the 15-second auto-stop bug.',
    ],
  },
];

export function latestWhatsNew(): WhatsNewEntry | undefined {
  return WHATS_NEW[0];
}
