import { strings } from '../../config/strings';
import QuantityStepper from './QuantityStepper';

export default function OrderItemRow({ item, currency, disabled, onChangeQty, onRemove }) {
  const lineTotal = item.price != null ? item.price * item.qty : null;

  return (
    <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 last:border-b-0">
      <div className="min-w-0 flex-1">
        <p className="truncate text-base text-ink">{item.name}</p>
        <p className="font-mono text-sm text-muted tabular-nums">
          {item.price == null ? '—' : strings.priceLine(currency, item.price, lineTotal)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <QuantityStepper label={item.name} value={item.qty} min={1} disabled={disabled} onChange={onChangeQty} />
        <button
          type="button"
          onClick={onRemove}
          disabled={disabled}
          aria-label={strings.removeItem(item.name)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-danger hover:bg-danger/10 disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger"
        >
          <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
            <path
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 5.5h11m-9 0 .6 9.4a1.5 1.5 0 0 0 1.497 1.4h4.806a1.5 1.5 0 0 0 1.496-1.4l.601-9.4M8 5.5V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
