import { useEffect } from 'react';

export default function Toast({ message, variant = 'success', onDismiss }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onDismiss, variant === 'error' ? 4000 : 2500);
    return () => clearTimeout(timer);
  }, [message, variant, onDismiss]);

  if (!message) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 z-20 flex justify-center px-4 bottom-[calc(6rem+env(safe-area-inset-bottom))] sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))]">
      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-auto rounded-lg px-4 py-2 text-sm font-medium text-white shadow-lg motion-safe:animate-toast-in ${
          variant === 'error' ? 'bg-danger' : 'bg-ink'
        }`}
      >
        {message}
      </div>
    </div>
  );
}
