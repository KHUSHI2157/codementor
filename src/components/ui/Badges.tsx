import type { Difficulty } from '@/types';

const STYLES: Record<Difficulty, string> = {
  Easy: 'bg-success-500/15 text-success-400 border-success-500/30',
  Medium: 'bg-warning-500/15 text-warning-400 border-warning-500/30',
  Hard: 'bg-danger-500/15 text-danger-400 border-danger-500/30',
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold ${STYLES[difficulty]}`}
    >
      {difficulty}
    </span>
  );
}

export function SolvedBadge({ solved }: { solved: boolean }) {
  return solved ? (
    <span className="inline-flex items-center gap-1 rounded-md border border-success-500/30 bg-success-500/15 px-2 py-0.5 text-xs font-semibold text-success-400">
      Solved
    </span>
  ) : (
    <span className="inline-flex items-center rounded-md border border-surface-border bg-surface-subtle px-2 py-0.5 text-xs font-medium text-gray-500">
      Unsolved
    </span>
  );
}
