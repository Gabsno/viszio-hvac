// Export the user's Viszio HVAC data as a downloadable JSON file.
// The same schema is read back by the future Viszio Academy mobile app
// on first login so users can restore everything: XP, streaks, bookmarks,
// notes, completed lessons, trophies and recent activity.
//
// Versioned at the top so the future importer can detect and migrate
// older exports if the schema ever evolves.

import { APP_VERSION, APP_NAME } from '../config';
import { useProgressStore } from '../store/useProgressStore';
import { useSettingsStore } from '../store/useSettingsStore';

export const EXPORT_SCHEMA_VERSION = 1;

export interface ViszioExport {
  schemaVersion: number;
  exportedAt: string;
  sourceApp: 'viszio-hvac';
  sourceVersion: string;
  // The discipline the data lived under in the legacy app. The future
  // Viszio Academy uses this to slot the progress under the right tag.
  discipline: 'hvac';
  profile: {
    userName: string;
  };
  progress: {
    xp: number;
    currentStreak: number;
    longestStreak: number;
    lastActiveDate: string | null;
    completedLessons: string[];
    quizScores: Record<string, number>;
    trophies: string[];
    bookmarks: string[];
    readArticles: string[];
    notes: Record<string, string>;
    flashcardsKnown: string[];
    recentArticles: string[];
    recentLessons: string[];
    recentTools: string[];
  };
  settings: {
    speechRate: number;
    speechPitch: number;
    fontSize: string;
    readingMode: string;
    calcUnits: string;
  };
}

/** Build the export blob from current store state. Safe to call any time. */
export function buildExport(): ViszioExport {
  const p = useProgressStore.getState();
  const s = useSettingsStore.getState();
  return {
    schemaVersion: EXPORT_SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    sourceApp: 'viszio-hvac',
    sourceVersion: APP_VERSION,
    discipline: 'hvac',
    profile: {
      userName: s.userName ?? '',
    },
    progress: {
      xp: p.xp,
      currentStreak: p.currentStreak,
      longestStreak: p.longestStreak,
      lastActiveDate: p.lastActiveDate,
      completedLessons: p.completedLessons,
      quizScores: p.quizScores,
      trophies: p.trophies,
      bookmarks: p.bookmarks,
      readArticles: p.readArticles,
      notes: p.notes,
      flashcardsKnown: p.flashcardsKnown,
      recentArticles: p.recentArticles ?? [],
      recentLessons: p.recentLessons ?? [],
      recentTools: p.recentTools ?? [],
    },
    settings: {
      speechRate: s.speechRate,
      speechPitch: s.speechPitch,
      fontSize: s.fontSize,
      readingMode: s.readingMode,
      calcUnits: s.calcUnits,
    },
  };
}

/** Trigger a download of the export JSON. Returns the filename used. */
export function downloadExport(): string {
  const blob = buildExport();
  const today = new Date().toISOString().slice(0, 10);
  const safeName = (blob.profile.userName || 'user')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const filename = `${APP_NAME.toLowerCase().replace(/\s+/g, '-')}-${safeName || 'export'}-${today}.json`;
  const data = JSON.stringify(blob, null, 2);
  const file = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
  return filename;
}

/** Lightweight signal a user has at least *some* progress worth exporting. */
export function hasAnyProgress(): boolean {
  const p = useProgressStore.getState();
  return (
    p.xp > 0 ||
    p.bookmarks.length > 0 ||
    p.completedLessons.length > 0 ||
    p.readArticles.length > 0 ||
    Object.keys(p.notes).length > 0
  );
}
