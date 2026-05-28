import { COURSE, lessonOrder } from './courseData';
import type { Lesson } from '../types';

/** Local date as YYYY-MM-DD — mirrors the helper in the progress store. */
function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`;
}

/** Stable hash of a string — used to deterministically pick a daily lesson. */
function hash(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0;
  return h;
}

export interface DailyLesson {
  lesson: Lesson;
  moduleTitle: string;
  date: string;
}

/**
 * Pick a deterministic "Lesson of the Day" — same lesson all day, resets
 * tomorrow. Prefers unlocked, uncompleted lessons; falls back to any
 * lesson if everything is done. Returns null only if the course is
 * completely empty (shouldn't happen).
 */
export function todaysLesson(
  completedLessons: string[],
): DailyLesson | null {
  const date = today();
  const order = lessonOrder();
  if (order.length === 0) return null;

  function isUnlocked(lessonId: string): boolean {
    const idx = order.findIndex((o) => o.lessonId === lessonId);
    if (idx <= 0) return true;
    return completedLessons.includes(order[idx - 1].lessonId);
  }

  // Pool 1: unlocked + uncompleted (the ideal pool).
  let pool = order.filter(
    (o) => !completedLessons.includes(o.lessonId) && isUnlocked(o.lessonId),
  );
  // Pool 2: any uncompleted lesson (in case nothing is unlocked yet — shouldn't
  // really happen because lesson 1 is always unlocked, but defensive).
  if (pool.length === 0)
    pool = order.filter((o) => !completedLessons.includes(o.lessonId));
  // Pool 3: course done — just pick from everything for revision.
  if (pool.length === 0) pool = order;

  const idx = hash(date) % pool.length;
  const entry = pool[idx];
  const module = COURSE.find((m) =>
    m.lessons.some((l) => l.id === entry.lessonId),
  );
  const lesson = module?.lessons.find((l) => l.id === entry.lessonId);
  if (!module || !lesson) return null;
  return { lesson, moduleTitle: module.title, date };
}
