export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type LanguageId = 'c' | 'cpp' | 'python' | 'javascript';

export interface Language {
  id: LanguageId;
  name: string;
  tagline: string;
  description: string;
  icon: string; // lucide icon name
  accent: string; // tailwind text color class
  fileExtension: string;
  defaultCode: string;
}

export interface Topic {
  id: string;
  languageId: LanguageId;
  title: string;
  description: string;
  icon: string;
  order: number;
  problemIds: string[];
}

export interface TestCase {
  input: string;
  output: string;
  explanation?: string;
}

export interface Problem {
  id: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  languageIds: LanguageId[];
  topicId: string;
  description: string;
  inputFormat: string;
  outputFormat: string;
  examples: TestCase[];
  constraints: string;
  hints: string[];
  starterCode: Partial<Record<LanguageId, string>>;
  estimatedXp: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  threshold: number;
  metric: 'solved' | 'streak' | 'xp';
}

export interface UserProfile {
  name: string;
  currentLanguage: LanguageId;
  streak: number;
  xp: number;
  solvedProblemIds: string[];
  completedTopicIds: string[];
  weeklyActivity: number[]; // 7 entries, Mon..Sun
  lastActiveDate: string;
}
