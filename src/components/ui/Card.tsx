import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  interactive?: boolean;
}

export function Card({ children, interactive = false, className = '', ...rest }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-surface-border bg-surface-raised shadow-card ${
        interactive
          ? 'transition-all duration-200 hover:border-surface-border/80 hover:bg-surface-overlay hover:-translate-y-0.5'
          : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
