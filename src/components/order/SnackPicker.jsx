import { useState } from 'react';
import { strings } from '../../config/strings';

export default function SnackPicker({ snacks, currency, onSelect }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-lg border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-ink hover:bg-paper"
      >
        <span aria-hidden="true">+</span> {strings.addSnack}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full z-20 mt-2 max-h-64 w-56 overflow-y-auto rounded-xl border border-line bg-surface py-1 shadow-lg">
            {snacks.map((snack) => (
              <button
                key={snack.name}
                type="button"
                onClick={() => {
                  onSelect(snack);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm text-ink hover:bg-paper"
              >
                <span className="truncate">{snack.name}</span>
                <span className="font-mono text-xs text-muted tabular-nums">
                  {snack.price == null ? '—' : `${currency}${snack.price}`}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
