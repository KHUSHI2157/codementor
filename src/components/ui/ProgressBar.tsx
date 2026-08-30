interface ProgressBarProps {
  value: number; // 0..100
  max?: number;
  className?: string;
  size?: 'sm' | 'md';
  showLabel?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  className = '',
  size = 'md',
  showLabel = false,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, Math.round((value / max) * 100)));
  const barHeight = size === 'sm' ? 'h-1.5' : 'h-2.5';
  return (
    <div className={`w-full ${className}`}>
      <div className={`w-full ${barHeight} rounded-full bg-surface-subtle overflow-hidden`}>
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-400 transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-xs text-gray-400 tabular-nums">{pct}%</div>
      )}
    </div>
  );
}
