import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AIProvider } from '../lib/ai';

export type FontSize = 'small' | 'normal' | 'large' | 'xlarge';
export type ReadingMode = 'default' | 'high-contrast' | 'dyslexia';
export type UnitSystem = 'SI' | 'IP';

interface SettingsState {
  aiProvider: AIProvider;
  geminiKey: string;
  claudeKey: string;
  theme: 'light' | 'dark';
  fontSize: FontSize;
  readingMode: ReadingMode;
  userName: string;
  calcUnits: UnitSystem;
  speechVoice: string;
  speechRate: number;
  speechPitch: number;
  setProvider: (p: AIProvider) => void;
  setGeminiKey: (k: string) => void;
  setClaudeKey: (k: string) => void;
  setTheme: (t: 'light' | 'dark') => void;
  toggleTheme: () => void;
  setFontSize: (s: FontSize) => void;
  setReadingMode: (m: ReadingMode) => void;
  setUserName: (n: string) => void;
  setCalcUnits: (u: UnitSystem) => void;
  setSpeechVoice: (uri: string) => void;
  setSpeechRate: (r: number) => void;
  setSpeechPitch: (p: number) => void;
  activeKey: () => string;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      aiProvider: 'gemini',
      geminiKey: '',
      claudeKey: '',
      theme: 'light',
      fontSize: 'normal',
      readingMode: 'default',
      userName: '',
      calcUnits: 'SI',
      speechVoice: '',
      speechRate: 1,
      speechPitch: 1,
      setProvider: (aiProvider) => set({ aiProvider }),
      setGeminiKey: (geminiKey) => set({ geminiKey }),
      setClaudeKey: (claudeKey) => set({ claudeKey }),
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
      setFontSize: (fontSize) => set({ fontSize }),
      setReadingMode: (readingMode) => set({ readingMode }),
      setUserName: (userName) => set({ userName }),
      setCalcUnits: (calcUnits) => set({ calcUnits }),
      setSpeechVoice: (speechVoice) => set({ speechVoice }),
      setSpeechRate: (speechRate) => set({ speechRate }),
      setSpeechPitch: (speechPitch) => set({ speechPitch }),
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
