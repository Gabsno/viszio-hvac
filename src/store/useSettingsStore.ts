import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AIProvider } from '../lib/ai';

interface SettingsState {
  aiProvider: AIProvider;
  geminiKey: string;
  claudeKey: string;
  theme: 'light' | 'dark';
  setProvider: (p: AIProvider) => void;
  setGeminiKey: (k: string) => void;
  setClaudeKey: (k: string) => void;
  setTheme: (t: 'light' | 'dark') => void;
  toggleTheme: () => void;
  activeKey: () => string;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      aiProvider: 'gemini',
      geminiKey: '',
      claudeKey: '',
      theme: 'light',
      setProvider: (aiProvider) => set({ aiProvider }),
      setGeminiKey: (geminiKey) => set({ geminiKey }),
      setClaudeKey: (claudeKey) => set({ claudeKey }),
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
      activeKey: () => {
        const s = get();
        return s.aiProvider === 'gemini' ? s.geminiKey : s.claudeKey;
      },
    }),
    {
      name: 'viszio-hvac-settings',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
