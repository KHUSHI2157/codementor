import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { LinkButton } from '@/components/ui/Button';

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-4 text-center">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative">
        <Logo size="lg" />
        <p className="mt-8 text-7xl font-extrabold text-gradient">404</p>
        <h1 className="mt-4 text-2xl font-bold text-white">Page not found</h1>
        <p className="mt-2 max-w-md text-gray-400">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <LinkButton to="/" size="md">
            <Home className="h-4 w-4" /> Back home
          </LinkButton>
          <Link to="/problems" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Browse problems
          </Link>
        </div>
      </div>
    </div>
  );
}
