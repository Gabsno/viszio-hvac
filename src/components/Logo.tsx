import { Link } from 'react-router-dom';

/** Viszio HVAC wordmark + glyph. */
export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="flex shrink-0 items-center gap-2"
      aria-label="Viszio HVAC home"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-700 text-white">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            d="M4 7h16M4 12h16M4 17h9"
            stroke="#a5f3fc"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <circle
            cx="16.5"
            cy="17"
            r="3"
            fill="none"
            stroke="#fb923c"
            strokeWidth="2.4"
          />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-extrabold tracking-tight text-slate-900 dark:text-white">
          Viszio HVAC
        </span>
        <span className="hidden text-[10px] font-medium uppercase tracking-wider text-teal-700 sm:block dark:text-teal-400">
          Engineering Library
        </span>
      </span>
    </Link>
  );
}
