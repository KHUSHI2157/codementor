import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, LayoutDashboard, Languages, BookOpen, Code2, TrendingUp } from 'lucide-react';
import { Logo } from './Logo';
import { Button, LinkButton } from './ui/Button';

const NAV_LINKS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/languages', label: 'Languages', icon: Languages },
  { to: '/problems', label: 'Problems', icon: Code2 },
  { to: '/progress', label: 'Progress', icon: TrendingUp },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-surface-border bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-surface-subtle text-white'
                      : 'text-gray-400 hover:text-white hover:bg-surface-subtle/60'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/problems" className="text-sm text-gray-400 hover:text-white transition-colors">
            Sign in
          </Link>
          <LinkButton to="/dashboard" size="sm">
            Start Learning
          </LinkButton>
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-gray-300 hover:bg-surface-subtle"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-surface-border bg-surface animate-fade-in">
          <nav className="space-y-1 px-4 py-3">
            {NAV_LINKS.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive ? 'bg-surface-subtle text-white' : 'text-gray-300 hover:bg-surface-subtle/60'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
            <div className="pt-2">
              <Button className="w-full" onClick={() => setOpen(false)}>
                <Link to="/dashboard" className="contents">
                  Start Learning
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
