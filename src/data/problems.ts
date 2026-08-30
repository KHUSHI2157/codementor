import type { Problem, LanguageId, Difficulty } from '@/types';
import { topicIdFor } from './topics';

// Helper to build starter code across languages for the same problem.
const starter = {
  sumTwo: {
    c: '#include <stdio.h>\n\nint main() {\n    int a, b;\n    scanf("%d %d", &a, &b);\n    int sum = a + b;\n    printf("%d\\n", sum);\n    return 0;\n}\n',
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    int sum = a + b;\n    cout << sum << endl;\n    return 0;\n}\n',
    python: 'a, b = map(int, input().split())\nprint(a + b)\n',
    javascript: '// In Node.js — read from stdin\nconst [a, b] = require("fs").readFileSync(0, "utf8").trim().split(" ").map(Number);\nconsole.log(a + b);\n',
  },
  greet: {
    python: 'name = input()\nprint(f"Hello, {name}!")\n',
    javascript: 'const name = require("fs").readFileSync(0, "utf8").trim();\nconsole.log(`Hello, ${name}!`);\n',
    c: '#include <stdio.h>\n\nint main() {\n    char name[100];\n    scanf("%s", name);\n    printf("Hello, %s!\\n", name);\n    return 0;\n}\n',
    cpp: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string name;\n    cin >> name;\n    cout << "Hello, " << name << "!" << endl;\n    return 0;\n}\n',
  },
  evenOdd: {
    python: 'n = int(input())\nprint("Even" if n % 2 == 0 else "Odd")\n',
    javascript: 'const n = Number(require("fs").readFileSync(0, "utf8").trim());\nconsole.log(n % 2 === 0 ? "Even" : "Odd");\n',
    c: '#include <stdio.h>\n\nint main() {\n    int n;\n    scanf("%d", &n);\n    if (n % 2 == 0) printf("Even\\n");\n    else printf("Odd\\n");\n    return 0;\n}\n',
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    if (n % 2 == 0) cout << "Even" << endl;\n    else cout << "Odd" << endl;\n    return 0;\n}\n',
  },
  maxOfThree: {
    python: 'a, b, c = map(int, input().split())\nprint(max(a, b, c))\n',
    javascript: 'const [a, b, c] = require("fs").readFileSync(0, "utf8").trim().split(" ").map(Number);\nconsole.log(Math.max(a, b, c));\n',
    c: '#include <stdio.h>\n\nint main() {\n    int a, b, c;\n    scanf("%d %d %d", &a, &b, &c);\n    int max = a;\n    if (b > max) max = b;\n    if (c > max) max = c;\n    printf("%d\\n", max);\n    return 0;\n}\n',
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b, c;\n    cin >> a >> b >> c;\n    int mx = max({a, b, c});\n    cout << mx << endl;\n    return 0;\n}\n',
  },
  factorial: {
    python: 'n = int(input())\nresult = 1\nfor i in range(2, n + 1):\n    result *= i\nprint(result)\n',
    javascript: 'const n = Number(require("fs").readFileSync(0, "utf8").trim());\nlet result = 1;\nfor (let i = 2; i <= n; i++) result *= i;\nconsole.log(result);\n',
    c: '#include <stdio.h>\n\nint main() {\n    int n;\n    scanf("%d", &n);\n    long long result = 1;\n    for (int i = 2; i <= n; i++) result *= i;\n    printf("%lld\\n", result);\n    return 0;\n}\n',
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    long long result = 1;\n    for (int i = 2; i <= n; i++) result *= i;\n    cout << result << endl;\n    return 0;\n}\n',
  },
  reverseString: {
    python: 's = input()\nprint(s[::-1])\n',
    javascript: 'const s = require("fs").readFileSync(0, "utf8").trim();\nconsole.log(s.split("").reverse().join(""));\n',
    c: '#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[1000];\n    scanf("%s", s);\n    int len = strlen(s);\n    for (int i = len - 1; i >= 0; i--) putchar(s[i]);\n    putchar(\'\\n\');\n    return 0;\n}\n',
    cpp: '#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    string s;\n    cin >> s;\n    reverse(s.begin(), s.end());\n    cout << s << endl;\n    return 0;\n}\n',
  },
  palindrome: {
    python: 's = input()\nprint("Yes" if s == s[::-1] else "No")\n',
    javascript: 'const s = require("fs").readFileSync(0, "utf8").trim();\nconsole.log(s === s.split("").reverse().join("") ? "Yes" : "No");\n',
    c: '#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[1000];\n    scanf("%s", s);\n    int len = strlen(s);\n    int ok = 1;\n    for (int i = 0; i < len / 2; i++)\n        if (s[i] != s[len - 1 - i]) { ok = 0; break; }\n    printf("%s\\n", ok ? "Yes" : "No");\n    return 0;\n}\n',
    cpp: '#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    cin >> s;\n    string r = s;\n    reverse(r.begin(), r.end());\n    cout << (s == r ? "Yes" : "No") << endl;\n    return 0;\n}\n',
  },
  countVowels: {
    python: 's = input().lower()\nvowels = "aeiou"\nprint(sum(1 for c in s if c in vowels))\n',
    javascript: 'const s = require("fs").readFileSync(0, "utf8").trim().toLowerCase();\nconst vowels = "aeiou";\nconsole.log([...s].filter(c => vowels.includes(c)).length);\n',
    c: '#include <stdio.h>\n#include <string.h>\n\nint is_vowel(char c) {\n    c = tolower(c);\n    return c == \'a\' || c == \'e\' || c == \'i\' || c == \'o\' || c == \'u\';\n}\n\nint main() {\n    char s[1000];\n    scanf("%[^\\n]", s);\n    int count = 0;\n    for (int i = 0; s[i]; i++) if (is_vowel(s[i])) count++;\n    printf("%d\\n", count);\n    return 0;\n}\n',
    cpp: '#include <iostream>\n#include <string>\nusing namespace std;\n\nbool isVowel(char c) {\n    c = tolower(c);\n    return c == \'a\' || c == \'e\' || c == \'i\' || c == \'o\' || c == \'u\';\n}\n\nint main() {\n    string s;\n    getline(cin, s);\n    int count = 0;\n    for (char c : s) if (isVowel(c)) count++;\n    cout << count << endl;\n    return 0;\n}\n',
  },
  arraySum: {
    python: 'n = int(input())\narr = list(map(int, input().split()))\nprint(sum(arr))\n',
    javascript: 'const n = Number(require("fs").readFileSync(0, "utf8").trim().split("\\n")[0]);\nconst arr = require("fs").readFileSync(0, "utf8").trim().split("\\n")[1].split(" ").map(Number);\nconsole.log(arr.reduce((a, b) => a + b, 0));\n',
    c: '#include <stdio.h>\n\nint main() {\n    int n;\n    scanf("%d", &n);\n    int sum = 0, x;\n    for (int i = 0; i < n; i++) { scanf("%d", &x); sum += x; }\n    printf("%d\\n", sum);\n    return 0;\n}\n',
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int sum = 0, x;\n    for (int i = 0; i < n; i++) { cin >> x; sum += x; }\n    cout << sum << endl;\n    return 0;\n}\n',
  },
  arrayMax: {
    python: 'n = int(input())\narr = list(map(int, input().split()))\nprint(max(arr))\n',
    javascript: 'const lines = require("fs").readFileSync(0, "utf8").trim().split("\\n");\nconst arr = lines[1].split(" ").map(Number);\nconsole.log(Math.max(...arr));\n',
    c: '#include <stdio.h>\n\nint main() {\n    int n;\n    scanf("%d", &n);\n    int max = -2147483648, x;\n    for (int i = 0; i < n; i++) { scanf("%d", &x); if (x > max) max = x; }\n    printf("%d\\n", max);\n    return 0;\n}\n',
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int mx = -2147483648, x;\n    for (int i = 0; i < n; i++) { cin >> x; if (x > mx) mx = x; }\n    cout << mx << endl;\n    return 0;\n}\n',
  },
  fizzbuzz: {
    python: 'n = int(input())\nfor i in range(1, n + 1):\n    if i % 15 == 0: print("FizzBuzz")\n    elif i % 3 == 0: print("Fizz")\n    elif i % 5 == 0: print("Buzz")\n    else: print(i)\n',
    javascript: 'const n = Number(require("fs").readFileSync(0, "utf8").trim());\nfor (let i = 1; i <= n; i++) {\n  if (i % 15 === 0) console.log("FizzBuzz");\n  else if (i % 3 === 0) console.log("Fizz");\n  else if (i % 5 === 0) console.log("Buzz");\n  else console.log(i);\n}\n',
    c: '#include <stdio.h>\n\nint main() {\n    int n;\n    scanf("%d", &n);\n    for (int i = 1; i <= n; i++) {\n        if (i % 15 == 0) printf("FizzBuzz\\n");\n        else if (i % 3 == 0) printf("Fizz\\n");\n        else if (i % 5 == 0) printf("Buzz\\n");\n        else printf("%d\\n", i);\n    }\n    return 0;\n}\n',
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 1; i <= n; i++) {\n        if (i % 15 == 0) cout << "FizzBuzz" << endl;\n        else if (i % 3 == 0) cout << "Fizz" << endl;\n        else if (i % 5 == 0) cout << "Buzz" << endl;\n        else cout << i << endl;\n    }\n    return 0;\n}\n',
  },
  fibonacci: {
    python: 'n = int(input())\na, b = 0, 1\nfor _ in range(n):\n    print(a, end=" ")\n    a, b = b, a + b\nprint()\n',
    javascript: 'const n = Number(require("fs").readFileSync(0, "utf8").trim());\nlet a = 0, b = 1;\nconst out = [];\nfor (let i = 0; i < n; i++) { out.push(a); [a, b] = [b, a + b]; }\nconsole.log(out.join(" "));\n',
    c: '#include <stdio.h>\n\nint main() {\n    int n;\n    scanf("%d", &n);\n    long long a = 0, b = 1;\n    for (int i = 0; i < n; i++) {\n        printf("%lld", a);\n        if (i < n - 1) printf(" ");\n        long long t = a + b; a = b; b = t;\n    }\n    printf("\\n");\n    return 0;\n}\n',
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    long long a = 0, b = 1;\n    for (int i = 0; i < n; i++) {\n        cout << a;\n        if (i < n - 1) cout << " ";\n        long long t = a + b; a = b; b = t;\n    }\n    cout << endl;\n    return 0;\n}\n',
  },
  gcd: {
    python: 'a, b = map(int, input().split())\nwhile b:\n    a, b = b, a % b\nprint(a)\n',
    javascript: 'let [a, b] = require("fs").readFileSync(0, "utf8").trim().split(" ").map(Number);\nwhile (b !== 0) { [a, b] = [b, a % b]; }\nconsole.log(a);\n',
    c: '#include <stdio.h>\n\nint main() {\n    int a, b;\n    scanf("%d %d", &a, &b);\n    while (b != 0) { int t = b; b = a % b; a = t; }\n    printf("%d\\n", a);\n    return 0;\n}\n',
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    while (b != 0) { int t = b; b = a % b; a = t; }\n    cout << a << endl;\n    return 0;\n}\n',
  },
  linearSearch: {
    python: 'n, target = input().split()\narr = list(map(int, input().split()))\ntarget = int(target)\nidx = -1\nfor i, v in enumerate(arr):\n    if v == target:\n        idx = i\n        break\nprint(idx)\n',
    javascript: 'const lines = require("fs").readFileSync(0, "utf8").trim().split("\\n");\nconst n = Number(lines[0].split(" ")[0]);\nconst target = Number(lines[0].split(" ")[1]);\nconst arr = lines[1].split(" ").map(Number);\nconst idx = arr.indexOf(target);\nconsole.log(idx);\n',
    c: '#include <stdio.h>\n\nint main() {\n    int n, target;\n    scanf("%d %d", &n, &target);\n    int arr[1000];\n    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);\n    int idx = -1;\n    for (int i = 0; i < n; i++) if (arr[i] == target) { idx = i; break; }\n    printf("%d\\n", idx);\n    return 0;\n}\n',
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n, target;\n    cin >> n >> target;\n    int arr[1000];\n    for (int i = 0; i < n; i++) cin >> arr[i];\n    int idx = -1;\n    for (int i = 0; i < n; i++) if (arr[i] == target) { idx = i; break; }\n    cout << idx << endl;\n    return 0;\n}\n',
  },
  bubbleSort: {
    python: 'n = int(input())\narr = list(map(int, input().split()))\nfor i in range(n):\n    for j in range(0, n - i - 1):\n        if arr[j] > arr[j + 1]:\n            arr[j], arr[j + 1] = arr[j + 1], arr[j]\nprint(*arr)\n',
    javascript: 'const lines = require("fs").readFileSync(0, "utf8").trim().split("\\n");\nconst n = Number(lines[0]);\nconst arr = lines[1].split(" ").map(Number);\nfor (let i = 0; i < n; i++)\n  for (let j = 0; j < n - i - 1; j++)\n    if (arr[j] > arr[j + 1]) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\nconsole.log(arr.join(" "));\n',
    c: '#include <stdio.h>\n\nint main() {\n    int n;\n    scanf("%d", &n);\n    int arr[1000];\n    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);\n    for (int i = 0; i < n; i++)\n        for (int j = 0; j < n - i - 1; j++)\n            if (arr[j] > arr[j + 1]) { int t = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = t; }\n    for (int i = 0; i < n; i++) { printf("%d", arr[i]); if (i < n - 1) printf(" "); }\n    printf("\\n");\n    return 0;\n}\n',
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int arr[1000];\n    for (int i = 0; i < n; i++) cin >> arr[i];\n    for (int i = 0; i < n; i++)\n        for (int j = 0; j < n - i - 1; j++)\n            if (arr[j] > arr[j + 1]) { int t = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = t; }\n    for (int i = 0; i < n; i++) { cout << arr[i]; if (i < n - 1) cout << " "; }\n    cout << endl;\n    return 0;\n}\n',
  },
  binarySearch: {
    python: 'n = int(input())\narr = list(map(int, input().split()))\ntarget = int(input())\nlo, hi = 0, n - 1\nidx = -1\nwhile lo <= hi:\n    mid = (lo + hi) // 2\n    if arr[mid] == target:\n        idx = mid\n        break\n    elif arr[mid] < target:\n        lo = mid + 1\n    else:\n        hi = mid - 1\nprint(idx)\n',
    javascript: 'const lines = require("fs").readFileSync(0, "utf8").trim().split("\\n");\nconst n = Number(lines[0]);\nconst arr = lines[1].split(" ").map(Number);\nconst target = Number(lines[2]);\nlet lo = 0, hi = n - 1, idx = -1;\nwhile (lo <= hi) {\n  const mid = Math.floor((lo + hi) / 2);\n  if (arr[mid] === target) { idx = mid; break; }\n  else if (arr[mid] < target) lo = mid + 1;\n  else hi = mid - 1;\n}\nconsole.log(idx);\n',
    c: '#include <stdio.h>\n\nint main() {\n    int n;\n    scanf("%d", &n);\n    int arr[1000];\n    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);\n    int target;\n    scanf("%d", &target);\n    int lo = 0, hi = n - 1, idx = -1;\n    while (lo <= hi) {\n        int mid = (lo + hi) / 2;\n        if (arr[mid] == target) { idx = mid; break; }\n        else if (arr[mid] < target) lo = mid + 1;\n        else hi = mid - 1;\n    }\n    printf("%d\\n", idx);\n    return 0;\n}\n',
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int arr[1000];\n    for (int i = 0; i < n; i++) cin >> arr[i];\n    int target;\n    cin >> target;\n    int lo = 0, hi = n - 1, idx = -1;\n    while (lo <= hi) {\n        int mid = (lo + hi) / 2;\n        if (arr[mid] == target) { idx = mid; break; }\n        else if (arr[mid] < target) lo = mid + 1;\n        else hi = mid - 1;\n    }\n    cout << idx << endl;\n    return 0;\n}\n',
  },
};

const ALL_LANGS: LanguageId[] = ['c', 'cpp', 'python', 'javascript'];

function p(
  id: string,
  title: string,
  difficulty: Difficulty,
  topicLang: LanguageId,
  topicTitle: string,
  description: string,
  inputFormat: string,
  outputFormat: string,
  examples: { input: string; output: string; explanation?: string }[],
  constraints: string,
  hints: string[],
  starterKey: keyof typeof starter,
  languages: LanguageId[] = ALL_LANGS,
  estimatedXp = 10
): Problem {
  return {
    id,
    title,
    slug: id,
    difficulty,
    languageIds: languages,
    topicId: topicIdFor(topicLang, topicTitle),
    description,
    inputFormat,
    outputFormat,
    examples,
    constraints,
    hints,
    starterCode: starter[starterKey] as Problem['starterCode'],
    estimatedXp,
  };
}

export const PROBLEMS: Problem[] = [
  p('sum-two-numbers', 'Sum of Two Numbers', 'Easy', 'python', 'Variables',
    'Given two integers **a** and **b**, return their sum.\n\nThis is the classic first program — it teaches you how to read input, perform a calculation, and print output.',
    'A single line containing two integers **a** and **b** separated by a space.',
    'A single integer — the sum of a and b.',
    [{ input: '3 5', output: '8', explanation: '3 + 5 = 8' }, { input: '-1 7', output: '6' }],
    '-10^9 <= a, b <= 10^9',
    ['Use the addition operator (+).', 'Read both numbers from a single line of input.'],
    'sumTwo', ALL_LANGS, 10),

  p('greet-user', 'Greet the User', 'Easy', 'python', 'Variables',
    'Given a name as input, print a personalized greeting.\n\nThis problem practices string variables and output formatting.',
    'A single line containing a name (one word, no spaces).',
    'A single line: `Hello, <name>!`',
    [{ input: 'Alice', output: 'Hello, Alice!' }, { input: 'Bob', output: 'Hello, Bob!' }],
    '1 <= length of name <= 100',
    ['Use string concatenation or formatting to build the greeting.'],
    'greet', ALL_LANGS, 10),

  p('even-or-odd', 'Even or Odd', 'Easy', 'python', 'Conditional Statements',
    'Given an integer, determine whether it is even or odd.\n\nPractice using the modulo operator and a simple if/else branch.',
    'A single integer **n**.',
    'Print `Even` if n is even, otherwise print `Odd`.',
    [{ input: '4', output: 'Even' }, { input: '7', output: 'Odd' }],
    '-10^9 <= n <= 10^9',
    ['A number is even when n % 2 equals 0.'],
    'evenOdd', ALL_LANGS, 10),

  p('max-of-three', 'Maximum of Three', 'Easy', 'python', 'Conditional Statements',
    'Given three integers, print the largest one.\n\nThis practices comparison operators and nested conditionals (or a built-in max function).',
    'A single line with three integers separated by spaces.',
    'A single integer — the maximum of the three.',
    [{ input: '3 9 5', output: '9' }, { input: '-2 -5 -1', output: '-1' }],
    '-10^9 <= a, b, c <= 10^9',
    ['You can use a built-in max() function or compare with if statements.'],
    'maxOfThree', ALL_LANGS, 15),

  p('fizzbuzz', 'FizzBuzz', 'Easy', 'python', 'Loops',
    'Print the numbers from 1 to n. But for multiples of 3 print `Fizz` instead of the number, for multiples of 5 print `Buzz`, and for multiples of both 3 and 5 print `FizzBuzz`.\n\nThis is the most classic beginner interview question.',
    'A single integer **n**.',
    'n lines — each either a number, `Fizz`, `Buzz`, or `FizzBuzz`.',
    [{ input: '15', output: '1\\n2\\nFizz\\n4\\nBuzz\\nFizz\\n7\\n8\\nFizz\\nBuzz\\n11\\nFizz\\n13\\n14\\nFizzBuzz' }],
    '1 <= n <= 10^4',
    ['Check divisibility by 15 first (both 3 and 5), then by 3, then by 5.'],
    'fizzbuzz', ALL_LANGS, 20),

  p('factorial', 'Factorial', 'Easy', 'python', 'Loops',
    'Compute n! = n × (n-1) × ... × 1 using a loop.\n\nPractice iterative accumulation and watch out for large results.',
    'A single integer **n**.',
    'A single integer — n!',
    [{ input: '5', output: '120', explanation: '5 × 4 × 3 × 2 × 1 = 120' }, { input: '0', output: '1' }],
    '0 <= n <= 20',
    ['Start a result variable at 1 and multiply by each number from 2 to n.', '0! is defined as 1.'],
    'factorial', ALL_LANGS, 15),

  p('fibonacci-sequence', 'Fibonacci Sequence', 'Medium', 'python', 'Loops',
    'Print the first n numbers of the Fibonacci sequence.\n\nThe sequence starts 0, 1, 1, 2, 3, 5, 8, ... where each term is the sum of the previous two.',
    'A single integer **n**.',
    'A single line with n space-separated Fibonacci numbers.',
    [{ input: '7', output: '0 1 1 2 3 5 8' }, { input: '1', output: '0' }],
    '1 <= n <= 50',
    ['Keep two variables for the previous two terms and update them each iteration.'],
    'fibonacci', ALL_LANGS, 25),

  p('reverse-string', 'Reverse a String', 'Easy', 'python', 'Strings',
    'Given a string, print it reversed.\n\nPractice indexing and string slicing or a reverse utility.',
    'A single string (no spaces).',
    'The reversed string.',
    [{ input: 'hello', output: 'olleh' }, { input: 'CodeMentor', output: 'rotnemedoC' }],
    '1 <= length <= 1000',
    ['In Python, s[::-1] reverses a string. In other languages, iterate from the end.'],
    'reverseString', ALL_LANGS, 10),

  p('check-palindrome', 'Check Palindrome', 'Easy', 'python', 'Strings',
    'Determine whether a given string reads the same forwards and backwards.\n\nPractice string comparison and reversal.',
    'A single string (no spaces).',
    'Print `Yes` if the string is a palindrome, otherwise `No`.',
    [{ input: 'racecar', output: 'Yes' }, { input: 'hello', output: 'No' }],
    '1 <= length <= 1000',
    ['Compare the string with its reverse.'],
    'palindrome', ALL_LANGS, 15),

  p('count-vowels', 'Count Vowels', 'Easy', 'python', 'Strings',
    'Count the number of vowels (a, e, i, o, u) in a given string, case-insensitively.\n\nPractice string iteration and character matching.',
    'A single line containing a string (may contain spaces).',
    'A single integer — the number of vowels.',
    [{ input: 'Hello World', output: '3' }, { input: 'CodeMentor', output: '4' }],
    '1 <= length <= 1000',
    ['Convert the string to lowercase first so you only check 5 characters.'],
    'countVowels', ALL_LANGS, 15),

  p('array-sum', 'Array Sum', 'Easy', 'python', 'Arrays',
    'Given an array of n integers, print their sum.\n\nPractice reading arrays and accumulation.',
    'First line: integer n. Second line: n space-separated integers.',
    'A single integer — the sum of the array.',
    [{ input: '5\\n1 2 3 4 5', output: '15' }, { input: '3\\n-1 0 1', output: '0' }],
    '1 <= n <= 10^5, -10^4 <= arr[i] <= 10^4',
    ['Use a loop to add each element to a running total.'],
    'arraySum', ALL_LANGS, 15),

  p('array-max', 'Find Maximum in Array', 'Easy', 'python', 'Arrays',
    'Find the largest element in an array of integers.\n\nPractice array traversal and tracking an extreme value.',
    'First line: integer n. Second line: n space-separated integers.',
    'A single integer — the maximum value.',
    [{ input: '5\\n3 7 2 9 4', output: '9' }, { input: '4\\n-5 -1 -9 -3', output: '-1' }],
    '1 <= n <= 10^5, -10^9 <= arr[i] <= 10^9',
    ['Initialize the max with the first element (or a very small number) and update as you iterate.'],
    'arrayMax', ALL_LANGS, 15),

  p('gcd-of-two', 'GCD of Two Numbers', 'Medium', 'python', 'Functions',
    'Compute the greatest common divisor (GCD) of two integers using the Euclidean algorithm.\n\nThis problem practices writing a reusable function and the modulo operation.',
    'A single line with two integers a and b.',
    'A single integer — the GCD of a and b.',
    [{ input: '12 18', output: '6' }, { input: '7 13', output: '1' }],
    '1 <= a, b <= 10^9',
    ['The Euclidean algorithm: while b != 0, replace (a, b) with (b, a % b).', 'Consider wrapping the logic in a function.'],
    'gcd', ALL_LANGS, 20),

  p('linear-search', 'Linear Search', 'Easy', 'python', 'Arrays',
    'Given an array and a target value, find the index of the target. If not found, print -1.\n\nPractice basic search with a loop.',
    'First line: n and target separated by a space. Second line: n space-separated integers.',
    'A single integer — the 0-based index of target, or -1.',
    [{ input: '5 3\\n1 2 3 4 5', output: '2' }, { input: '4 9\\n1 2 3 4', output: '-1' }],
    '1 <= n <= 10^5, -10^9 <= arr[i], target <= 10^9',
    ['Loop through the array and return the index on the first match.'],
    'linearSearch', ALL_LANGS, 15),

  p('bubble-sort', 'Bubble Sort', 'Medium', 'python', 'Algorithms',
    'Sort an array of integers in ascending order using the bubble sort algorithm.\n\nPractice nested loops and in-place swapping.',
    'First line: integer n. Second line: n space-separated integers.',
    'A single line with the n integers sorted ascending.',
    [{ input: '5\\n5 2 9 1 7', output: '1 2 5 7 9' }, { input: '3\\n3 2 1', output: '1 2 3' }],
    '1 <= n <= 1000, -10^4 <= arr[i] <= 10^4',
    ['Compare adjacent pairs and swap if out of order; repeat n times.', 'The largest unsorted element "bubbles" to the end each pass.'],
    'bubbleSort', ALL_LANGS, 25),

  p('binary-search', 'Binary Search', 'Hard', 'python', 'Algorithms',
    'Given a **sorted** array and a target, find the index of the target using binary search. If not found, print -1.\n\nPractice the divide-and-conquer search with O(log n) complexity.',
    'First line: integer n. Second line: n space-separated integers in ascending order. Third line: target.',
    'A single integer — the 0-based index of target, or -1.',
    [{ input: '5\\n1 3 5 7 9\\n5', output: '2' }, { input: '5\\n1 3 5 7 9\\n4', output: '-1' }],
    '1 <= n <= 10^6, -10^9 <= arr[i], target <= 10^9 (array is sorted ascending)',
    ['Maintain lo and hi pointers; compute mid = (lo + hi) / 2 each step.', 'If arr[mid] < target, search the right half; if greater, search the left.'],
    'binarySearch', ALL_LANGS, 35),
];

export const PROBLEM_MAP: Record<string, Problem> = PROBLEMS.reduce(
  (acc, p) => ({ ...acc, [p.id]: p }),
  {} as Record<string, Problem>
);

export function problemsForTopic(topicId: string): Problem[] {
  return PROBLEMS.filter((p) => p.topicId === topicId);
}

export function problemsForLanguage(lang: LanguageId): Problem[] {
  return PROBLEMS.filter((p) => p.languageIds.includes(lang));
}
