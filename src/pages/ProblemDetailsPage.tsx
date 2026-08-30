import { Link, useParams, Navigate } from 'react-router-dom';
import { ChevronRight, ArrowLeft, Lightbulb, Terminal, Code2, ClipboardList, CheckCircle2 } from 'lucide-react';
import { AppLayout } from '@/components/AppLayout';
import { Card } from '@/components/ui/Card';
import { DifficultyBadge, SolvedBadge } from '@/components/ui/Badges';
import { LinkButton, Button } from '@/components/ui/Button';
import { PROBLEM_MAP } from '@/data/problems';
import { TOPIC_MAP } from '@/data/topics';
import { LANGUAGES } from '@/data/languages';
import { useProgress } from '@/context/ProgressContext';
import { useState } from 'react';

export function ProblemDetailsPage() {
  const { problemId } = useParams();
  const { isSolved } = useProgress();
  const [showHints, setShowHints] = useState(false);
  const problem = problemId ? PROBLEM_MAP[problemId] : undefined;

  if (!problem) {
    return <Navigate to="/problems" replace />;
  }

  const topic = TOPIC_MAP[problem.topicId];
  const solved = isSolved(problem.id);

  // Render description with simple **bold** markdown
  const renderDescription = (text: string) => {
    return text.split('\n').map((line, i) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <p key={i} className="mb-2 last:mb-0">
          {parts.map((part, j) =>
            part.startsWith('**') && part.endsWith('**') ? (
              <strong key={j} className="font-semibold text-white">{part.slice(2, -2)}</strong>
            ) : (
              <span key={j}>{part}</span>
            )
          )}
        </p>
      );
    });
  };

  return (
    <AppLayout>
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
        <Link to="/problems" className="inline-flex items-center gap-1 hover:text-white">
          <ArrowLeft className="h-3.5 w-3.5" /> Problems
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-gray-300 truncate">{problem.title}</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <Card className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white">{problem.title}</h1>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <DifficultyBadge difficulty={problem.difficulty} />
                  <SolvedBadge solved={solved} />
                  {topic && (
                    <Link
                      to={`/languages/${topic.languageId}`}
                      className="rounded-md border border-surface-border bg-surface-subtle px-2 py-0.5 text-xs text-gray-400 hover:text-white"
                    >
                      {topic.title}
                    </Link>
                  )}
                  <span className="text-xs text-gray-500">+{problem.estimatedXp} XP</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Description */}
          <Card className="p-6">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-400">
              <ClipboardList className="h-4 w-4" /> Description
            </h2>
            <div className="text-sm leading-relaxed text-gray-300">{renderDescription(problem.description)}</div>
          </Card>

          {/* I/O format */}
          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="p-5">
              <h3 className="mb-2 text-sm font-semibold text-white">Input Format</h3>
              <p className="text-sm text-gray-400">{problem.inputFormat}</p>
            </Card>
            <Card className="p-5">
              <h3 className="mb-2 text-sm font-semibold text-white">Output Format</h3>
              <p className="text-sm text-gray-400">{problem.outputFormat}</p>
            </Card>
          </div>

          {/* Examples */}
          <Card className="p-6">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400">Examples</h2>
            <div className="space-y-4">
              {problem.examples.map((ex, i) => (
                <div key={i} className="rounded-xl border border-surface-border bg-surface-subtle/40 p-4">
                  <p className="mb-2 text-xs font-medium text-gray-500">Example {i + 1}</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-gray-500">Input</p>
                      <pre className="mt-1 rounded-lg bg-surface p-3 font-mono text-sm text-gray-200 whitespace-pre-wrap">{ex.input}</pre>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Output</p>
                      <pre className="mt-1 rounded-lg bg-surface p-3 font-mono text-sm text-success-400 whitespace-pre-wrap">{ex.output}</pre>
                    </div>
                  </div>
                  {ex.explanation && (
                    <p className="mt-3 text-xs text-gray-400"><span className="font-medium text-gray-300">Explanation:</span> {ex.explanation}</p>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Constraints */}
          <Card className="p-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">Constraints</h2>
            <p className="font-mono text-sm text-gray-300">{problem.constraints}</p>
          </Card>

          {/* Hints */}
          <Card className="p-6">
            <button
              onClick={() => setShowHints((v) => !v)}
              className="flex w-full items-center justify-between"
            >
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-400">
                <Lightbulb className="h-4 w-4 text-warning-400" /> Hints
              </h2>
              <span className="text-xs text-gray-500">{showHints ? 'Hide' : 'Show'}</span>
            </button>
            {showHints && (
              <ul className="mt-4 space-y-2 animate-fade-in">
                {problem.hints.map((hint, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-warning-500/15 text-xs font-bold text-warning-400">
                      {i + 1}
                    </span>
                    {hint}
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-white">Ready to code?</h3>
            <p className="mt-1 text-sm text-gray-400">
              Open the IDE-style editor with starter code and test cases.
            </p>
            <LinkButton to={`/problems/${problem.id}/code`} size="md" className="mt-4 w-full">
              <Code2 className="h-4 w-4" /> Start Coding
            </LinkButton>
            {solved && (
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-success-400">
                <CheckCircle2 className="h-3.5 w-3.5" /> You've already solved this
              </p>
            )}
          </Card>

          <Card className="p-6">
            <h3 className="mb-3 text-sm font-semibold text-white">Available in</h3>
            <div className="space-y-2">
              {problem.languageIds.map((lid) => {
                const lang = LANGUAGES.find((l) => l.id === lid);
                return (
                  <div key={lid} className="flex items-center justify-between rounded-lg border border-surface-border bg-surface-subtle/40 px-3 py-2">
                    <span className={`text-sm font-medium ${lang?.accent}`}>{lang?.name}</span>
                    <span className="text-xs text-gray-500">.{lang?.fileExtension}</span>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
              <Terminal className="h-4 w-4 text-brand-400" /> Quick Info
            </h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-400">Difficulty</dt>
                <dd><DifficultyBadge difficulty={problem.difficulty} /></dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-400">XP reward</dt>
                <dd className="font-medium text-white">+{problem.estimatedXp}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-400">Test cases</dt>
                <dd className="font-medium text-white">{problem.examples.length}</dd>
              </div>
            </dl>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
