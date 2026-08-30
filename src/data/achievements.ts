import type { Achievement } from '@/types';

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first-step', title: 'First Step', description: 'Solve your first problem', icon: 'Footprints', threshold: 1, metric: 'solved' },
  { id: 'getting-warm', title: 'Getting Warm', description: 'Solve 5 problems', icon: 'Flame', threshold: 5, metric: 'solved' },
  { id: 'problem-solver', title: 'Problem Solver', description: 'Solve 10 problems', icon: 'Puzzle', threshold: 10, metric: 'solved' },
  { id: 'code-warrior', title: 'Code Warrior', description: 'Solve 25 problems', icon: 'Swords', threshold: 25, metric: 'solved' },
  { id: 'streak-3', title: 'On a Roll', description: 'Maintain a 3-day streak', icon: 'Zap', threshold: 3, metric: 'streak' },
  { id: 'streak-7', title: 'Week Warrior', description: 'Maintain a 7-day streak', icon: 'CalendarCheck', threshold: 7, metric: 'streak' },
  { id: 'xp-100', title: 'Centurion', description: 'Earn 100 XP', icon: 'Star', threshold: 100, metric: 'xp' },
  { id: 'xp-250', title: 'Rising Star', description: 'Earn 250 XP', icon: 'Sparkles', threshold: 250, metric: 'xp' },
];
