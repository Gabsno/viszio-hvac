import { getArticle } from '../lib/content';
import type { Lesson } from '../types';

/**
 * Estimated lesson duration in minutes. Sums the estimated read time of
 * each article in the lesson, plus 1 minute per challenge, plus 2 minutes
 * for the quiz. Rounded up so the user always feels they finished early.
 */
export function lessonDurationMinutes(lesson: Lesson): number {
  let total = 0;
  for (const articleId of lesson.articleIds) {
    const a = getArticle(articleId);
    total += a?.estimated_minutes ?? 6;
  }
  total += (lesson.challenges?.length ?? 0) * 1;
  total += 2; // quiz
  return Math.max(3, Math.ceil(total));
}
