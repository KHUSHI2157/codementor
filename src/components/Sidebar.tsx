import { NavLink } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard,
  Languages,
  BookOpen,
  Code2,
  TrendingUp,
  Flame,
  Star,
  Target,
} from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';
import { ProgressBar } from './ui/ProgressBar';

interface SidebarItem {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
}

const NAV: SidebarItem[] = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/languages', label: 'Languages', icon: Languages },
  { to: '/problems', label: 'Problems', icon: Code2 },
  { to: '/progress', label: 'Progress', icon: TrendingUp },
];

export function Sidebar() {
  const { profile, totalSolved, totalProblems, overallProgress } = useProgress();

  return (
    <aside className="hidden lg:flex w-60 flex-shrink-0 flex-col border-r border-surface-border bg-surface-raised/40">
      <nav className="flex-1 space-y-1 p-3">
        <p className="px-3 pb-2 pt-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Menu
        </p>
        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand-600/15 text-brand-400'
                  : 'text-gray-400 hover:bg-surface-subtle hover:text-white'
              }`
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="m-3 rounded-xl border border-surface-border bg-surface-subtle/60 p-4">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span className="inline-flex items-center gap-1.5">
            <Target className="h-3.5 w-3.5 text-brand-400" /> Progress
          </span>
          <span className="tabular-nums text-white">{overallProgress}%</span>
        </div>
        <ProgressBar value={overallProgress} size="sm" className="mt-2" />
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="flex items-center justify-center text-warning-400">
              <Flame className="h-3.5 w-3.5" />
            </div>
            <p className="mt-0.5 text-sm font-bold text-white">{profile.streak}</p>
            <p className="text-[10px] text-gray-500">Streak</p>
          </div>
          <div>
            <div className="flex items-center justify-center text-brand-400">
              <Code2 className="h-3.5 w-3.5" />
            </div>
            <p className="mt-0.5 text-sm font-bold text-white">{totalSolved}</p>
            <p className="text-[10px] text-gray-500">Solved</p>
          </div>
          <div>
            <div className="flex items-center justify-center text-accent-400">
              <Star className="h-3.5 w-3.5" />
            </div>
            <p className="mt-0.5 text-sm font-bold text-white">{profile.xp}</p>
            <p className="text-[10px] text-gray-500">XP</p>
          </div>
        </div>
        <p className="mt-3 text-[11px] text-gray-500">
          {totalSolved} of {totalProblems} problems
        </p>
      </div>
    </aside>
  );
}
