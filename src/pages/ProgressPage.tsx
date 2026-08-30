import { Link } from 'react-router-dom';
import {
  Flame,
  Star,
  Trophy,
  Target,
  CheckCircle2,
  Code2,
  TrendingUp,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { AppLayout } from '@/components/AppLayout';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { LinkButton } from '@/components/ui/Button';
import { useProgress } from '@/context/ProgressContext';
import { ACHIEVEMENTS } from '@/data/achievements';
import { LANGUAGES, LANGUAGE_MAP } from '@/data/languages';
import { TOPICS, topicsForLanguage } from '@/data/topics';
import { PROBLEMS, problemsForLanguage } from '@/data/problems';
import * as LucideIcons from 'lucide-react';

function getIcon(name: string) {
  const Icon = (LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[name];
  return Icon ?? Trophy;
}

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function ProgressPage() {
  const { profile, isSolved, totalSolved, totalProblems, overallProgress, reset } = useProgress();

  const earned = ACHIEVEMENTS.filter(
    (a) =>
      (a.metric === 'solved' && totalSolved >= a.threshold) ||
      (a.metric === 'streak' && profile.streak >= a.threshold) ||
      (a.metric === 'xp' && profile.xp >= a.threshold)
  );
  const earnedIds = new Set(earned.map((a) => a.id));

  const maxActivity = Math.max(...profile.weeklyActivity, 1);

  // Difficulty breakdown
  const diffBreakdown = {
    Easy: PROBLEMS.filter((p) => p.difficulty === 'Easy' && isSolved(p.id)).length,
    Medium: PROBLEMS.filter((p) => p.difficulty === 'Medium' && isSolved(p.id)).length,
    Hard: PROBLEMS.filter((p) => p.difficulty === 'Hard' && isSolved(p.id)).length,
  };
  const diffTotals = {
    Easy: PROBLEMS.filter((p) => p.difficulty === 'Easy').length,
    Medium: PROBLEMS.filter((p) => p.difficulty === 'Medium').length,
    Hard: PROBLEMS.filter((p) => p.difficulty === 'Hard').length,
  };

  const completedTopics = profile.completedTopicIds.length;

  return (
    <AppLayout>
      <PageHeader
        title="Your Progress"
        subtitle="Track your problems solved, XP, streaks, and achievements over time."
        actions={
          <LinkButton to="/problems" size="md">
            Keep practicing <ArrowRight className="h-4 w-4" />
          </LinkButton>
        }
      />

      {/* Top stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={CheckCircle2} label="Problems Solved" value={totalSolved} hint={`of ${totalProblems} total`} accent="text-success-400" />
        <StatCard icon={Star} label="Total XP" value={profile.xp} hint="Earn more by solving" accent="text-accent-400" />
        <StatCard icon={Flame} label="Current Streak" value={`${profile.streak} days`} hint="Practice daily to maintain" accent="text-warning-400" />
        <StatCard icon={Target} label="Topics Completed" value={completedTopics} hint={`of ${TOPICS.length} total`} accent="text-brand-400" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Weekly activity */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-brand-400" />
              <h2 className="text-sm font-semibold text-white">Weekly Activity</h2>
            </div>
            <span className="text-xs text-gray-500">Problems solved per day</span>
          </div>
          <div className="mt-6 flex items-end justify-between gap-3 h-40">
            {profile.weeklyActivity.map((count, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-xs font-medium text-gray-400 tabular-nums">{count}</span>
                <div className="flex w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-brand-700 to-brand-400 transition-all duration-500"
                    style={{ height: `${(count / maxActivity) * 100}%`, minHeight: count > 0 ? '8px' : '2px' }}
                  />
                </div>
                <span className="text-xs text-gray-500">{WEEKDAYS[i]}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Difficulty breakdown */}
        <Card className="p-6">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-brand-400" />
            <h2 className="text-sm font-semibold text-white">By Difficulty</h2>
          </div>
          <div className="mt-5 space-y-4">
            {(['Easy', 'Medium', 'Hard'] as const).map((d) => {
              const solved = diffBreakdown[d];
              const total = diffTotals[d];
              const pct = total > 0 ? Math.round((solved / total) * 100) : 0;
              const colors = {
                Easy: 'from-success-600 to-success-400',
                Medium: 'from-warning-600 to-warning-400',
                Hard: 'from-danger-600 to-danger-400',
              };
              return (
                <div key={d}>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">{d}</span>
                    <span className="text-gray-400 tabular-nums">{solved}/{total}</span>
                  </div>
                  <div className="mt-1.5 h-2 rounded-full bg-surface-subtle overflow-hidden">
                    <div className={`h-full rounded-full bg-gradient-to-r ${colors[d]} transition-all duration-500`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Language progress */}
      <div className="mt-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Language Progress</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LANGUAGES.map((lang) => {
            const langProblems = problemsForLanguage(lang.id);
            const solvedInLang = langProblems.filter((p) => isSolved(p.id)).length;
            const pct = langProblems.length > 0 ? Math.round((solvedInLang / langProblems.length) * 100) : 0;
            const langTopics = topicsForLanguage(lang.id);
            const completedInLang = langTopics.filter((t) => profile.completedTopicIds.includes(t.id)).length;
            return (
              <Card key={lang.id} interactive className="p-5">
                <div className="flex items-center justify-between">
                  <span className={`text-lg font-bold ${lang.accent}`}>{lang.name}</span>
                  <span className="text-xs text-gray-500 tabular-nums">{pct}%</span>
                </div>
                <ProgressBar value={pct} size="sm" className="mt-3" />
                <div className="mt-3 space-y-1 text-xs text-gray-400">
                  <div className="flex justify-between">
                    <span>Problems</span>
                    <span className="text-white">{solvedInLang}/{langProblems.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Topics done</span>
                    <span className="text-white">{completedInLang}/{langTopics.length}</span>
                  </div>
                </div>
                <Link to={`/languages/${lang.id}`} className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-brand-400 hover:text-brand-300">
                  Continue <ArrowRight className="h-3 w-3" />
                </Link>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Topic completion overview */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-white">Topic Completion</h2>
        <Card className="divide-y divide-surface-border">
          {LANGUAGES.map((lang) => {
            const langTopics = topicsForLanguage(lang.id);
            return langTopics.map((topic) => {
              const topicProblems = PROBLEMS.filter((p) => p.topicId === topic.id);
              const solvedCount = topicProblems.filter((p) => isSolved(p.id)).length;
              const pct = topicProblems.length > 0 ? Math.round((solvedCount / topicProblems.length) * 100) : 0;
              const isComplete = pct === 100 && topicProblems.length > 0;
              return (
                <div key={topic.id} className="flex items-center gap-4 p-4">
                  <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${isComplete ? 'bg-success-500/15 text-success-400' : 'bg-surface-subtle text-gray-500'}`}>
                    {isComplete ? <CheckCircle2 className="h-4 w-4" /> : <span className="text-xs font-bold tabular-nums">{topic.order}</span>}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{lang.name}</span>
                      <span className="truncate text-sm font-medium text-gray-200">{topic.title}</span>
                    </div>
                  </div>
                  <div className="hidden w-32 sm:block">
                    <ProgressBar value={pct} size="sm" />
                  </div>
                  <span className="w-12 text-right text-xs text-gray-400 tabular-nums">{solvedCount}/{topicProblems.length}</span>
                </div>
              );
            });
          })}
        </Card>
      </div>

      {/* Achievements */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Achievements</h2>
          <span className="text-sm text-gray-500">{earned.length}/{ACHIEVEMENTS.length} unlocked</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ACHIEVEMENTS.map((a) => {
            const Icon = getIcon(a.icon);
            const isEarned = earnedIds.has(a.id);
            const progress =
              a.metric === 'solved' ? Math.min(totalSolved / a.threshold, 1) :
              a.metric === 'streak' ? Math.min(profile.streak / a.threshold, 1) :
              Math.min(profile.xp / a.threshold, 1);
            return (
              <Card
                key={a.id}
                className={`p-5 transition-colors ${
                  isEarned ? 'border-accent-500/30 bg-accent-500/5' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`rounded-xl p-3 ${isEarned ? 'bg-accent-500/15 text-accent-400' : 'bg-surface-subtle text-gray-600'}`}>
                    {isEarned ? <Icon className="h-6 w-6" /> : <Lock className="h-5 w-5" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className={`text-sm font-semibold ${isEarned ? 'text-white' : 'text-gray-400'}`}>{a.title}</h3>
                    <p className="mt-0.5 text-xs text-gray-500">{a.description}</p>
                  </div>
                </div>
                {!isEarned && (
                  <div className="mt-4">
                    <ProgressBar value={progress * 100} size="sm" />
                    <p className="mt-1.5 text-xs text-gray-500 tabular-nums">
                      {a.metric === 'solved' && `${totalSolved}/${a.threshold} solved`}
                      {a.metric === 'streak' && `${profile.streak}/${a.threshold} days`}
                      {a.metric === 'xp' && `${profile.xp}/${a.threshold} XP`}
                    </p>
                  </div>
                )}
                {isEarned && (
                  <p className="mt-3 text-xs font-medium text-accent-400">Unlocked</p>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Reset */}
      <div className="mt-10 border-t border-surface-border pt-6 text-center">
        <p className="text-xs text-gray-500">
          Your progress is saved locally in this browser.
        </p>
        <button
          onClick={() => {
            if (confirm('Reset all your progress? This cannot be undone.')) reset();
          }}
          className="mt-2 text-xs text-gray-500 hover:text-danger-400"
        >
          Reset progress
        </button>
      </div>
    </AppLayout>
  );
}
