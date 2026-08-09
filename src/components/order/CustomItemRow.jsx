import { useState } from 'react';
import { strings } from '../../config/strings';

export default function CustomItemRow({ onAdd, onCancel }) {
  const [name, setName] = useState('');
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed || qty < 1) return;
    const numericPrice = Number(price);
    onAdd({ name: trimmed, qty, price: price !== '' && Number.isFinite(numericPrice) ? numericPrice : null });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-center gap-2 rounded-xl border border-dashed border-line bg-paper px-4 py-3"
    >
      <input
        type="text"
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={strings.customName}
        aria-label={strings.customName}
        className="min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 py-2 text-base text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      />
      <input
        type="number"
        min="1"
        inputMode="numeric"
        value={qty}
        onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
        aria-label={strings.customQty}
        className="w-16 rounded-lg border border-line bg-surface px-2 py-2 font-mono text-sm text-ink tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      />
      <input
        type="number"
        min="0"
        inputMode="decimal"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder={strings.customPriceOptional}
        aria-label={strings.customPrice}
        className="w-24 rounded-lg border border-line bg-surface px-2 py-2 font-mono text-sm text-ink tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      />
      <button type="submit" disabled={!name.trim()} className="rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white hover:bg-brand-ink disabled:opacity-40">
        {strings.add}
      </button>
      <button type="button" onClick={onCancel} className="rounded-lg px-3 py-2 text-sm text-muted hover:bg-surface">
        {strings.close}
      </button>
    </form>
  );
}
