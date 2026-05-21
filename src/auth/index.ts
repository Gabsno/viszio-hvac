// Auth scaffolding — placeholder only.
//
// v1.0 ships with no real authentication: SAAS_MODE_ENABLED is false and every
// visitor is a Pro beta user. These functions define the shape a future
// backend (or a drop-in provider) must satisfy, so flipping the SaaS switch is
// a wiring job, not a rewrite.

import { SAAS_MODE_ENABLED } from '../config';

export interface AuthResult {
  ok: boolean;
  message?: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export async function signIn(_creds: Credentials): Promise<AuthResult> {
  if (!SAAS_MODE_ENABLED) {
    return { ok: true, message: 'Beta mode — sign-in is not required.' };
  }
  // TODO: wire to backend session endpoint when SaaS launches.
  return { ok: false, message: 'Authentication is not yet available.' };
}

export async function signUp(_creds: Credentials): Promise<AuthResult> {
  if (!SAAS_MODE_ENABLED) {
    return { ok: true, message: 'Beta mode — accounts are not required.' };
  }
  // TODO: wire to backend registration endpoint.
  return { ok: false, message: 'Sign-up is not yet available.' };
}

export async function signOut(): Promise<AuthResult> {
  // TODO: clear backend session when SaaS launches.
  return { ok: true };
}
