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
    id: '2026-05-23-listen-player',
    date: 'May 2026',
    title: 'Better listening, more voice control',
    items: [
      'Listen now has full player controls — Pause, Resume, Restart, and Stop instead of a single toggle.',
      'Six one-tap voice presets in Settings → Accessibility: Narrator, Lecturer, Coach, Storyteller, Calm Guide and Bright Tutor.',
      'Reading speed (0.6×–1.6×) and pitch sliders for fine-tuning beyond the presets.',
      'Listen button now appears on every article inside course lessons — not just the library.',
      'Voice picker filters to English voices only, and tags each one [local] / [online] so you know which actually sound distinct.',
      'Test button reports which voice the browser really used — silent fallbacks are no longer invisible.',
    ],
  },
];

export function latestWhatsNew(): WhatsNewEntry | undefined {
  return WHATS_NEW[0];
}
