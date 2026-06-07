import { NavLink, useLocation } from 'react-router-dom';
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
  { to: '/', icon: <Home size={19} />, label: 'Home' },
  {
    to: '/course',
    icon: <GraduationCap size={19} />,
    label: 'Course',
    match: (p) => p.startsWith('/course'),
  },
  {
    to: '/library',
    icon: <BookOpen size={19} />,
    label: 'Library',
    match: (p) => p.startsWith('/library') || p.startsWith('/article'),
  },
  {
    to: '/tools',
    icon: <Calculator size={19} />,
    label: 'Tools',
    match: (p) => p.startsWith('/tools'),
  },
  { to: '/profile', icon: <User size={19} />, label: 'Profile' },
];

/**
 * Persistent bottom tab bar for mobile (lg:hidden). Each item highlights
 * with a soft pill background when active — same visual idiom as iOS
 * tab bars and Duolingo.
 */
export function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom,0px)] backdrop-blur-md shadow-[0_-6px_18px_rgba(15,23,42,0.06)] lg:hidden dark:border-slate-800 dark:bg-slate-950/95"
    >
      <div className="flex">
        {ITEMS.map((it) => {
          const isActive =
            pathname === it.to ||
            (it.to !== '/' && pathname.startsWith(it.to)) ||
            (it.match ? it.match(pathname) : false);
          return (
            <NavLink
              key={it.to}
              to={it.to}
              end={it.to === '/'}
              className="tap relative flex flex-1 items-center justify-center py-1.5"
              aria-current={isActive ? 'page' : undefined}
            >
              <span
                className={`flex flex-col items-center gap-0.5 rounded-2xl px-4 py-1 transition ${
                  isActive
                    ? 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {it.icon}
                <span
                  className={`text-[10px] font-semibold ${
                    isActive ? '' : 'opacity-90'
                  }`}
                >
                  {it.label}
                </span>
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
