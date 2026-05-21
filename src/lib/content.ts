import { parseFrontmatter } from './frontmatter';
import { PILLARS, pillarTitle, topicTitle } from '../content/pillars';
import type {
  Article,
  ArticleFrontmatter,
  Difficulty,
  PillarNode,
  Region,
  Tier,
  TocEntry,
  TopicNode,
} from '../types';

// Eagerly load every Markdown article as raw text at build time.
const rawModules = import.meta.glob('../content/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[`*_~]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Convert a Markdown body to a plain-text excerpt for search snippets. */
export function toPlainText(markdown: string): string {
  return markdown
    .replace(/<[^>]+>/g, ' ') // strip inline HTML/SVG
    .replace(/```[\s\S]*?```/g, ' ') // fenced code
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links -> text
    .replace(/^[#>\-*+]\s*/gm, '')
    .replace(/[#>*_~|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Extract a heading outline (h2/h3) for the table of contents. */
export function extractToc(markdown: string): TocEntry[] {
  const entries: TocEntry[] = [];
  let inFence = false;
  for (const line of markdown.split(/\r?\n/)) {
    if (line.trimStart().startsWith('```')) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = line.match(/^(#{2,3})\s+(.+?)\s*#*\s*$/);
    if (m) {
      const text = m[2].replace(/[`*_]/g, '').trim();
      entries.push({ id: slugify(text), text, level: m[1].length });
    }
  }
  return entries;
}

function normalizeFrontmatter(
  data: Record<string, unknown>,
  fallbackId: string,
): ArticleFrontmatter {
  const asArray = (v: unknown): string[] =>
    Array.isArray(v) ? v.map(String) : [];
  return {
    id: String(data.id ?? fallbackId),
    title: String(data.title ?? 'Untitled'),
    pillar: String(data.pillar ?? 'core-engineering'),
    topic: String(data.topic ?? 'general'),
    order: typeof data.order === 'number' ? data.order : 999,
    difficulty: (data.difficulty as Difficulty) ?? 'beginner',
    tier: (data.tier as Tier) ?? 'free',
    tags: asArray(data.tags),
    standards_referenced: asArray(data.standards_referenced),
    region: (data.region as Region) ?? 'global',
    ghana_callout: data.ghana_callout === true,
    estimated_minutes:
      typeof data.estimated_minutes === 'number' ? data.estimated_minutes : 6,
    related: asArray(data.related),
    last_updated: String(data.last_updated ?? ''),
  };
}

function buildArticles(): Article[] {
  const articles: Article[] = [];
  for (const [path, raw] of Object.entries(rawModules)) {
    const { data, body } = parseFrontmatter(raw);
    const fallbackId = path.split('/').pop()?.replace(/\.md$/, '') ?? path;
    const fm = normalizeFrontmatter(data, fallbackId);
    const plain = toPlainText(body);
    articles.push({
      ...fm,
      body,
      excerpt: plain.slice(0, 240) + (plain.length > 240 ? '…' : ''),
    });
  }
  return articles.sort(
    (a, b) =>
      a.pillar.localeCompare(b.pillar) ||
      a.topic.localeCompare(b.topic) ||
      a.order - b.order,
  );
}

export const ARTICLES: Article[] = buildArticles();

const BY_ID = new Map(ARTICLES.map((a) => [a.id, a]));

export function getArticle(id: string): Article | undefined {
  return BY_ID.get(id);
}

export function getArticles(ids: string[]): Article[] {
  return ids.map((id) => BY_ID.get(id)).filter((a): a is Article => !!a);
}

/** Build the Pillar -> Topic -> Article tree for the sidebar. */
export function buildTree(articles: Article[] = ARTICLES): PillarNode[] {
  const tree: PillarNode[] = [];
  for (const pillar of PILLARS) {
    const inPillar = articles.filter((a) => a.pillar === pillar.slug);
    if (inPillar.length === 0) continue;

    const topicMap = new Map<string, Article[]>();
    for (const a of inPillar) {
      const list = topicMap.get(a.topic) ?? [];
      list.push(a);
      topicMap.set(a.topic, list);
    }

    const topics: TopicNode[] = [...topicMap.entries()]
      .map(([slug, list]) => ({
        slug,
        title: topicTitle(slug),
        articles: list.sort((a, b) => a.order - b.order),
      }))
      .sort((a, b) => a.title.localeCompare(b.title));

    tree.push({ meta: pillar, topics, articleCount: inPillar.length });
  }
  return tree;
}

export const TREE: PillarNode[] = buildTree();

export { pillarTitle, topicTitle };
