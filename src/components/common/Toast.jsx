import { useEffect } from 'react';

export default function Toast({ message, onDismiss }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onDismiss, 2500);
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  if (!message) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-20 flex justify-center px-4 sm:bottom-6">
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-auto rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white shadow-lg motion-safe:animate-toast-in"
      >
        {message}
      </div>
    </div>
  );
}
