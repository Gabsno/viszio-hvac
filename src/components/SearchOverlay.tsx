import { useEffect } from 'react';
import { X } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { useUIStore } from '../store/useUIStore';

/** Full-screen search, shown on mobile when the search icon is tapped. */
export function SearchOverlay() {
  const open = useUIStore((s) => s.searchOverlayOpen);
  const setOpen = useUIStore((s) => s.setSearchOverlay);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-white p-4 dark:bg-slate-950 md:hidden">
      <div className="mb-3 flex items-center gap-3">
        <h2 className="flex-1 text-sm font-bold text-slate-900 dark:text-white">
          Search
        </h2>
        <button
          onClick={() => setOpen(false)}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Close search"
        >
          <X size={20} />
        </button>
      </div>
      <SearchBar fullScreen autoFocus onNavigate={() => setOpen(false)} />
    </div>
  );
}
