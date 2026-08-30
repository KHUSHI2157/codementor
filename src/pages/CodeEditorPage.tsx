import { useState, useMemo, useRef, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import {
  Play,
  Send,
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Terminal,
  FileCode2,
  Loader2,
  RotateCcw,
  Lightbulb,
  ListChecks,
} from 'lucide-react';
import { PROBLEM_MAP } from '@/data/problems';
import { TOPIC_MAP } from '@/data/topics';
import { LANGUAGES, LANGUAGE_MAP } from '@/data/languages';
import { useProgress } from '@/context/ProgressContext';
import { DifficultyBadge } from '@/components/ui/Badges';
import { Button } from '@/components/ui/Button';
import type { LanguageId } from '@/types';

type RunState = 'idle' | 'running' | 'passed' | 'failed';

export function CodeEditorPage() {
  const { problemId } = useParams();
  const { isSolved, markSolved, profile, setCurrentLanguage } = useProgress();
  const problem = problemId ? PROBLEM_MAP[problemId] : undefined;

  const [selectedLang, setSelectedLang] = useState<LanguageId>(() => {
    if (!problem) return 'python';
    // Prefer user's current language if the problem supports it
    return problem.languageIds.includes(profile.currentLanguage)
      ? profile.currentLanguage
      : problem.languageIds[0];
  });

  const [code, setCode] = useState('');
  const [runState, setRunState] = useState<RunState>('idle');
  const [output, setOutput] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'testcases' | 'output'>('testcases');
  const [activeTestIdx, setActiveTestIdx] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [resetKey, setResetKey] = useState(0);

  // Sync code when language or problem changes
  useEffect(() => {
    if (problem) {
      setCode(problem.starterCode[selectedLang] ?? LANGUAGE_MAP[selectedLang].defaultCode);
      setRunState('idle');
      setOutput('');
      setActiveTab('testcases');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLang, problemId, resetKey]);

  if (!problem) {
    return <Navigate to="/problems" replace />;
  }

  const topic = TOPIC_MAP[problem.topicId];
  const solved = isSolved(problem.id);

  function handleLangChange(lang: LanguageId) {
    setSelectedLang(lang);
    setCurrentLanguage(lang);
  }

  function handleRun() {
    setRunState('running');
    setActiveTab('output');
    setOutput('');
    // Simulated execution — no real code runs.
    setTimeout(() => {
      const ex = problem!.examples[0];
      setOutput(
        [
          `> Running ${LANGUAGE_MAP[selectedLang].name}...`,
          `> Input: ${ex.input.replace(/\n/g, ' ↵ ')}`,
          ex.output,
          `> Process exited with code 0`,
        ].join('\n')
      );
      setRunState('idle');
    }, 900);
  }

  function handleSubmit() {
    setRunState('running');
    setActiveTab('output');
    setOutput('');
    setTimeout(() => {
      // Simulated pass — mark as solved in the real progress context
      const allPass = true;
      if (allPass) {
        markSolved(problem!.id);
        setOutput(
          [
            `> Compiling ${LANGUAGE_MAP[selectedLang].name} solution...`,
            `> Running ${problem!.examples.length} test cases...`,
            ...problem!.examples.map(
              (ex, i) => `  ✓ Test case ${i + 1} passed — input: "${ex.input.replace(/\n/g, ' ')}"`
            ),
            ``,
            `> All test cases passed!`,
          ].join('\n')
        );
        setRunState('passed');
      } else {
        setOutput('> Some test cases failed. Review your solution and try again.');
        setRunState('failed');
      }
    }, 1200);
  }

  function handleReset() {
    setResetKey((k) => k + 1);
  }

  // Line numbers
  const lineCount = useMemo(() => code.split('\n').length, [code]);

  return (
    <div className="flex h-screen flex-col bg-surface">
      {/* Top bar */}
      <header className="flex h-14 flex-shrink-0 items-center justify-between border-b border-surface-border bg-surface-raised px-4">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            to={`/problems/${problem.id}`}
            className="inline-flex items-center gap-1.5 rounded-lg p-1.5 text-gray-400 hover:bg-surface-subtle hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex min-w-0 items-center gap-2">
            <FileCode2 className="h-4 w-4 flex-shrink-0 text-brand-400" />
            <span className="truncate text-sm font-semibold text-white">{problem.title}</span>
            <DifficultyBadge difficulty={problem.difficulty} />
            {solved && (
              <span className="inline-flex items-center gap-1 rounded-md border border-success-500/30 bg-success-500/15 px-2 py-0.5 text-xs font-semibold text-success-400">
                <CheckCircle2 className="h-3 w-3" /> Solved
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Language selector */}
          <div className="flex rounded-lg border border-surface-border bg-surface p-0.5">
            {problem.languageIds.map((lid) => {
              const lang = LANGUAGE_MAP[lid];
              return (
                <button
                  key={lid}
                  onClick={() => handleLangChange(lid)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    selectedLang === lid
                      ? 'bg-surface-overlay text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {lang.name}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main split */}
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        {/* Left: problem description */}
        <div className="flex w-full flex-col border-b border-surface-border lg:w-96 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-2 border-b border-surface-border px-4 py-2.5">
            <ListChecks className="h-4 w-4 text-brand-400" />
            <span className="text-sm font-semibold text-white">Problem</span>
            {topic && (
              <Link
                to={`/languages/${topic.languageId}`}
                className="ml-auto inline-flex items-center gap-1 text-xs text-gray-500 hover:text-white"
              >
                {topic.title} <ChevronRight className="h-3 w-3" />
              </Link>
            )}
          </div>
          <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto p-4">
            <p className="text-sm leading-relaxed text-gray-300">
              {problem.description.replace(/\*\*/g, '')}
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">Input Format</p>
                <p className="text-sm text-gray-400">{problem.inputFormat}</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">Output Format</p>
                <p className="text-sm text-gray-400">{problem.outputFormat}</p>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Examples</p>
                {problem.examples.map((ex, i) => (
                  <div key={i} className="mb-2 rounded-lg border border-surface-border bg-surface-subtle/40 p-3">
                    <p className="text-xs text-gray-500">Input</p>
                    <pre className="mt-1 font-mono text-xs text-gray-200 whitespace-pre-wrap">{ex.input}</pre>
                    <p className="mt-2 text-xs text-gray-500">Output</p>
                    <pre className="mt-1 font-mono text-xs text-success-400 whitespace-pre-wrap">{ex.output}</pre>
                  </div>
                ))}
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">Constraints</p>
                <p className="font-mono text-xs text-gray-400">{problem.constraints}</p>
              </div>
              <div>
                <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <Lightbulb className="h-3.5 w-3.5 text-warning-400" /> Hints
                </p>
                <ul className="space-y-1.5">
                  {problem.hints.map((h, i) => (
                    <li key={i} className="text-xs text-gray-400">• {h}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Center: editor + console */}
        <div className="flex min-h-0 flex-1 flex-col">
          {/* Editor toolbar */}
          <div className="flex items-center justify-between border-b border-surface-border bg-surface-raised px-4 py-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-400">
                solution.{LANGUAGE_MAP[selectedLang].fileExtension}
              </span>
            </div>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-gray-400 hover:bg-surface-subtle hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          </div>

          {/* Code editor */}
          <div className="relative min-h-0 flex-1 overflow-hidden bg-[#0b0e14]">
            <div className="flex h-full">
              {/* Line numbers */}
              <div className="select-none py-4 pl-4 pr-2 text-right font-mono text-xs text-gray-600 scrollbar-thin overflow-hidden">
                {Array.from({ length: lineCount }, (_, i) => (
                  <div key={i} className="leading-6">{i + 1}</div>
                ))}
              </div>
              {/* Textarea */}
              <textarea
                key={resetKey}
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="flex-1 resize-none bg-transparent py-4 pr-4 font-mono text-sm leading-6 text-gray-200 focus:outline-none scrollbar-thin"
                style={{ tabSize: 4 }}
              />
            </div>
          </div>

          {/* Console / test cases */}
          <div className="flex h-56 flex-shrink-0 flex-col border-t border-surface-border bg-surface-raised">
            {/* Tabs */}
            <div className="flex items-center gap-1 border-b border-surface-border px-3 py-1.5">
              <button
                onClick={() => setActiveTab('testcases')}
                className={`rounded-md px-3 py-1.5 text-xs font-medium ${
                  activeTab === 'testcases' ? 'bg-surface-overlay text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="inline-flex items-center gap-1.5"><ListChecks className="h-3.5 w-3.5" /> Test Cases</span>
              </button>
              <button
                onClick={() => setActiveTab('output')}
                className={`rounded-md px-3 py-1.5 text-xs font-medium ${
                  activeTab === 'output' ? 'bg-surface-overlay text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="inline-flex items-center gap-1.5"><Terminal className="h-3.5 w-3.5" /> Console</span>
              </button>

              {runState === 'passed' && (
                <span className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-success-400">
                  <CheckCircle2 className="h-4 w-4" /> Accepted
                </span>
              )}
              {runState === 'failed' && (
                <span className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-danger-400">
                  <XCircle className="h-4 w-4" /> Wrong Answer
                </span>
              )}
            </div>

            {/* Tab content */}
            <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto">
              {activeTab === 'testcases' ? (
                <div className="p-3">
                  <div className="mb-3 flex gap-1.5">
                    {problem.examples.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveTestIdx(i)}
                        className={`rounded-md border px-3 py-1 text-xs font-medium ${
                          activeTestIdx === i
                            ? 'border-brand-500/50 bg-brand-600/15 text-brand-400'
                            : 'border-surface-border bg-surface-subtle text-gray-400 hover:text-white'
                        }`}
                      >
                        Case {i + 1}
                      </button>
                    ))}
                  </div>
                  {problem.examples[activeTestIdx] && (
                    <div className="space-y-3">
                      <div>
                        <p className="mb-1 text-xs text-gray-500">Input</p>
                        <pre className="rounded-lg border border-surface-border bg-surface p-3 font-mono text-xs text-gray-200 whitespace-pre-wrap">
                          {problem.examples[activeTestIdx].input}
                        </pre>
                      </div>
                      <div>
                        <p className="mb-1 text-xs text-gray-500">Expected Output</p>
                        <pre className="rounded-lg border border-surface-border bg-surface p-3 font-mono text-xs text-success-400 whitespace-pre-wrap">
                          {problem.examples[activeTestIdx].output}
                        </pre>
                      </div>
                      {problem.examples[activeTestIdx].explanation && (
                        <p className="text-xs text-gray-400">
                          <span className="font-medium text-gray-300">Explanation:</span>{' '}
                          {problem.examples[activeTestIdx].explanation}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-3">
                  {output ? (
                    <pre className="font-mono text-xs leading-relaxed text-gray-300 whitespace-pre-wrap">{output}</pre>
                  ) : (
                    <p className="py-8 text-center text-xs text-gray-600">
                      Run your code to see output here.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Action bar */}
            <div className="flex items-center justify-end gap-2 border-t border-surface-border px-4 py-2.5">
              <Button variant="secondary" size="sm" onClick={handleRun} disabled={runState === 'running'}>
                {runState === 'running' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                Run Code
              </Button>
              <Button size="sm" onClick={handleSubmit} disabled={runState === 'running'}>
                {runState === 'running' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
