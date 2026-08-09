import { useEffect, useRef, useState } from 'react';

export default function QuantityStepper({ label, value, onChange, min = 0, disabled = false }) {
  const [bump, setBump] = useState(false);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    setBump(true);
    const timer = setTimeout(() => setBump(false), 120);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={disabled || value <= min}
        aria-label={`Decrease ${label}`}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-base text-ink disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        −
      </button>
      <span
        key={bump ? 'bump' : 'still'}
        className={`w-7 text-center font-mono text-base font-semibold tabular-nums text-ink ${
          bump ? 'motion-safe:animate-bump' : ''
        }`}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={disabled}
        aria-label={`Increase ${label}`}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-base text-ink disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        +
      </button>
    </div>
  );
}
