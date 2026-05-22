import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/** Local date as YYYY-MM-DD. */
function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`;
}

function daysBetween(a: string, b: string): number {
  const ms = new Date(b).getTime() - new Date(a).getTime();
  return Math.round(ms / 86_400_000);
}

interface ProgressState {
  bookmarks: string[];
  readArticles: string[];
  notes: Record<string, string>;

  // Course / gamification
  xp: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  completedLessons: string[];
  quizScores: Record<string, number>; // lessonId -> percent
  trophies: string[];
  flashcardsKnown: string[]; // glossary terms marked "got it"

  // actions
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  markRead: (id: string) => void;
  unmarkRead: (id: string) => void;
  isRead: (id: string) => boolean;
  setNote: (id: string, text: string) => void;

  recordActivity: () => void;
  addXp: (amount: number) => void;
  completeLesson: (lessonId: string, scorePercent: number, xp: number) => void;
  isLessonComplete: (lessonId: string) => boolean;
  awardTrophy: (id: string) => void;
  setCardKnown: (term: string, known: boolean) => void;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      readArticles: [],
      notes: {},
      xp: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: null,
      completedLessons: [],
      quizScores: {},
      trophies: [],
      flashcardsKnown: [],

      toggleBookmark: (id) =>
        set((s) => ({
          bookmarks: s.bookmarks.includes(id)
            ? s.bookmarks.filter((b) => b !== id)
            : [...s.bookmarks, id],
        })),
      isBookmarked: (id) => get().bookmarks.includes(id),

      markRead: (id) =>
        set((s) =>
          s.readArticles.includes(id)
            ? s
            : { readArticles: [...s.readArticles, id] },
        ),
      unmarkRead: (id) =>
        set((s) => ({
          readArticles: s.readArticles.filter((r) => r !== id),
        })),
      isRead: (id) => get().readArticles.includes(id),

      setNote: (id, text) =>
        set((s) => {
          const notes = { ...s.notes };
          if (text.trim() === '') delete notes[id];
          else notes[id] = text;
          return { notes };
        }),

      recordActivity: () => {
        const t = today();
        const { lastActiveDate, currentStreak, longestStreak } = get();
        if (lastActiveDate === t) return;
        let streak = 1;
        if (lastActiveDate && daysBetween(lastActiveDate, t) === 1) {
          streak = currentStreak + 1;
        }
        set({
          lastActiveDate: t,
          currentStreak: streak,
          longestStreak: Math.max(longestStreak, streak),
        });
      },

      addXp: (amount) => set((s) => ({ xp: s.xp + amount })),

      completeLesson: (lessonId, scorePercent, xp) => {
        get().recordActivity();
        set((s) => {
          const first = !s.completedLessons.includes(lessonId);
          return {
            completedLessons: first
              ? [...s.completedLessons, lessonId]
              : s.completedLessons,
            quizScores: {
              ...s.quizScores,
              [lessonId]: Math.max(s.quizScores[lessonId] ?? 0, scorePercent),
            },
            xp: first ? s.xp + xp : s.xp,
          };
        });
      },
      isLessonComplete: (lessonId) =>
        get().completedLessons.includes(lessonId),

      awardTrophy: (id) =>
        set((s) =>
          s.trophies.includes(id)
            ? s
            : { trophies: [...s.trophies, id] },
        ),

      setCardKnown: (term, known) =>
        set((s) => ({
          flashcardsKnown: known
            ? s.flashcardsKnown.includes(term)
              ? s.flashcardsKnown
              : [...s.flashcardsKnown, term]
            : s.flashcardsKnown.filter((t) => t !== term),
        })),

      resetProgress: () =>
        set({
          xp: 0,
          currentStreak: 0,
          longestStreak: 0,
          lastActiveDate: null,
          completedLessons: [],
          quizScores: {},
          trophies: [],
          readArticles: [],
        }),
    }),
    {
      name: 'viszio-hvac-progress',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
