import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

interface AppLayoutProps {
  children: ReactNode;
  withSidebar?: boolean;
}

export function AppLayout({ children, withSidebar = true }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <div className="mx-auto flex max-w-[1400px]">
        {withSidebar && <Sidebar />}
        <main className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
