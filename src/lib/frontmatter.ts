// Minimal YAML frontmatter parser.
//
// The article frontmatter schema is fixed and simple (scalars + inline arrays),
// so a dependency-free parser keeps the browser bundle small and avoids the
// Buffer polyfill that gray-matter pulls in.

export interface ParsedDoc {
  data: Record<string, unknown>;
  body: string;
}

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

function coerceScalar(raw: string): unknown {
  const v = raw.trim();
  if (v === '') return '';
  if (v === 'true') return true;
  if (v === 'false') return false;
  // Inline array: [a, b, c]
  if (v.startsWith('[') && v.endsWith(']')) {
    const inner = v.slice(1, -1).trim();
    if (inner === '') return [];
    return inner
      .split(',')
      .map((item) => stripQuotes(item.trim()))
      .filter((item) => item !== '');
  }
  // Number — but not date-like strings (2026-05-21).
  if (/^-?\d+(\.\d+)?$/.test(v)) return Number(v);
  return stripQuotes(v);
}

function stripQuotes(s: string): string {
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    return s.slice(1, -1);
  }
  return s;
}

export function parseFrontmatter(raw: string): ParsedDoc {
  const match = raw.match(FRONTMATTER_RE);
  if (!match) {
    return { data: {}, body: raw.trim() };
  }

  const data: Record<string, unknown> = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (line.trim() === '' || line.trimStart().startsWith('#')) continue;
    const sep = line.indexOf(':');
    if (sep === -1) continue;
    const key = line.slice(0, sep).trim();
    const value = line.slice(sep + 1);
    data[key] = coerceScalar(value);
  }

  return { data, body: raw.slice(match[0].length).trim() };
}
