import type { Language, LanguageId } from '@/types';

export const LANGUAGES: Language[] = [
  {
    id: 'c',
    name: 'C',
    tagline: 'The foundation of modern programming',
    description:
      'Learn the fundamentals of memory, pointers, and systems programming with the language that started it all.',
    icon: 'Binary',
    accent: 'text-sky-400',
    fileExtension: 'c',
    defaultCode: '#include <stdio.h>\n\nint main() {\n    // Write your C code here\n    printf("Hello, World!\\n");\n    return 0;\n}\n',
  },
  {
    id: 'cpp',
    name: 'C++',
    tagline: 'Performance with powerful abstractions',
    description:
      'Master object-oriented programming, the STL, and efficient algorithms with a versatile systems language.',
    icon: 'Boxes',
    accent: 'text-blue-400',
    fileExtension: 'cpp',
    defaultCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your C++ code here\n    cout << "Hello, World!" << endl;\n    return 0;\n}\n',
  },
  {
    id: 'python',
    name: 'Python',
    tagline: 'Readable, beginner-friendly, everywhere',
    description:
      'Start your journey with the most approachable language — great for data, automation, and learning concepts.',
    icon: 'Coffee',
    accent: 'text-emerald-400',
    fileExtension: 'py',
    defaultCode: '# Write your Python code here\nif __name__ == "__main__":\n    print("Hello, World!")\n',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    tagline: 'The language of the web',
    description:
      'Build interactive experiences and learn programming concepts in the language that powers the browser.',
    icon: 'Code2',
    accent: 'text-amber-400',
    fileExtension: 'js',
    defaultCode: '// Write your JavaScript code here\nconsole.log("Hello, World!");\n',
  },
];

export const LANGUAGE_MAP: Record<LanguageId, Language> = LANGUAGES.reduce(
  (acc, l) => ({ ...acc, [l.id]: l }),
  {} as Record<LanguageId, Language>
);
