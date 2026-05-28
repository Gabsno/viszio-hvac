import { Outlet } from 'react-router-dom';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { PageTransition } from './PageTransition';
import { useUIStore } from '../store/useUIStore';

/** Library mode shell: top bar + collapsible topic-tree sidebar. */
export function LibraryLayout() {
  const drawerOpen = useUIStore((s) => s.sidebarOpen);
  const setDrawer = useUIStore((s) => s.setSidebarOpen);

  return (
    <div className="flex min-h-screen flex-col">
      <TopBar showMenu />

      <div className="flex flex-1">
        {/* Desktop sidebar */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-72 shrink-0 border-r border-slate-200 bg-white lg:block dark:border-slate-800 dark:bg-slate-900">
          <Sidebar />
        </aside>

        {/* Mobile drawer */}
        {drawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setDrawer(false)}
            />
            <div className="animate-fade-in absolute left-0 top-0 h-full w-72 max-w-[85vw] border-r border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <Sidebar />
            </div>
          </div>
        )}

        <main className="min-w-0 flex-1 pb-16 lg:pb-0">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
