import { Link } from 'react-router-dom';
import { strings } from '../../config/strings';
import EmptyState from './EmptyState';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4 py-8">
      <div className="w-full max-w-sm">
        <EmptyState
          icon="🔎"
          title={strings.pageNotFound}
          description={strings.pageNotFoundDescription}
          action={
            <Link
              to="/"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-brand px-5 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              {strings.goHome}
            </Link>
          }
        />
      </div>
    </div>
  );
}
