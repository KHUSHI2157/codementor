import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Play,
  Code2,
  Brain,
  Trophy,
  Target,
  Sparkles,
  CheckCircle2,
  Terminal,
  GraduationCap,
  Lightbulb,
  TrendingUp,
  Github,
  Twitter,
  Linkedin,
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { LinkButton } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { LANGUAGES } from '@/data/languages';
import { PROBLEMS } from '@/data/problems';
import { TOPICS } from '@/data/topics';
import * as LucideIcons from 'lucide-react';

function getIcon(name: string) {
  const Icon = (LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[name];
  return Icon ?? Code2;
}

const FEATURES = [
  {
    icon: GraduationCap,
    title: 'Structured Learning',
    desc: 'Follow a guided path through 12 core topics per language, from variables to algorithms.',
  },
  {
    icon: Terminal,
    title: 'Practice with Real Problems',
    desc: 'Solve realistic coding challenges with starter code in C, C++, Python, and JavaScript.',
  },
  {
    icon: TrendingUp,
    title: 'Track Your Progress',
    desc: 'Earn XP, build streaks, unlock achievements, and watch your skills grow over time.',
  },
  {
    icon: Lightbulb,
    title: "Hints When You're Stuck",
    desc: 'Every problem includes hints and worked examples so you never stay blocked.',
  },
];

const STEPS = [
  { num: '01', title: 'Pick a language', desc: 'Choose from C, C++, Python, or JavaScript to start your journey.' },
  { num: '02', title: 'Learn the topics', desc: 'Work through each concept with focused problems that build on each other.' },
  { num: '03', title: 'Practice & submit', desc: 'Write code in an IDE-style editor, run test cases, and submit solutions.' },
  { num: '04', title: 'Track growth', desc: 'Earn XP, keep your streak alive, and unlock achievements as you improve.' },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-surface text-gray-200">
      {/* Top nav */}
      <header className="sticky top-0 z-40 border-b border-surface-border bg-surface/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#languages" className="hover:text-white transition-colors">Languages</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <Link to="/problems" className="hover:text-white transition-colors">Problems</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="hidden sm:inline text-sm text-gray-400 hover:text-white transition-colors">
              Dashboard
            </Link>
            <LinkButton to="/dashboard" size="sm">
              Start Learning <ArrowRight className="h-4 w-4" />
            </LinkButton>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-surface-border">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/60 to-surface" />
        <div className="absolute -top-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-brand-600/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface-raised px-4 py-1.5 text-xs font-medium text-gray-300 animate-fade-in">
              <Sparkles className="h-3.5 w-3.5 text-brand-400" />
              A beginner-friendly coding platform
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl animate-slide-up">
              Learn. Code. <span className="text-gradient">Improve.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 animate-slide-up" style={{ animationDelay: '80ms' }}>
              CodeMentor is a student-focused platform to learn programming concepts, practice
              real coding problems, and track your progress — across C, C++, Python, and JavaScript.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row animate-slide-up" style={{ animationDelay: '160ms' }}>
              <LinkButton to="/dashboard" size="lg">
                <Play className="h-5 w-5" /> Start Learning
              </LinkButton>
              <LinkButton to="/problems" size="lg" variant="outline">
                <Code2 className="h-5 w-5" /> Explore Problems
              </LinkButton>
            </div>
            <p className="mt-4 text-xs text-gray-500 animate-fade-in" style={{ animationDelay: '240ms' }}>
              No sign-up required to start — {PROBLEMS.length} problems across {LANGUAGES.length} languages
            </p>
          </div>

          {/* Stats strip */}
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4 animate-fade-in" style={{ animationDelay: '320ms' }}>
            {[
              { label: 'Languages', value: LANGUAGES.length, icon: Code2 },
              { label: 'Topics', value: TOPICS.length, icon: Brain },
              { label: 'Problems', value: PROBLEMS.length, icon: Target },
              { label: 'Difficulty levels', value: 3, icon: Trophy },
            ].map(({ label, value, icon: Icon }) => (
              <Card key={label} className="p-5 text-center">
                <Icon className="mx-auto h-6 w-6 text-brand-400" />
                <p className="mt-2 text-2xl font-bold text-white tabular-nums">{value}</p>
                <p className="text-xs text-gray-400">{label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-b border-surface-border py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Everything you need to grow as a programmer
            </h2>
            <p className="mt-4 text-gray-400">
              A focused environment built for students — not a generic tutorial dump.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <Card key={title} interactive className="p-6">
                <div className="rounded-xl bg-brand-600/15 p-3 w-fit">
                  <Icon className="h-6 w-6 text-brand-400" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-gray-400">{desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Languages */}
      <section id="languages" className="border-b border-surface-border py-20 bg-surface-raised/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Start with the language that fits you
            </h2>
            <p className="mt-4 text-gray-400">
              Each language includes {TOPICS.length / LANGUAGES.length} topics and a full set of practice problems.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {LANGUAGES.map((lang) => {
              const Icon = getIcon(lang.icon);
              const langTopics = TOPICS.filter((t) => t.languageId === lang.id);
              const langProblems = PROBLEMS.filter((p) => p.languageIds.includes(lang.id));
              return (
                <Card key={lang.id} interactive className="p-6">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-xl bg-surface-subtle p-3 ${lang.accent}`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{lang.name}</h3>
                      <p className="text-xs text-gray-500">.{lang.fileExtension}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-400">{lang.tagline}</p>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between text-gray-400">
                      <span>Topics</span><span className="text-white font-medium">{langTopics.length}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Problems</span><span className="text-white font-medium">{langProblems.length}</span>
                    </div>
                  </div>
                  <Link
                    to={`/languages/${lang.id}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-400 hover:text-brand-300"
                  >
                    Continue <ArrowRight className="h-4 w-4" />
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-b border-surface-border py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              How it works
            </h2>
            <p className="mt-4 text-gray-400">A clear path from your first line of code to confident problem-solving.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ num, title, desc }) => (
              <div key={num} className="relative">
                <Card className="h-full p-6">
                  <span className="text-3xl font-extrabold text-brand-600/40 tabular-nums">{num}</span>
                  <h3 className="mt-2 text-lg font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm text-gray-400">{desc}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card className="relative overflow-hidden p-10 text-center sm:p-14">
            <div className="absolute -top-20 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-brand-600/20 blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to write your first solution?</h2>
              <p className="mx-auto mt-4 max-w-xl text-gray-400">
                Jump into the dashboard, pick up where you left off, or browse the full problem set.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <LinkButton to="/dashboard" size="lg">
                  Go to Dashboard <ArrowRight className="h-5 w-5" />
                </LinkButton>
                <LinkButton to="/languages" size="lg" variant="outline">
                  Browse Languages
                </LinkButton>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-surface-border bg-surface-raised/40">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <Logo />
              <p className="mt-4 max-w-sm text-sm text-gray-400">
                A beginner-friendly platform to learn programming, practice coding problems, and track your progress.
              </p>
              <div className="mt-4 flex items-center gap-3 text-gray-500">
                <a href="#" className="rounded-lg p-2 hover:bg-surface-subtle hover:text-white transition-colors" aria-label="GitHub"><Github className="h-5 w-5" /></a>
                <a href="#" className="rounded-lg p-2 hover:bg-surface-subtle hover:text-white transition-colors" aria-label="Twitter"><Twitter className="h-5 w-5" /></a>
                <a href="#" className="rounded-lg p-2 hover:bg-surface-subtle hover:text-white transition-colors" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Platform</h4>
              <ul className="mt-3 space-y-2 text-sm text-gray-400">
                <li><Link to="/dashboard" className="hover:text-white">Dashboard</Link></li>
                <li><Link to="/languages" className="hover:text-white">Languages</Link></li>
                <li><Link to="/problems" className="hover:text-white">Problems</Link></li>
                <li><Link to="/progress" className="hover:text-white">Progress</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Languages</h4>
              <ul className="mt-3 space-y-2 text-sm text-gray-400">
                {LANGUAGES.map((l) => (
                  <li key={l.id}><Link to={`/languages/${l.id}`} className="hover:text-white">{l.name}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-surface-border pt-6 text-xs text-gray-500 sm:flex-row">
            <p>© {new Date().getFullYear()} CodeMentor. Learn. Code. Improve.</p>
            <p>Built for students learning to code.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
