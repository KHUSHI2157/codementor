import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  icon?: ReactNode;
}

export function PageHeader({ title, subtitle, actions, icon }: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        {icon && <div className="mt-0.5 text-brand-400">{icon}</div>}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-gray-400">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex flex-shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}
