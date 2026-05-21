import { BASE_URL } from '../config';
import { BUILD_INFO } from '../build-info';

export interface VersionInfo {
  version: string;
  buildHash: string;
  builtAt: string;
}

/** Fetch the deployed version.json (cache-busted). */
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

export { BUILD_INFO };
