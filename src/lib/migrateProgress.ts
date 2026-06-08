// One-time migration of localStorage progress into the user's Supabase
// account. Runs on the user's first authenticated load. Idempotent — once
// the local marker is set the migration never runs again, even if the
// remote row gets cleared.

import { getSupabase, type ProgressBlob } from './supabase';
import { useProgressStore } from '../store/useProgressStore';

const MIGRATED_KEY = 'viszio-hvac-migrated-to-cloud';
const PROGRESS_KEY = 'viszio-hvac-progress';

/**
 * Run once per user on first login. If the user already has remote progress
 * we trust the remote copy and copy it into the local zustand store. If the
 * remote is empty but the device has local progress (existing tester), we
 * push the local copy up so nothing is lost.
 *
 * Returns the merged blob that the caller can use to hydrate the store.
 */
export async function ensureProgressMigrated(userId: string): Promise<void> {
  const sb = getSupabase();
  if (!sb) return;

  // 1) Read what's on the server for this user.
  const { data: remoteRow, error } = await sb
    .from('user_progress')
    .select('data')
    .eq('user_id', userId)
    .maybeSingle();

  if (error && error.code !== 'PGRST116') {
    // Unexpected error — bail out, don't risk overwriting local data.
    console.warn('[migrate] failed to read remote progress', error);
    return;
  }

  const remote = (remoteRow?.data ?? null) as ProgressBlob | null;
  const localRaw = readLocalProgress();

  // 2) Decide what to do.
  if (remote && Object.keys(remote).length > 0) {
    // Server has data — that's the source of truth. Hydrate the local store.
    hydrateStoreFromBlob(remote);
    localStorage.setItem(MIGRATED_KEY, '1');
    return;
  }

  // Server is empty.
  if (!localRaw || Object.keys(localRaw).length === 0) {
    // No local data either — first-time user with a fresh account.
    localStorage.setItem(MIGRATED_KEY, '1');
    return;
  }

  // Existing tester signing up for the first time — push their local
  // progress up to the server so it survives going forward.
  const blob: ProgressBlob = pickProgressFields(localRaw);
  const { error: upsertErr } = await sb
    .from('user_progress')
    .upsert({ user_id: userId, data: blob, updated_at: new Date().toISOString() });

  if (upsertErr) {
    console.warn('[migrate] failed to upsert remote progress', upsertErr);
    return;
  }
  localStorage.setItem(MIGRATED_KEY, '1');
}

export function hasMigrated(): boolean {
  return localStorage.getItem(MIGRATED_KEY) === '1';
}

export function resetMigrationFlag(): void {
  localStorage.removeItem(MIGRATED_KEY);
}

// ---- internals -------------------------------------------------------------

function readLocalProgress(): Record<string, unknown> | null {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Zustand persist wraps the state inside { state, version } — unwrap it.
    return parsed?.state ?? parsed ?? null;
  } catch {
    return null;
  }
}

function pickProgressFields(local: Record<string, unknown>): ProgressBlob {
  // Keep this in lock-step with ProgressBlob and the progress store fields.
  const keys: (keyof ProgressBlob)[] = [
    'bookmarks',
    'readArticles',
    'notes',
    'xp',
    'currentStreak',
    'longestStreak',
    'lastActiveDate',
    'completedLessons',
    'quizScores',
    'trophies',
    'flashcardsKnown',
    'recentArticles',
    'recentLessons',
    'recentTools',
  ];
  const out: ProgressBlob = {};
  for (const k of keys) {
    const v = local[k as string];
    if (v !== undefined) (out as Record<string, unknown>)[k] = v;
  }
  return out;
}

function hydrateStoreFromBlob(blob: ProgressBlob): void {
  const set = useProgressStore.setState;
  set({
    bookmarks: blob.bookmarks ?? [],
    readArticles: blob.readArticles ?? [],
    notes: blob.notes ?? {},
    xp: blob.xp ?? 0,
    currentStreak: blob.currentStreak ?? 0,
    longestStreak: blob.longestStreak ?? 0,
    lastActiveDate: blob.lastActiveDate ?? null,
    completedLessons: blob.completedLessons ?? [],
    quizScores: blob.quizScores ?? {},
    trophies: blob.trophies ?? [],
    flashcardsKnown: blob.flashcardsKnown ?? [],
    recentArticles: blob.recentArticles ?? [],
    recentLessons: blob.recentLessons ?? [],
    recentTools: blob.recentTools ?? [],
  });
}
