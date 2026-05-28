import { NavLink } from 'react-router-dom';
import {
  GraduationCap,
  Home,
  BookOpen,
  Calculator,
  User,
} from 'lucide-react';

interface Item {
  to: string;
  icon: React.ReactNode;
  label: string;
  match?: (pathname: string) => boolean;
}

const ITEMS: Item[] = [
  { to: '/', icon: <Home size={18} />, label: 'Home' },
  {
    to: '/course',
    icon: <GraduationCap size={18} />,
    label: 'Course',
    match: (p) => p.startsWith('/course'),
  },
  {
    to: '/library',
    icon: <BookOpen size={18} />,
    label: 'Library',
    match: (p) => p.startsWith('/library') || p.startsWith('/article'),
  },
  {
    to: '/tools',
    icon: <Calculator size={18} />,
    label: 'Tools',
    match: (p) => p.startsWith('/tools'),
  },
  { to: '/profile', icon: <User size={18} />, label: 'Profile' },
];

/**
 * Persistent bottom tab bar for mobile. Hidden on lg+ (desktop has the
 * sidebar). Routes that should keep the bar visible all live under the
 * top-level paths in ITEMS — sub-pages still highlight their parent tab
 * via the `match` predicate.
 */
export function BottomNav() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-4px_12px_rgba(15,23,42,0.06)] lg:hidden dark:border-slate-800 dark:bg-slate-950"
    >
      {ITEMS.map((it) => (
        <NavLink
          key={it.to}
          to={it.to}
          end={it.to === '/'}
          className={({ isActive }) => {
            const active =
              isActive ||
              (it.match ? it.match(window.location.hash.replace(/^#/, '')) : false);
            return `flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] font-semibold transition ${
              active
                ? 'text-teal-700 dark:text-teal-300'
                : 'text-slate-500 dark:text-slate-400'
            }`;
          }}
        >
          {it.icon}
          {it.label}
        </NavLink>
      ))}
    </nav>
  );
}
