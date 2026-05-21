import { create } from 'zustand';
import type { Article } from '../types';

// Ephemeral UI state — intentionally not persisted.
interface UIState {
  sidebarOpen: boolean; // mobile drawer
  tutorOpen: boolean;
  tutorArticle: Article | null;
  searchOverlayOpen: boolean; // mobile full-screen search
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  openTutor: (article: Article | null) => void;
  closeTutor: () => void;
  setSearchOverlay: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  tutorOpen: false,
  tutorArticle: null,
  searchOverlayOpen: false,
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  openTutor: (tutorArticle) => set({ tutorOpen: true, tutorArticle }),
  closeTutor: () => set({ tutorOpen: false }),
  setSearchOverlay: (searchOverlayOpen) => set({ searchOverlayOpen }),
}));
