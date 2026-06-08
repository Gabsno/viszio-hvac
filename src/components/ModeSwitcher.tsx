import { useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, GraduationCap, Calculator } from 'lucide-react';
import { TOOLS_ENABLED } from '../config';

const ALL_MODES = [
  { key: 'library', label: 'Library', icon: BookOpen, path: '/library' },
  { key: 'course', label: 'Course', icon: GraduationCap, path: '/course' },
  { key: 'tools', label: 'Tools', icon: Calculator, path: '/tools' },
] as const;

const MODES = ALL_MODES.filter((m) => m.key !== 'tools' || TOOLS_ENABLED);

/** Top-right switcher between Library, Course and Tools modes. */
export function ModeSwitcher() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const active = pathname.startsWith('/course')
    ? 'course'
    : pathname.startsWith('/tools')
      ? 'tools'
      : 'library';

  return (
    <div className="flex rounded-lg bg-slate-100 p-0.5 dark:bg-slate-800">
      {MODES.map((m) => {
        const Cmp = m.icon;
        const on = active === m.key;
        return (
          <button
            key={m.key}
            onClick={() => navigate(m.path)}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold transition ${
              on
                ? 'bg-white text-teal-700 shadow-sm dark:bg-slate-700 dark:text-teal-300'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
            aria-pressed={on}
          >
            <Cmp size={15} />
            <span className="hidden sm:inline">{m.label}</span>
          </button>
        );
      })}
    </div>
  );
}
