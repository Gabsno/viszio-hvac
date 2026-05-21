import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, Settings, Moon, Sun } from 'lucide-react';
import { Logo } from './Logo';
import { SearchBar } from './SearchBar';
import { ModeSwitcher } from './ModeSwitcher';
import { useUIStore } from '../store/useUIStore';
import { useSettingsStore } from '../store/useSettingsStore';

interface Props {
  /** Whether to show the sidebar hamburger (library mode only). */
  showMenu?: boolean;
}

export function TopBar({ showMenu = true }: Props) {
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const setSearchOverlay = useUIStore((s) => s.setSearchOverlay);
  const theme = useSettingsStore((s) => s.theme);
  const toggleTheme = useSettingsStore((s) => s.toggleTheme);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-slate-200 bg-white/90 px-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 sm:px-4">
      {showMenu && (
        <button
          onClick={toggleSidebar}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>
      )}

      <Logo />

      {/* Desktop search */}
      <div className="ml-2 hidden max-w-md flex-1 md:block">
        <SearchBar />
      </div>

      <div className="flex flex-1 items-center justify-end gap-1.5 sm:gap-2">
        {/* Mobile search trigger */}
        <button
          onClick={() => setSearchOverlay(true)}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label="Search"
        >
          <Search size={19} />
        </button>

        <ModeSwitcher />

        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon size={19} /> : <Sun size={19} />}
        </button>

        <Link
          to="/settings"
          className={`rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 ${
            pathname === '/settings'
              ? 'text-teal-700 dark:text-teal-400'
              : 'text-slate-600 dark:text-slate-300'
          }`}
          aria-label="Settings"
        >
          <Settings size={19} />
        </Link>
      </div>
    </header>
  );
}
