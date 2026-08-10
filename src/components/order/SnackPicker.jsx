import { useState } from 'react';
import { strings } from '../../config/strings';

function SnackList({ snacks, currency, onSelect }) {
  return snacks.map((snack) => (
    <button
      key={snack.name}
      type="button"
      onClick={() => onSelect(snack)}
      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm text-ink hover:bg-paper"
    >
      <span className="truncate">{snack.name}</span>
      <span className="font-mono text-xs text-muted tabular-nums">
        {snack.price == null ? '—' : `${currency}${snack.price}`}
      </span>
    </button>
  ));
}

export default function SnackPicker({ snacks, currency, onSelect }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (snack) => {
    onSelect(snack);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-11 items-center gap-1.5 rounded-lg border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-ink hover:bg-paper"
      >
        <span aria-hidden="true">+</span> {strings.addSnack}
      </button>

      {open && (
        <>
          {/* Mobile: full-width bottom sheet anchored to the viewport. */}
          <div className="fixed inset-0 z-20 sm:hidden" onClick={() => setOpen(false)} />
          <div className="fixed inset-x-0 bottom-0 z-30 max-h-[70vh] overflow-y-auto rounded-t-2xl border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] shadow-lg sm:hidden">
            <div className="sticky top-0 flex items-center justify-between border-b border-line bg-surface px-4 py-3">
              <span className="font-display text-sm font-semibold text-ink">{strings.addSnack}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={strings.close}
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted hover:bg-paper"
              >
                ✕
              </button>
            </div>
            <div className="py-1">
              <SnackList snacks={snacks} currency={currency} onSelect={handleSelect} />
            </div>
          </div>

          {/* Desktop: anchored dropdown. */}
          <div className="fixed inset-0 z-10 hidden sm:block" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full z-20 mt-2 hidden max-h-64 w-56 overflow-y-auto rounded-xl border border-line bg-surface py-1 shadow-lg sm:block">
            <SnackList snacks={snacks} currency={currency} onSelect={handleSelect} />
          </div>
        </>
      )}
    </div>
  );
}
