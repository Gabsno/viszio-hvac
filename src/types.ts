// Shared domain types for Viszio HVAC.

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type Tier = 'free' | 'pro' | 'enterprise';
export type Region = 'global' | 'africa' | 'ghana';
export type AppMode = 'library' | 'course';

export interface ArticleFrontmatter {
  id: string;
  title: string;
  pillar: string;
  topic: string;
  order: number;
  difficulty: Difficulty;
  tier: Tier;
  tags: string[];
  standards_referenced: string[];
  region: Region;
  ghana_callout: boolean;
  estimated_minutes: number;
  related: string[];
  last_updated: string;
}

export interface Article extends ArticleFrontmatter {
  /** Raw markdown body (frontmatter stripped). */
  body: string;
  /** Plain-text excerpt for search snippets. */
  excerpt: string;
}

export interface TocEntry {
  id: string;
  text: string;
  level: number;
}

export interface PillarMeta {
  slug: string;
  title: string;
  description: string;
  /** lucide-react icon name. */
  icon: string;
}

export interface TopicNode {
  slug: string;
  title: string;
  articles: Article[];
}

export interface PillarNode {
  meta: PillarMeta;
  topics: TopicNode[];
  articleCount: number;
}

export interface SearchHit {
  article: Article;
  snippet: string;
}

// ---- Course mode ----

export type QuizKind = 'multiple-choice' | 'true-false' | 'short-answer';

export interface QuizQuestion {
  id: string;
  kind: QuizKind;
  prompt: string;
  /** Choices for multiple-choice / true-false. */
  choices?: string[];
  /** Index into choices, or accepted answer string for short-answer. */
  answer: number | string;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  /** Article IDs this lesson teaches from. */
  articleIds: string[];
  /** XP awarded for completing the lesson. */
  xp: number;
  quiz: QuizQuestion[];
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  lessons: Lesson[];
  /** True for the final capstone module. */
  capstone?: boolean;
}

export interface Trophy {
  id: string;
  title: string;
  description: string;
  icon: string;
}
