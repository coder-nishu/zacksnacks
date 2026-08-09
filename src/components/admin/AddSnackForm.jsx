import { useState } from 'react';
import { strings } from '../../config/strings';
import { addSnack, removeSnack } from '../../services/adminStore';
import { useConfig } from '../../hooks/useConfig';

function TrashIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 5.5h11m-9 0 .6 9.4a1.5 1.5 0 0 0 1.497 1.4h4.806a1.5 1.5 0 0 0 1.496-1.4l.601-9.4M8 5.5V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1.5"
      />
    </svg>
  );
}

export default function AddSnackForm() {
  const { config } = useConfig();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    const numericPrice = Number(price);
    addSnack({ name: trimmed, price: Number.isFinite(numericPrice) && price !== '' ? numericPrice : null });
    setName('');
    setPrice('');
  };

  return (
    <div className="space-y-2">
      <form onSubmit={handleSubmit} className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">{strings.addFoodItem}</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={strings.newItemName}
            className="min-w-0 flex-1 rounded-lg border border-line bg-paper px-3 py-2 text-base text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          />
          <input
            type="number"
            min="0"
            inputMode="decimal"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder={strings.newItemPrice}
            className="w-20 rounded-lg border border-line bg-paper px-2 py-2 font-mono text-sm text-ink tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          />
          <button
            type="submit"
            disabled={!name.trim()}
            className="rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white hover:bg-brand-ink disabled:opacity-40"
          >
            {strings.add}
          </button>
        </div>
      </form>

      {config.snacks.length > 0 && (
        <div className="max-h-40 overflow-y-auto rounded-lg border border-line">
          {config.snacks.map((snack) => (
            <div
              key={snack.id}
              className="flex items-center justify-between gap-2 border-b border-line px-3 py-2 text-sm last:border-b-0"
            >
              <span className="truncate text-ink">{snack.name}</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted tabular-nums">
                  {snack.price == null ? '—' : `${config.currency}${snack.price}`}
                </span>
                <button
                  type="button"
                  onClick={() => removeSnack(snack.id)}
                  aria-label={strings.removeItem(snack.name)}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded text-danger hover:bg-danger/10"
                >
                  <TrashIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
