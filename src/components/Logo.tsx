import { Link } from 'react-router-dom';
import { Code2 } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
}

export function Logo({ size = 'md', withText = true }: LogoProps) {
  const iconSize = size === 'sm' ? 'h-6 w-6' : size === 'lg' ? 'h-9 w-9' : 'h-7 w-7';
  const textSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-xl' : 'text-lg';
  return (
    <Link to="/" className="group inline-flex items-center gap-2.5 focus:outline-none">
      <span className="relative inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-glow">
        <Code2 className={`${iconSize} text-white`} />
      </span>
      {withText && (
        <span className={`font-bold tracking-tight text-white ${textSize}`}>
          Code<span className="text-brand-400">Mentor</span>
        </span>
      )}
    </Link>
  );
}
