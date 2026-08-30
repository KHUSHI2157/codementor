import { Link } from 'react-router-dom';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-brand-600 hover:bg-brand-500 text-white shadow-card hover:shadow-glow active:scale-[.98]',
  secondary:
    'bg-surface-raised hover:bg-surface-overlay text-gray-100 border border-surface-border active:scale-[.98]',
  ghost: 'text-gray-300 hover:text-white hover:bg-surface-subtle active:scale-[.98]',
  outline:
    'border border-surface-border text-gray-200 hover:border-brand-500 hover:text-brand-400 active:scale-[.98]',
  danger: 'bg-danger-600 hover:bg-danger-500 text-white active:scale-[.98]',
};

const SIZES: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm rounded-lg gap-1.5',
  md: 'h-10 px-4 text-sm rounded-xl gap-2',
  lg: 'h-12 px-6 text-base rounded-xl gap-2.5',
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

interface ButtonProps extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  children: ReactNode;
  to?: undefined;
}

interface LinkButtonProps extends BaseProps {
  children: ReactNode;
  to: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:ring-offset-2 focus:ring-offset-surface disabled:opacity-50 disabled:pointer-events-none ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  to,
}: LinkButtonProps) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:ring-offset-2 focus:ring-offset-surface ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    >
      {children}
    </Link>
  );
}
