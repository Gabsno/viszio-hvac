// Break an article's markdown body into bite-sized slides for the
// slide-by-slide lesson player. The intro slide carries the article title
// and any introduction before the first ## heading; every subsequent ##
// section becomes its own slide. This mirrors how Duolingo / Mimo / Learn
// JavaScript paginate lessons: one concept per screen, advance on tap.

import type { Article } from '../types';

export interface Slide {
  // Unique key for the slide within a lesson (used by Listen state).
  key: string;
  articleId: string;
  articleTitle: string;
  // True for the title/intro slide of an article.
  isIntro: boolean;
  // Heading shown at the top of the slide. For intro slides this is the
  // article title. For section slides it's the ## heading text.
  title: string;
  // Markdown body for this slide.
  body: string;
}

/** Split a single article into one or more slides. */
export function buildSlidesForArticle(article: Article): Slide[] {
  const slides: Slide[] = [];
  const lines = article.body.split(/\r?\n/);

  // 1) Intro slide — everything from the start to the first `## heading`.
  let cursor = 0;
  const introLines: string[] = [];
  let inFence = false;
  while (cursor < lines.length) {
    const line = lines[cursor];
    if (line.trimStart().startsWith('```')) inFence = !inFence;
    if (!inFence && /^##\s+/.test(line)) break;
    introLines.push(line);
    cursor++;
  }
  slides.push({
    key: `${article.id}#intro`,
    articleId: article.id,
    articleTitle: article.title,
    isIntro: true,
    title: article.title,
    body: introLines.join('\n').trim(),
  });

  // 2) One slide per `## heading` section.
  let currentTitle = '';
  let currentBody: string[] = [];
  let sectionIdx = 0;
  inFence = false;

  const flush = () => {
    if (!currentTitle) return;
    slides.push({
      key: `${article.id}#${sectionIdx}`,
      articleId: article.id,
      articleTitle: article.title,
      isIntro: false,
      title: currentTitle,
      body: currentBody.join('\n').trim(),
    });
    sectionIdx++;
  };

  while (cursor < lines.length) {
    const line = lines[cursor];
    if (line.trimStart().startsWith('```')) inFence = !inFence;
    if (!inFence && /^##\s+/.test(line)) {
      flush();
      currentTitle = line.replace(/^##\s+/, '').trim();
      currentBody = [];
    } else {
      currentBody.push(line);
    }
    cursor++;
  }
  flush();

  // Drop empty intros only if there is at least one section slide to
  // anchor the article — otherwise the intro IS the article.
  return slides.filter(
    (s, i) => !(s.isIntro && !s.body && slides.length > 1 && i === 0),
  );
}

/** Build the full slide deck for a lesson (concatenating all its articles). */
export function buildSlidesForLesson(articles: Article[]): Slide[] {
  return articles.flatMap(buildSlidesForArticle);
}
