import FlexSearch from 'flexsearch';
import { ARTICLES, getArticle, toPlainText } from './content';
import type { Article, SearchHit } from '../types';

// FlexSearch's TypeScript types are incomplete for the Document index, so we
// interact with it through a small typed wrapper.
interface FlexDoc {
  add(id: string, doc: Record<string, unknown>): void;
  search(query: string, opts?: Record<string, unknown>): unknown[];
}

const index = new (FlexSearch as unknown as {
  Document: new (opts: unknown) => FlexDoc;
}).Document({
  tokenize: 'forward',
  document: {
    id: 'id',
    index: ['title', 'body', 'tags', 'standards'],
  },
});

// Pre-compute plain-text bodies once for snippet generation.
const PLAIN = new Map<string, string>();

for (const a of ARTICLES) {
  const plain = toPlainText(a.body);
  PLAIN.set(a.id, plain);
  index.add(a.id, {
    id: a.id,
    title: a.title,
    body: plain,
    tags: a.tags.join(' '),
    standards: a.standards_referenced.join(' '),
  });
}

function buildSnippet(article: Article, query: string): string {
  const plain = PLAIN.get(article.id) ?? '';
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const lower = plain.toLowerCase();
  let pos = -1;
  for (const term of terms) {
    const found = lower.indexOf(term);
    if (found !== -1 && (pos === -1 || found < pos)) pos = found;
  }
  if (pos === -1) return article.excerpt;
  const start = Math.max(0, pos - 60);
  const end = Math.min(plain.length, pos + 140);
  return (start > 0 ? '…' : '') + plain.slice(start, end).trim() + '…';
}

/** Full-text search across the library. Returns ranked hits with snippets. */
export function searchArticles(query: string, limit = 8): SearchHit[] {
  const q = query.trim();
  if (q.length < 2) return [];

  const results = index.search(q, { limit, enrich: false });
  const ids = new Set<string>();
  for (const group of results) {
    const list = (group as { result?: unknown[] })?.result ?? group;
    if (Array.isArray(list)) {
      for (const id of list) ids.add(String(id));
    }
  }

  const hits: SearchHit[] = [];
  for (const id of ids) {
    const article = getArticle(id);
    if (article) hits.push({ article, snippet: buildSnippet(article, q) });
    if (hits.length >= limit) break;
  }
  return hits;
}
