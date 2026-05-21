import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { SAAS_MODE_ENABLED } from '../config';
import { useUserStore } from '../store/useUserStore';
import type { Tier } from '../types';

const RANK: Record<Tier, number> = { free: 0, pro: 1, enterprise: 2 };

export function tierMeetsRequirement(userTier: Tier, required: Tier): boolean {
  return RANK[userTier] >= RANK[required];
}

interface Props {
  requires: Tier;
  children: ReactNode;
}

/**
 * Gates content behind a subscription tier. While SAAS_MODE_ENABLED is false
 * (v1.0 beta) this always renders children — the paywall path is dormant but
 * fully built, ready for the SaaS launch.
 */
export function TierGate({ requires, children }: Props) {
  const tier = useUserStore((s) => s.tier);

  if (!SAAS_MODE_ENABLED || tierMeetsRequirement(tier, requires)) {
    return <>{children}</>;
  }

  return (
    <div className="rounded-2xl border border-teal-200 bg-teal-50 p-8 text-center dark:border-teal-800 dark:bg-teal-950/40">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-white">
        <Lock size={22} />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
        {requires === 'pro' ? 'Pro' : 'Enterprise'} content
      </h3>
      <p className="mx-auto mt-1 max-w-sm text-sm text-slate-600 dark:text-slate-400">
        This article is part of the {requires} tier. Upgrade to unlock the full
        Viszio HVAC library.
      </p>
      <Link
        to="/settings"
        className="mt-4 inline-flex rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
      >
        See plans
      </Link>
    </div>
  );
}
