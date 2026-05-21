import { Outlet } from 'react-router-dom';
import { TopBar } from './TopBar';

/** Shell for full-width pages (home, course, settings) — no sidebar. */
export function PlainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar showMenu={false} />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
