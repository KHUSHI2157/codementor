import type { LucideIcon } from 'lucide-react';
import { Card } from './Card';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  hint?: string;
  accent?: string; // tailwind text color for icon
}

export function StatCard({ icon: Icon, label, value, hint, accent = 'text-brand-400' }: StatCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="mt-1 text-2xl font-bold text-white tabular-nums">{value}</p>
        </div>
        <div className={`rounded-xl bg-surface-subtle p-2.5 ${accent}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {hint && <p className="mt-3 text-xs text-gray-500">{hint}</p>}
    </Card>
  );
}
