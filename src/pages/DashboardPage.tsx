import { Link } from 'react-router-dom';
import {
  Flame,
  Trophy,
  Star,
  Target,
  ArrowRight,
  BookOpen,
  Code2,
  TrendingUp,
  CheckCircle2,
  Circle,
  Sparkles,
} from 'lucide-react';
import { AppLayout } from '@/components/AppLayout';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ProblemCard } from '@/components/ui/ProblemCard';
import { LinkButton } from '@/components/ui/Button';
import { useProgress } from '@/context/ProgressContext';
import { LANGUAGES, LANGUAGE_MAP } from '@/data/languages';
import { TOPICS, topicsForLanguage } from '@/data/topics';
import { PROBLEMS, problemsForLanguage } from '@/data/problems';
import { ACHIEVEMENTS } from '@/data/achievements';
import * as LucideIcons from 'lucide-react';

function getIcon(name: string) {
  const Icon = (LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[name];
  return Icon ?? Code2;
}

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function DashboardPage() {
  const { profile, isSolved, totalSolved, totalProblems, overallProgress } = useProgress();
  const currentLang = LANGUAGE_MAP[profile.currentLanguage];
  const langTopics = topicsForLanguage(profile.currentLanguage);
  const langProblems = problemsForLanguage(profile.currentLanguage);

  // Continue learning: first unsolved problem in current language
  const continueProblem = langProblems.find((p) => !isSolved(p.id)) ?? langProblems[0];

  // Recommended: unsolved problems, prefer medium difficulty
  const recommended = PROBLEMS.filter((p) => !isSolved(p.id))
    .sort((a, b) => (a.difficulty === 'Medium' ? -1 : 1) - (b.difficulty === 'Medium' ? -1 : 1))
    .slice(0, 4);

  const solvedCount = profile.solvedProblemIds.length;
  const earnedAchievements = ACHIEVEMENTS.filter(
    (a) =>
      (a.metric === 'solved' && solvedCount >= a.threshold) ||
      (a.metric === 'streak' && profile.streak >= a.threshold) ||
      (a.metric === 'xp' && profile.xp >= a.threshold)
  );
  const recentActivity = profile.solvedProblemIds.slice(-3).reverse();

  const maxActivity = Math.max(...profile.weeklyActivity, 1);

  return (
    <AppLayout>
      <PageHeader
        title={`Welcome back, ${profile.name}`}
        subtitle={`You're on a ${profile.streak}-day streak. Keep it going — solve a problem today.`}
        actions={
          <LinkButton to="/problems" size="md">
            Practice <ArrowRight className="h-4 w-4" />
          </LinkButton>
        }
      />

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Flame} label="Current Streak" value={`${profile.streak} days`} hint="Keep practicing daily" accent="text-warning-400" />
        <StatCard icon={CheckCircle2} label="Problems Solved" value={totalSolved} hint={`of ${totalProblems} total`} accent="text-success-400" />
        <StatCard icon={Star} label="XP Earned" value={profile.xp} hint="Earn more by solving problems" accent="text-accent-400" />
        <StatCard icon={Target} label="Overall Progress" value={`${overallProgress}%`} hint="Across all languages" accent="text-brand-400" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Continue Learning + Recommended */}
        <div className="lg:col-span-2 space-y-6">
          {/* Continue learning */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Continue Learning</h2>
              <span className={`text-sm font-medium ${currentLang.accent}`}>{currentLang.name}</span>
            </div>
            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-surface-border bg-surface-subtle/40 p-4">
              <div className="flex items-center gap-3">
                <div className={`rounded-lg bg-surface-raised p-3 ${currentLang.accent}`}>
                  {(() => {
                    const Icon = getIcon(currentLang.icon);
                    return <Icon className="h-6 w-6" />;
                  })()}
                </div>
                <div>
                  <p className="text-xs text-gray-500">Up next in {currentLang.name}</p>
                  <p className="font-semibold text-white">{continueProblem?.title ?? 'All caught up!'}</p>
                  <p className="mt-0.5 text-xs text-gray-400">
                    {langTopics.find((t) => t.id === continueProblem?.topicId)?.title}
                  </p>
                </div>
              </div>
              {continueProblem && (
                <LinkButton to={`/problems/${continueProblem.id}/code`} size="sm">
                  Resume <ArrowRight className="h-4 w-4" />
                </LinkButton>
              )}
            </div>

            {/* Topic progress for current language */}
            <div className="mt-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">{currentLang.name} topic progress</span>
                <span className="text-white font-medium tabular-nums">
                  {profile.solvedProblemIds.filter((id) => {
                    const p = PROBLEMS.find((pr) => pr.id === id);
                    return p?.languageIds.includes(profile.currentLanguage);
                  }).length} / {langProblems.length} problems
                </span>
              </div>
              <ProgressBar
                value={profile.solvedProblemIds.filter((id) => {
                  const p = PROBLEMS.find((pr) => pr.id === id);
                  return p?.languageIds.includes(profile.currentLanguage);
                }).length}
                max={langProblems.length || 1}
                className="mt-2"
              />
            </div>
          </Card>

          {/* Recommended problems */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Recommended Problems</h2>
              <Link to="/problems" className="text-sm text-brand-400 hover:text-brand-300">
                View all
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {recommended.map((p) => (
                <ProblemCard key={p.id} problemId={p.id} />
              ))}
            </div>
          </div>
        </div>

        {/* Right column: weekly activity + achievements + recent */}
        <div className="space-y-6">
          {/* Weekly activity */}
          <Card className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-brand-400" />
              <h2 className="text-sm font-semibold text-white">Weekly Activity</h2>
            </div>
            <div className="mt-4 flex items-end justify-between gap-2 h-32">
              {profile.weeklyActivity.map((count, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex w-full flex-1 items-end">
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-brand-700 to-brand-400 transition-all duration-500"
                      style={{ height: `${(count / maxActivity) * 100}%`, minHeight: count > 0 ? '8px' : '2px' }}
                      title={`${count} problems`}
                    />
                  </div>
                  <span className="text-[10px] text-gray-500">{WEEKDAYS[i]}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-gray-500">
              {profile.weeklyActivity.reduce((a, b) => a + b, 0)} problems this week
            </p>
          </Card>

          {/* Achievements */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-accent-400" />
                <h2 className="text-sm font-semibold text-white">Achievements</h2>
              </div>
              <span className="text-xs text-gray-500">{earnedAchievements.length}/{ACHIEVEMENTS.length}</span>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {ACHIEVEMENTS.slice(0, 8).map((a) => {
                const Icon = getIcon(a.icon);
                const earned = earnedAchievements.some((e) => e.id === a.id);
                return (
                  <div
                    key={a.id}
                    title={`${a.title} — ${a.description}`}
                    className={`flex flex-col items-center gap-1 rounded-lg border p-2 transition-colors ${
                      earned
                        ? 'border-accent-500/30 bg-accent-500/10'
                        : 'border-surface-border bg-surface-subtle/40 opacity-50'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${earned ? 'text-accent-400' : 'text-gray-600'}`} />
                  </div>
                );
              })}
            </div>
            <Link to="/progress" className="mt-4 inline-flex items-center gap-1 text-sm text-brand-400 hover:text-brand-300">
              See all achievements <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Card>

          {/* Recent activity */}
          <Card className="p-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-brand-400" />
              <h2 className="text-sm font-semibold text-white">Recent Activity</h2>
            </div>
            <div className="mt-4 space-y-3">
              {recentActivity.length === 0 && (
                <p className="text-sm text-gray-500">No activity yet. Solve your first problem!</p>
              )}
              {recentActivity.map((id) => {
                const p = PROBLEMS.find((pr) => pr.id === id);
                if (!p) return null;
                return (
                  <Link
                    key={id}
                    to={`/problems/${id}`}
                    className="flex items-center gap-3 rounded-lg p-2 hover:bg-surface-subtle/60 transition-colors"
                  >
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-success-500" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-200">{p.title}</p>
                      <p className="text-xs text-gray-500">Solved · +{p.estimatedXp} XP</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
