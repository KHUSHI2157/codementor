import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X, CheckCircle2, Circle } from 'lucide-react';
import { AppLayout } from '@/components/AppLayout';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/ui/Card';
import { DifficultyBadge, SolvedBadge } from '@/components/ui/Badges';
import { LANGUAGES } from '@/data/languages';
import { TOPICS } from '@/data/topics';
import { PROBLEMS } from '@/data/problems';
import { useProgress } from '@/context/ProgressContext';
import type { Difficulty, LanguageId } from '@/types';
import { Link } from 'react-router-dom';

const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard'];

type Filter = 'all' | Difficulty;
type LangFilter = 'all' | LanguageId;

export function ProblemsPage() {
  const { isSolved } = useProgress();
  const [query, setQuery] = useState('');
  const [diffFilter, setDiffFilter] = useState<Filter>('all');
  const [langFilter, setLangFilter] = useState<LangFilter>('all');
  const [topicFilter, setTopicFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'solved' | 'unsolved'>('all');

  const availableTopics = useMemo(() => {
    return TOPICS.filter((t) => (langFilter === 'all' ? true : t.languageId === langFilter));
  }, [langFilter]);

  const filtered = useMemo(() => {
    return PROBLEMS.filter((p) => {
      if (query && !p.title.toLowerCase().includes(query.toLowerCase())) return false;
      if (diffFilter !== 'all' && p.difficulty !== diffFilter) return false;
      if (langFilter !== 'all' && !p.languageIds.includes(langFilter)) return false;
      if (topicFilter !== 'all' && p.topicId !== topicFilter) return false;
      if (statusFilter === 'solved' && !isSolved(p.id)) return false;
      if (statusFilter === 'unsolved' && isSolved(p.id)) return false;
      return true;
    });
  }, [query, diffFilter, langFilter, topicFilter, statusFilter, isSolved]);

  const hasFilters = query || diffFilter !== 'all' || langFilter !== 'all' || topicFilter !== 'all' || statusFilter !== 'all';

  function clearFilters() {
    setQuery('');
    setDiffFilter('all');
    setLangFilter('all');
    setTopicFilter('all');
    setStatusFilter('all');
  }

  return (
    <AppLayout>
      <PageHeader
        title="Problems"
        subtitle={`${PROBLEMS.length} coding problems across ${LANGUAGES.length} languages. Search, filter, and start solving.`}
      />

      {/* Filter bar */}
      <Card className="mb-6 p-4">
        <div className="flex flex-col gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search problems by title..."
              className="h-10 w-full rounded-lg border border-surface-border bg-surface pl-9 pr-4 text-sm text-white placeholder-gray-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>

          {/* Filters */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {/* Difficulty */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-500">Difficulty</label>
              <select
                value={diffFilter}
                onChange={(e) => setDiffFilter(e.target.value as Filter)}
                className="h-9 w-full rounded-lg border border-surface-border bg-surface px-3 text-sm text-white focus:border-brand-500 focus:outline-none"
              >
                <option value="all">All difficulties</option>
                {DIFFICULTIES.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Language */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-500">Language</label>
              <select
                value={langFilter}
                onChange={(e) => {
                  setLangFilter(e.target.value as LangFilter);
                  setTopicFilter('all');
                }}
                className="h-9 w-full rounded-lg border border-surface-border bg-surface px-3 text-sm text-white focus:border-brand-500 focus:outline-none"
              >
                <option value="all">All languages</option>
                {LANGUAGES.map((l) => (
                  <option key={l.id} value={l.id}>{l.name}</option>
                ))}
              </select>
            </div>

            {/* Topic */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-500">Topic</label>
              <select
                value={topicFilter}
                onChange={(e) => setTopicFilter(e.target.value)}
                className="h-9 w-full rounded-lg border border-surface-border bg-surface px-3 text-sm text-white focus:border-brand-500 focus:outline-none"
              >
                <option value="all">All topics</option>
                {availableTopics.map((t) => (
                  <option key={t.id} value={t.id}>{t.title}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-500">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                className="h-9 w-full rounded-lg border border-surface-border bg-surface px-3 text-sm text-white focus:border-brand-500 focus:outline-none"
              >
                <option value="all">All</option>
                <option value="solved">Solved</option>
                <option value="unsolved">Unsolved</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Results header */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-400">
          {filtered.length} {filtered.length === 1 ? 'problem' : 'problems'} found
        </p>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white"
          >
            <X className="h-3.5 w-3.5" /> Clear filters
          </button>
        )}
      </div>

      {/* Problem list */}
      {filtered.length === 0 ? (
        <Card className="p-12 text-center">
          <SlidersHorizontal className="mx-auto h-8 w-8 text-gray-600" />
          <p className="mt-3 text-gray-400">No problems match your filters.</p>
          <button onClick={clearFilters} className="mt-3 text-sm text-brand-400 hover:text-brand-300">
            Clear all filters
          </button>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((p) => {
            const solved = isSolved(p.id);
            const topic = TOPICS.find((t) => t.id === p.topicId);
            return (
              <Link
                key={p.id}
                to={`/problems/${p.id}`}
                className="group block rounded-xl border border-surface-border bg-surface-raised p-4 transition-all duration-200 hover:border-brand-500/50 hover:bg-surface-overlay"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-start gap-3">
                    {solved ? (
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-success-500" />
                    ) : (
                      <Circle className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-600" />
                    )}
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-100 group-hover:text-white">{p.title}</h3>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2">
                        <DifficultyBadge difficulty={p.difficulty} />
                        <SolvedBadge solved={solved} />
                        {topic && (
                          <span className="rounded-md border border-surface-border bg-surface-subtle px-2 py-0.5 text-xs text-gray-400">
                            {topic.title}
                          </span>
                        )}
                        <span className="text-xs text-gray-500">+{p.estimatedXp} XP</span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden flex-shrink-0 items-center gap-1.5 sm:flex">
                    {p.languageIds.map((lid) => {
                      const lang = LANGUAGES.find((l) => l.id === lid);
                      return (
                        <span key={lid} className={`text-xs font-medium ${lang?.accent}`}>
                          {lang?.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </AppLayout>
  );
}
