import { BASE_URL } from '../config';
import { BUILD_INFO } from '../build-info';

export interface VersionInfo {
  version: string;
  buildHash: string;
  builtAt: string;
  /** Remote kill switch: 'revoked' locks every copy on next online launch. */
  status?: 'active' | 'revoked';
  /** Optional message shown on the retired screen. */
  message?: string;
  /** Optional URL to send users to (e.g. the new SaaS app). */
  newUrl?: string;
  /** When true, a revoke also erases the user's on-device data. */
  wipe?: boolean;
}

/** Fetch the deployed version.json (cache-busted, never from the SW cache). */
export async function fetchDeployedVersion(): Promise<VersionInfo | null> {
  try {
    const res = await fetch(`${BASE_URL}version.json?t=${Date.now()}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return (await res.json()) as VersionInfo;
  } catch {
    return null;
  }
}

/** True when the deployed build differs from the running build. */
export function isStale(deployed: VersionInfo | null): boolean {
  if (!deployed) return false;
  // 'dev' build hash never reports stale (local development).
  if ((BUILD_INFO.buildHash as string) === 'dev') return false;
  return deployed.buildHash !== BUILD_INFO.buildHash;
}

/** True when the owner has revoked this deployment. */
export function isRevoked(deployed: VersionInfo | null): boolean {
  return deployed?.status === 'revoked';
}

/**
 * Retire this copy of the app from the device — deletes the offline cache and
 * unregisters the service worker, so the app stops working offline. When
 * `wipeData` is true it also clears the user's saved data (notes, bookmarks,
 * progress); otherwise that data is left untouched. Used by the kill switch.
 * Best-effort: each step is guarded so a failure does not block the others.
 */
export async function lockdown(wipeData = false): Promise<void> {
  if (wipeData) {
    try {
      localStorage.clear();
    } catch {
      /* ignore */
    }
  }
  try {
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
    }
  } catch {
    /* ignore */
  }
  try {
    if ('serviceWorker' in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((r) => r.unregister()));
    }
  } catch {
    /* ignore */
  }
}

export { BUILD_INFO };
