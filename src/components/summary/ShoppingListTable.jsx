import { useState } from 'react';
import { strings } from '../../config/strings';

export default function ShoppingListTable({ config, summary }) {
  const { lines, totalItems, totalCost, hasUnpriced } = summary;
  const [checked, setChecked] = useState(() => new Set());

  const toggle = (name) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
      <p className="border-b border-line px-4 py-3 font-display text-base font-bold text-ink">
        {strings.shoppingList}
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs font-semibold uppercase tracking-wide text-muted">
              <th className="w-10 px-4 py-2" aria-hidden="true" />
              <th className="px-4 py-2">{strings.itemName}</th>
              <th className="px-4 py-2 text-right">{strings.quantity}</th>
              <th className="px-4 py-2 text-right">{strings.unitPrice}</th>
              <th className="px-4 py-2 text-right">{strings.lineTotal}</th>
              <th className="px-4 py-2">{strings.orderedBy}</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line) => {
              const isChecked = checked.has(line.name);
              return (
                <tr key={line.name} className={`border-b border-line last:border-b-0 ${isChecked ? 'opacity-60' : ''}`}>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => toggle(line.name)}
                      aria-pressed={isChecked}
                      aria-label={strings.boughtItem(line.name)}
                      className={`flex h-6 w-6 items-center justify-center rounded-md border text-xs text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                        isChecked ? 'border-brand bg-brand' : 'border-line bg-surface'
                      }`}
                    >
                      {isChecked && '✓'}
                    </button>
                  </td>
                  <td className={`px-4 py-3 text-ink ${isChecked ? 'line-through text-muted' : ''}`}>{line.name}</td>
                  <td className="px-4 py-3 text-right font-mono font-semibold text-amber tabular-nums">{line.qty}</td>
                  <td className="px-4 py-3 text-right font-mono text-muted tabular-nums">
                    {line.price == null ? '—' : `${config.currency}${line.price}`}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-ink tabular-nums">
                    {line.cost == null ? '—' : `${config.currency}${line.cost}`}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted">{line.orderedBy.join(', ')}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t-2 border-dashed border-line px-4 py-4">
        <div className="text-sm text-muted">
          {strings.quantity}: <span className="font-mono font-semibold text-ink tabular-nums">{totalItems}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-display font-semibold text-ink">{strings.grandTotal}</span>
          <span className="font-mono text-2xl font-bold text-brand tabular-nums">
            {config.currency}{totalCost}
          </span>
        </div>
      </div>
      {hasUnpriced && <p className="px-4 pb-3 text-xs text-muted">{strings.someUnpriced}</p>}
    </div>
  );
}
