import { strings } from '../../config/strings';

export default function ShoppingListTable({ config, summary }) {
  const { lines, totalItems, totalCost, hasUnpriced } = summary;

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
      <p className="border-b border-line px-4 py-3 font-display text-base font-bold text-ink">
        {strings.shoppingList}
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs font-semibold uppercase tracking-wide text-muted">
              <th className="px-4 py-2">{strings.itemName}</th>
              <th className="px-4 py-2 text-right">{strings.quantity}</th>
              <th className="px-4 py-2 text-right">{strings.unitPrice}</th>
              <th className="px-4 py-2 text-right">{strings.lineTotal}</th>
              <th className="px-4 py-2">{strings.orderedBy}</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line) => (
              <tr key={line.name} className="border-b border-line last:border-b-0">
                <td className="px-4 py-3 text-ink">{line.name}</td>
                <td className="px-4 py-3 text-right font-mono font-semibold text-amber tabular-nums">{line.qty}</td>
                <td className="px-4 py-3 text-right font-mono text-muted tabular-nums">
                  {line.price == null ? '—' : `${config.currency}${line.price}`}
                </td>
                <td className="px-4 py-3 text-right font-mono text-ink tabular-nums">
                  {line.cost == null ? '—' : `${config.currency}${line.cost}`}
                </td>
                <td className="px-4 py-3 text-xs text-muted">{line.orderedBy.join(', ')}</td>
              </tr>
            ))}
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
