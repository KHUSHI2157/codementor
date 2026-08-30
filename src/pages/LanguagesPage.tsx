import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CheckCircle2, ChevronRight, BookOpen, Code2 } from 'lucide-react';
import { AppLayout } from '@/components/AppLayout';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { LinkButton } from '@/components/ui/Button';
import { LANGUAGES, LANGUAGE_MAP } from '@/data/languages';
import { TOPICS, topicsForLanguage } from '@/data/topics';
import { PROBLEMS, problemsForLanguage, problemsForTopic } from '@/data/problems';
import { useProgress } from '@/context/ProgressContext';
import * as LucideIcons from 'lucide-react';
import type { LanguageId } from '@/types';

function getIcon(name: string) {
  const Icon = (LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[name];
  return Icon ?? BookOpen;
}

export function LanguagesPage() {
  const { isSolved, profile } = useProgress();

  return (
    <AppLayout>
      <PageHeader
        title="Languages"
        subtitle="Choose a language to explore its topics and practice problems."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        {LANGUAGES.map((lang) => {
          const Icon = getIcon(lang.icon);
          const langTopics = topicsForLanguage(lang.id);
          const langProblems = problemsForLanguage(lang.id);
          const solvedInLang = langProblems.filter((p) => isSolved(p.id)).length;
          const pct = langProblems.length > 0 ? Math.round((solvedInLang / langProblems.length) * 100) : 0;
          const isCurrent = profile.currentLanguage === lang.id;

          return (
            <Card key={lang.id} interactive className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`rounded-2xl bg-surface-subtle p-4 ${lang.accent}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-white">{lang.name}</h2>
                      {isCurrent && (
                        <span className="rounded-md border border-brand-500/30 bg-brand-600/15 px-2 py-0.5 text-xs font-medium text-brand-400">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{lang.tagline}</p>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-400">{lang.description}</p>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Topics</p>
                  <p className="text-lg font-bold text-white">{langTopics.length}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Problems</p>
                  <p className="text-lg font-bold text-white">{langProblems.length}</p>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Progress</span>
                  <span className="text-white tabular-nums">{pct}%</span>
                </div>
                <ProgressBar value={pct} size="sm" className="mt-1.5" />
              </div>

              <div className="mt-5">
                <LinkButton to={`/languages/${lang.id}`} size="md" variant="secondary" className="w-full">
                  Continue <ArrowRight className="h-4 w-4" />
                </LinkButton>
              </div>
            </Card>
          );
        })}
      </div>
    </AppLayout>
  );
}

export function TopicsPage() {
  const { languageId } = useParams();
  const { isSolved } = useProgress();

  if (!languageId || !LANGUAGE_MAP[languageId as LanguageId]) {
    return <Navigate to="/languages" replace />;
  }
  const lang = LANGUAGE_MAP[languageId as LanguageId];
  const Icon = getIcon(lang.icon);
  const topics = topicsForLanguage(lang.id);

  return (
    <AppLayout>
      <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
        <Link to="/languages" className="hover:text-white">Languages</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-gray-300">{lang.name}</span>
      </div>
      <PageHeader
        title={`${lang.name} Topics`}
        subtitle={lang.description}
        icon={<Icon className="h-7 w-7" />}
      />

      <div className="space-y-3">
        {topics.map((topic) => {
          const TopicIcon = getIcon(topic.icon);
          const topicProblems = problemsForTopic(topic.id);
          const solvedCount = topicProblems.filter((p) => isSolved(p.id)).length;
          const pct = topicProblems.length > 0 ? Math.round((solvedCount / topicProblems.length) * 100) : 0;
          const isComplete = topicProblems.length > 0 && solvedCount === topicProblems.length;

          return (
            <Card key={topic.id} interactive className="p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-surface-subtle text-brand-400">
                    <TopicIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-500 tabular-nums">
                        {String(topic.order).padStart(2, '0')}
                      </span>
                      <h3 className="font-semibold text-white">{topic.title}</h3>
                      {isComplete && <CheckCircle2 className="h-4 w-4 text-success-500" />}
                    </div>
                    <p className="mt-0.5 text-sm text-gray-400">{topic.description}</p>
                    <p className="mt-1.5 text-xs text-gray-500">
                      {topicProblems.length} problems · {solvedCount} solved
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:w-64">
                  <div className="flex-1">
                    <ProgressBar value={pct} size="sm" />
                  </div>
                  <LinkButton to="/problems" size="sm" variant="outline">
                    Start
                  </LinkButton>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </AppLayout>
  );
}
