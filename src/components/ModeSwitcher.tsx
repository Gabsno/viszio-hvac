import { useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, GraduationCap } from 'lucide-react';

/** Top-right toggle between Library mode and Course mode. */
export function ModeSwitcher() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const courseMode = pathname.startsWith('/course');

  return (
    <div className="flex rounded-lg bg-slate-100 p-0.5 dark:bg-slate-800">
      <button
        onClick={() => navigate('/library')}
        className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold transition ${
          !courseMode
            ? 'bg-white text-teal-700 shadow-sm dark:bg-slate-700 dark:text-teal-300'
            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
        }`}
        aria-pressed={!courseMode}
      >
        <BookOpen size={15} />
        <span className="hidden sm:inline">Library</span>
      </button>
      <button
        onClick={() => navigate('/course')}
        className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold transition ${
          courseMode
            ? 'bg-white text-teal-700 shadow-sm dark:bg-slate-700 dark:text-teal-300'
            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
        }`}
        aria-pressed={courseMode}
      >
        <GraduationCap size={15} />
        <span className="hidden sm:inline">Course</span>
      </button>
    </div>
  );
}
