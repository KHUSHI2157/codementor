import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { LanguageId, UserProfile } from '@/types';
import { PROBLEMS, PROBLEM_MAP } from '@/data/problems';
import { TOPICS } from '@/data/topics';

const STORAGE_KEY = 'codementor:profile';

const DEFAULT_PROFILE: UserProfile = {
  name: 'Student',
  currentLanguage: 'python',
  streak: 4,
  xp: 85,
  // Pre-seed a couple solved problems so the dashboard looks alive on first visit.
  solvedProblemIds: ['sum-two-numbers', 'even-or-odd', 'greet-user'],
  completedTopicIds: [],
  weeklyActivity: [2, 1, 3, 0, 2, 1, 1],
  lastActiveDate: new Date().toISOString().slice(0, 10),
};

function loadProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as UserProfile;
      return { ...DEFAULT_PROFILE, ...parsed };
    }
  } catch {
    /* ignore */
  }
  return DEFAULT_PROFILE;
}

interface ProgressContextValue {
  profile: UserProfile;
  isSolved: (problemId: string) => boolean;
  markSolved: (problemId: string) => void;
  setCurrentLanguage: (lang: LanguageId) => void;
  totalProblems: number;
  totalSolved: number;
  overallProgress: number;
  reset: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(() => loadProfile());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      /* ignore */
    }
  }, [profile]);

  const value = useMemo<ProgressContextValue>(() => {
    const totalSolved = profile.solvedProblemIds.length;
    const totalProblems = PROBLEMS.length;
    const overallProgress = totalProblems > 0 ? Math.round((totalSolved / totalProblems) * 100) : 0;

    return {
      profile,
      isSolved: (id) => profile.solvedProblemIds.includes(id),
      markSolved: (id) => {
        setProfile((prev) => {
          if (prev.solvedProblemIds.includes(id)) return prev;
          const problem = PROBLEM_MAP[id];
          const gainedXp = problem?.estimatedXp ?? 10;
          const newSolved = [...prev.solvedProblemIds, id];
          // Mark topic complete when all its problems are solved.
          const newlyCompleted = [...prev.completedTopicIds];
          for (const topic of TOPICS) {
            if (newlyCompleted.includes(topic.id)) continue;
            const topicProblems = PROBLEMS.filter((p) => p.topicId === topic.id);
            if (topicProblems.length > 0 && topicProblems.every((p) => newSolved.includes(p.id))) {
              newlyCompleted.push(topic.id);
            }
          }
          return {
            ...prev,
            solvedProblemIds: newSolved,
            completedTopicIds: newlyCompleted,
            xp: prev.xp + gainedXp,
          };
        });
      },
      setCurrentLanguage: (lang) => setProfile((prev) => ({ ...prev, currentLanguage: lang })),
      totalProblems,
      totalSolved,
      overallProgress,
      reset: () => setProfile(DEFAULT_PROFILE),
    };
  }, [profile]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
