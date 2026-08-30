import { Link } from 'react-router-dom';
import { CheckCircle2, Circle, ChevronRight } from 'lucide-react';
import type { Problem } from '@/types';
import { useProgress } from '@/context/ProgressContext';
import { DifficultyBadge, SolvedBadge } from './Badges';
import { LANGUAGE_MAP } from '@/data/languages';
import { PROBLEM_MAP } from '@/data/problems';

interface ProblemCardProps {
  problemId: string;
  compact?: boolean;
}

export function ProblemCard({ problemId, compact = false }: ProblemCardProps) {
  const { isSolved } = useProgress();
  const problem: Problem | undefined = PROBLEM_MAP[problemId];
  if (!problem) return null;
  const solved = isSolved(problemId);

  return (
    <Link
      to={`/problems/${problem.id}`}
      className="group block rounded-xl border border-surface-border bg-surface-raised p-4 transition-all duration-200 hover:border-brand-500/50 hover:bg-surface-overlay hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          {solved ? (
            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-success-500" />
          ) : (
            <Circle className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-600" />
          )}
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-gray-100 group-hover:text-white">
              {problem.title}
            </h3>
            {!compact && (
              <p className="mt-0.5 line-clamp-2 text-sm text-gray-400">
                {problem.description.replace(/\*\*/g, '').slice(0, 110)}
              </p>
            )}
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <DifficultyBadge difficulty={problem.difficulty} />
              <SolvedBadge solved={solved} />
              <span className="text-xs text-gray-500">+{problem.estimatedXp} XP</span>
            </div>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 flex-shrink-0 text-gray-600 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-400" />
      </div>
    </Link>
  );
}

export function LanguageTag({ langId }: { langId: string }) {
  const lang = LANGUAGE_MAP[langId as keyof typeof LANGUAGE_MAP];
  if (!lang) return null;
  return <span className={`text-xs font-medium ${lang.accent}`}>{lang.name}</span>;
}
