import { strings } from '../../config/strings';

export default function OrderStatusSummary({ employees, orders }) {
  const orderedIds = new Set(orders.map((order) => order.employeeId));
  const ordered = employees.filter((e) => orderedIds.has(e.id));
  const notOrdered = employees.filter((e) => !orderedIds.has(e.id));

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <p className="font-display text-sm font-bold text-ink">
          {strings.orderedCount(ordered.length, employees.length)}
        </p>
      </div>
      <div className="grid gap-4 px-4 py-3 sm:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">{strings.orderedHeading}</p>
          <p className="mt-1 text-sm text-ink">
            {ordered.length > 0 ? ordered.map((e) => e.name).join(', ') : '—'}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">{strings.notOrderedHeading}</p>
          <p className="mt-1 text-sm text-ink">
            {notOrdered.length > 0 ? notOrdered.map((e) => e.name).join(', ') : strings.everyoneOrdered}
          </p>
        </div>
      </div>
    </div>
  );
}
