import { Outlet } from 'react-router-dom';
import { TopBar } from './TopBar';
import { BottomNav } from './BottomNav';
import { PageTransition } from './PageTransition';

/** Shell for full-width pages (home, course, settings) — no sidebar. */
export function PlainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar showMenu={false} />
      {/* Bottom-nav clearance only on mobile (lg:pb-0). */}
      <main className="flex-1 pb-16 lg:pb-0">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <BottomNav />
    </div>
  );
}
