import { strings } from '../../config/strings';
import { orderTotal } from '../../utils/aggregate';

export default function PerPersonBreakdown({ orders, currency }) {
  const sorted = [...orders].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      <p className="border-b border-line px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted">
        {strings.perPersonBreakdown}
      </p>
      {sorted.map((order) => (
        <div key={order.employeeId} className="border-b border-line px-4 py-3 last:border-b-0">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-ink">{order.name}</p>
            <p className="font-mono text-sm font-semibold text-brand-ink tabular-nums">
              {currency}{orderTotal(order.items)}
            </p>
          </div>
          <p className="font-mono text-xs text-muted tabular-nums">
            {order.items.map((item) => `${item.name} ×${item.qty}`).join(', ')}
          </p>
        </div>
      ))}
    </div>
  );
}
