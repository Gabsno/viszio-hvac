import { create } from 'zustand';
import type { Session, User } from '@supabase/supabase-js';
import { getSupabase } from '../lib/supabase';
import { AUTH_ENABLED } from '../config';

interface AuthState {
  user: User | null;
  session: Session | null;
  // Loading the initial session check on app boot.
  initializing: boolean;
  // True after we've successfully restored a session (or proven there isn't one).
  initialized: boolean;
  // Errors from the last sign-in/sign-up attempt.
  error: string | null;
  // Initialise — checks for an existing session and subscribes to auth changes.
  init: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  initializing: AUTH_ENABLED,
  initialized: !AUTH_ENABLED,
  error: null,

  init: async () => {
    if (!AUTH_ENABLED) {
      set({ initializing: false, initialized: true });
      return;
    }
    const sb = getSupabase();
    if (!sb) {
      set({ initializing: false, initialized: true });
      return;
    }
    // Look for an existing session.
    const { data } = await sb.auth.getSession();
    set({
      session: data.session,
      user: data.session?.user ?? null,
      initializing: false,
      initialized: true,
    });
    // Listen for sign-in / sign-out events to keep state in sync.
    sb.auth.onAuthStateChange((_event, newSession) => {
      set({
        session: newSession,
        user: newSession?.user ?? null,
      });
    });
  },

  signUp: async (email, password) => {
    const sb = getSupabase();
    if (!sb) {
      set({ error: 'Email authentication is not configured.' });
      return false;
    }
    set({ error: null });
    const { error } = await sb.auth.signUp({ email, password });
    if (error) {
      set({ error: error.message });
      return false;
    }
    return true;
  },

  signIn: async (email, password) => {
    const sb = getSupabase();
    if (!sb) {
      set({ error: 'Email authentication is not configured.' });
      return false;
    }
    set({ error: null });
    const { error } = await sb.auth.signInWithPassword({ email, password });
    if (error) {
      set({ error: error.message });
      return false;
    }
    return true;
  },

  signOut: async () => {
    const sb = getSupabase();
    if (!sb) return;
    await sb.auth.signOut();
    set({ user: null, session: null });
  },

  clearError: () => set({ error: null }),
}));
