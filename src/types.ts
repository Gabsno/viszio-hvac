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

// ---- Interactive challenges ----
// Challenges run between the content slides and the multiple-choice quiz.
// Each one is a single tappable / fillable interaction with an instant
// right/wrong response and a short explanation. Designed to feel like the
// active practice in Mimo / Learn JavaScript.

export type ChallengeType =
  | 'numeric'
  | 'fill-blank'
  | 'order'
  | 'match'
  | 'multi-select';

export interface BaseChallenge {
  id: string;
  type: ChallengeType;
  prompt: string;
  explanation?: string;
}

export interface NumericChallenge extends BaseChallenge {
  type: 'numeric';
  /** Expected numeric answer. */
  answer: number;
  /** Optional unit label shown beside the input (kW, L/s, etc.). */
  unit?: string;
  /** Fractional tolerance — 0.05 means ±5%. Defaults to 0.05. */
  tolerance?: number;
  /** Optional formula or hint shown above the input. */
  hint?: string;
}

export interface FillBlankChallenge extends BaseChallenge {
  type: 'fill-blank';
  /** Expected answer (case-insensitive). */
  answer: string;
  /** Other accepted answers (synonyms). */
  acceptableAnswers?: string[];
  /** Optional placeholder shown inside the input. */
  placeholder?: string;
}

export interface OrderChallenge extends BaseChallenge {
  type: 'order';
  /** Items in the correct final order. Shown shuffled to the user. */
  items: string[];
}

export interface MatchChallenge extends BaseChallenge {
  type: 'match';
  /** Pairs the user must connect. Both columns shown shuffled. */
  pairs: { left: string; right: string }[];
}

export interface MultiSelectChallenge extends BaseChallenge {
  type: 'multi-select';
  options: { text: string; correct: boolean }[];
}

export type Challenge =
  | NumericChallenge
  | FillBlankChallenge
  | OrderChallenge
  | MatchChallenge
  | MultiSelectChallenge;

export interface Lesson {
  id: string;
  title: string;
  /** Article IDs this lesson teaches from. */
  articleIds: string[];
  /** XP awarded for completing the lesson. */
  xp: number;
  quiz: QuizQuestion[];
  /** Optional interactive challenges shown before the quiz. */
  challenges?: Challenge[];
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
