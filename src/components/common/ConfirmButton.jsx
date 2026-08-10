import { useEffect, useState } from 'react';

// Generic two-step confirm: first click arms it and shows `confirmLabel`,
// second click (within a few seconds) fires `onConfirm`. Clicking elsewhere times out back to `label`.
export default function ConfirmButton({ label, confirmLabel, onConfirm, className = '', disabled = false }) {
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!armed) return;
    const timer = setTimeout(() => setArmed(false), 4000);
    return () => clearTimeout(timer);
  }, [armed]);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        if (armed) {
          setArmed(false);
          onConfirm();
        } else {
          setArmed(true);
        }
      }}
      className={`${className} disabled:cursor-not-allowed disabled:opacity-40 ${armed ? 'bg-danger text-white' : ''}`}
    >
      {armed ? confirmLabel : label}
    </button>
  );
}
