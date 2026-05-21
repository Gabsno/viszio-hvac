import { CLAUDE_MODEL, GEMINI_MODEL } from '../config';
import type { Article } from '../types';
import { ARTICLES } from './content';
import { toPlainText } from './content';

export type AIProvider = 'gemini' | 'claude';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

function buildSystemPrompt(article: Article | null): string {
  const related = ARTICLES.filter((a) => a.id !== article?.id)
    .slice(0, 40)
    .map((a) => `${a.id}: ${a.title}`)
    .join('; ');

  const context = article
    ? `The user is reading the following article titled "${article.title}":\n\n${toPlainText(
        article.body,
      ).slice(0, 6000)}`
    : 'The user is browsing the Viszio HVAC library and has not opened a specific article.';

  return [
    'You are an expert HVAC engineering tutor inside the Viszio HVAC study app.',
    context,
    'Answer questions clearly and reference the article where relevant.',
    'If they ask about something not in the article, answer concisely and, when one fits,',
    `link to a related article by its ID from this list: ${related}.`,
    'Prefer SI units. When climate matters, note that the app serves engineers in',
    "Ghana's hot-humid climate. Keep answers practical and engineer-to-engineer.",
  ].join(' ');
}

async function askGemini(
  apiKey: string,
  system: string,
  history: ChatMessage[],
): Promise<string> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(
      apiKey,
    )}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: history.map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        })),
        generationConfig: { temperature: 0.4, maxOutputTokens: 1024 },
      }),
    },
  );
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Gemini error ${res.status}: ${detail.slice(0, 300)}`);
  }
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts
    ?.map((p: { text?: string }) => p.text ?? '')
    .join('');
  return text || 'No response received from Gemini.';
}

async function askClaude(
  apiKey: string,
  system: string,
  history: ChatMessage[],
): Promise<string> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 1024,
      system,
      messages: history.map((m) => ({ role: m.role, content: m.content })),
    }),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Claude error ${res.status}: ${detail.slice(0, 300)}`);
  }
  const data = await res.json();
  const text = data?.content
    ?.map((b: { text?: string }) => b.text ?? '')
    .join('');
  return text || 'No response received from Claude.';
}

/** Send the conversation to the chosen provider and return the reply text. */
export async function askTutor(
  provider: AIProvider,
  apiKey: string,
  history: ChatMessage[],
  article: Article | null,
): Promise<string> {
  if (!apiKey.trim()) {
    throw new Error(
      'No API key set. Add one in Settings to use the AI tutor.',
    );
  }
  const system = buildSystemPrompt(article);
  return provider === 'gemini'
    ? askGemini(apiKey, system, history)
    : askClaude(apiKey, system, history);
}
