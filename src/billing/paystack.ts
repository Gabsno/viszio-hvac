// Paystack billing stub — placeholder only, not wired to anything in v1.0.
//
// Mirrors the shape of Paystack's transaction/subscription API so that when
// SaaS billing launches the integration slots in without restructuring.
// Paystack is the natural choice: it is the dominant processor in Ghana.

import type { Tier } from '../types';

export interface PaystackPlan {
  tier: Exclude<Tier, 'free'>;
  planCode: string;
  amountKobo: number; // Paystack works in the minor currency unit
  currency: 'GHS';
  interval: 'monthly' | 'annually';
}

// Placeholder plan catalogue — real plan codes come from the Paystack dashboard.
export const PLANS: PaystackPlan[] = [
  {
    tier: 'pro',
    planCode: 'PLN_viszio_pro_placeholder',
    amountKobo: 0,
    currency: 'GHS',
    interval: 'monthly',
  },
  {
    tier: 'enterprise',
    planCode: 'PLN_viszio_enterprise_placeholder',
    amountKobo: 0,
    currency: 'GHS',
    interval: 'monthly',
  },
];

export interface CheckoutOptions {
  email: string;
  planCode: string;
}

export interface CheckoutResult {
  ok: boolean;
  reference?: string;
  message?: string;
}

export async function initializeCheckout(
  _opts: CheckoutOptions,
): Promise<CheckoutResult> {
  // TODO: call Paystack `transaction/initialize` via the backend.
  return { ok: false, message: 'Billing is not enabled during the beta.' };
}

export async function verifyTransaction(
  _reference: string,
): Promise<CheckoutResult> {
  // TODO: call Paystack `transaction/verify` via the backend.
  return { ok: false, message: 'Billing is not enabled during the beta.' };
}

export async function cancelSubscription(
  _subscriptionCode: string,
): Promise<CheckoutResult> {
  // TODO: call Paystack `subscription/disable` via the backend.
  return { ok: false, message: 'Billing is not enabled during the beta.' };
}
