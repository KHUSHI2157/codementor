import type { Topic, LanguageId } from '@/types';

// Shared topic template — each language gets the same concept set with tailored descriptions.
type TopicSeed = Omit<Topic, 'id' | 'languageId' | 'problemIds'>;

const TOPIC_SEEDS: TopicSeed[] = [
  {
    title: 'Variables',
    description: 'Store and name values your program works with.',
    icon: 'Variable',
    order: 1,
  },
  {
    title: 'Data Types',
    description: 'Understand integers, floats, booleans, and characters.',
    icon: 'Type',
    order: 2,
  },
  {
    title: 'Operators',
    description: 'Arithmetic, comparison, and logical operations.',
    icon: 'Plus',
    order: 3,
  },
  {
    title: 'Conditional Statements',
    description: 'Make decisions with if, else, and switch.',
    icon: 'GitBranch',
    order: 4,
  },
  {
    title: 'Loops',
    description: 'Repeat work with for, while, and do-while.',
    icon: 'Repeat',
    order: 5,
  },
  {
    title: 'Functions',
    description: 'Break programs into reusable, named blocks.',
    icon: 'FunctionSquare',
    order: 6,
  },
  {
    title: 'Arrays',
    description: 'Collections of values accessed by index.',
    icon: 'LayoutGrid',
    order: 7,
  },
  {
    title: 'Strings',
    description: 'Work with text, characters, and common string operations.',
    icon: 'Type',
    order: 8,
  },
  {
    title: 'Pointers & References',
    description: 'Understand memory addresses and indirect access.',
    icon: 'MousePointerClick',
    order: 9,
  },
  {
    title: 'Object-Oriented Programming',
    description: 'Model the world with classes, objects, and inheritance.',
    icon: 'Boxes',
    order: 10,
  },
  {
    title: 'Basic Data Structures',
    description: 'Lists, stacks, queues, maps, and their trade-offs.',
    icon: 'Database',
    order: 11,
  },
  {
    title: 'Algorithms',
    description: 'Sorting, searching, and problem-solving strategies.',
    icon: 'Workflow',
    order: 12,
  },
];

// Languages where pointers/references are meaningful (skip for JS/Python which use references implicitly).
const POINTER_LANGUAGES: LanguageId[] = ['c', 'cpp'];

// OOP applies to C++, Python, JS — C is procedural, swap to "Structs & Memory".
function topicFor(lang: LanguageId, seed: TopicSeed): TopicSeed {
  if (lang === 'c' && seed.title === 'Object-Oriented Programming') {
    return {
      ...seed,
      title: 'Structs & Memory',
      description: 'Group related values with structs and manage memory layout.',
      icon: 'Boxes',
    };
  }
  if ((lang === 'python' || lang === 'javascript') && seed.title === 'Pointers & References') {
    return {
      ...seed,
      title: 'References & Memory',
      description: 'Understand how objects are referenced and shared in memory.',
      icon: 'MousePointerClick',
    };
  }
  return seed;
}

function buildTopics(): Topic[] {
  const langs: LanguageId[] = ['c', 'cpp', 'python', 'javascript'];
  const topics: Topic[] = [];
  for (const lang of langs) {
    for (const seed of TOPIC_SEEDS) {
      if (!POINTER_LANGUAGES.includes(lang) && seed.title === 'Pointers & References') {
        // keep — we rename to References & Memory for python/js above
      }
      const tailored = topicFor(lang, seed);
      topics.push({
        id: `${lang}-${tailored.title.toLowerCase().replace(/[^a-z]+/g, '-')}`,
        languageId: lang,
        title: tailored.title,
        description: tailored.description,
        icon: tailored.icon,
        order: tailored.order,
        problemIds: [], // linked in problems.ts
      });
    }
  }
  return topics;
}

export const TOPICS: Topic[] = buildTopics();

export const TOPIC_MAP: Record<string, Topic> = TOPICS.reduce(
  (acc, t) => ({ ...acc, [t.id]: t }),
  {} as Record<string, Topic>
);

export function topicsForLanguage(lang: LanguageId): Topic[] {
  return TOPICS.filter((t) => t.languageId === lang).sort((a, b) => a.order - b.order);
}

export function topicIdFor(lang: LanguageId, title: string): string {
  return `${lang}-${title.toLowerCase().replace(/[^a-z]+/g, '-')}`;
}
