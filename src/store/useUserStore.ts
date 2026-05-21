import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Tier } from '../types';

// SaaS user record. v1.0 ships every visitor as an authenticated Pro user so
// all content is unlocked during the free beta. When SAAS_MODE_ENABLED flips
// true (config.ts), real auth populates this store instead.
interface UserState {
  id: string | null;
  email: string | null;
  tier: Tier;
  subscriptionStatus: 'none' | 'active' | 'past_due' | 'canceled';
  isAuthenticated: boolean;
  setUser: (u: Partial<UserState>) => void;
  reset: () => void;
}

const BETA_DEFAULT = {
  id: 'beta-user',
  email: null,
  tier: 'pro' as Tier,
  subscriptionStatus: 'none' as const,
  isAuthenticated: true,
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      ...BETA_DEFAULT,
      setUser: (u) => set(u),
      reset: () => set(BETA_DEFAULT),
    }),
    {
      name: 'viszio-hvac-user',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
