import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SAAS_MODE_ENABLED } from '../config';

/**
 * Login route placeholder. The route exists so SaaS auth slots in later, but
 * while SAAS_MODE_ENABLED is false it simply redirects home — v1.0 has no
 * accounts and every visitor already has full access.
 */
export function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!SAAS_MODE_ENABLED) navigate('/', { replace: true });
  }, [navigate]);

  return (
    <div className="mx-auto max-w-sm px-4 py-24 text-center">
      <h1 className="text-xl font-bold text-slate-900 dark:text-white">
        Sign in
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Accounts aren’t available yet — Viszio HVAC is free and open during the
        beta.
      </p>
    </div>
  );
}
