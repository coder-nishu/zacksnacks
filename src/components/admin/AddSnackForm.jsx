import { useState } from 'react';
import { strings } from '../../config/strings';
import { addCustomSnack } from '../../services/adminStore';

export default function AddSnackForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    const numericPrice = Number(price);
    addCustomSnack({ name: trimmed, price: Number.isFinite(numericPrice) && price !== '' ? numericPrice : null });
    setName('');
    setPrice('');
  };

  return (
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
  );
}
