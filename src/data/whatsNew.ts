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
    id: '2026-05-28-dashboard',
    date: 'May 2026',
    title: 'New Home dashboard + daily lesson + review missed',
    items: [
      'Home is now a real dashboard: greeting and streak chip at top, Continue Learning card to resume your course, a Today\'s Pick lesson that rotates daily, recent articles/lessons/tools you opened, quick tools and explore-by-pillar.',
      'Today\'s Pick is deterministic — same lesson all day, fresh one tomorrow. Designed to drive a quick daily habit.',
      'New "Pick up where you left off" section shows the last articles, lessons and calculators you opened — one tap to resume any of them.',
      'Quiz: when you miss questions, you now get a Review screen with each missed question, the correct answer and the explanation. No more hunting through the slides to find what you got wrong.',
      'Bottom navigation, page transitions, haptics, prominent update banner and Profile page (all from the last update) still in place.',
    ],
  },
];

export function latestWhatsNew(): WhatsNewEntry | undefined {
  return WHATS_NEW[0];
}
