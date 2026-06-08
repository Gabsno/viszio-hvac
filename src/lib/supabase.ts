import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { AUTH_ENABLED, SUPABASE_URL, SUPABASE_ANON_KEY } from '../config';

/**
 * Singleton Supabase client. When AUTH_ENABLED is false (no URL or anon key
 * configured) this returns null and the app falls back to the legacy
 * access-code gate. Components that use it should always null-check.
 */
let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!AUTH_ENABLED) return null;
  if (_client) return _client;
  _client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      storageKey: 'viszio-hvac-supabase-auth',
    },
  });
  return _client;
}

/** Row shape stored in user_progress.data — single JSONB blob per user. */
export interface ProgressBlob {
  bookmarks?: string[];
  readArticles?: string[];
  notes?: Record<string, string>;
  xp?: number;
  currentStreak?: number;
  longestStreak?: number;
  lastActiveDate?: string | null;
  completedLessons?: string[];
  quizScores?: Record<string, number>;
  trophies?: string[];
  flashcardsKnown?: string[];
  recentArticles?: string[];
  recentLessons?: string[];
  recentTools?: string[];
}
