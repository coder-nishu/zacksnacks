import { Link } from 'react-router-dom';
import { strings } from '../config/strings';
import { useConfig } from '../hooks/useConfig';
import { useTodayOrders } from '../hooks/useTodayOrders';
import { orderItemCount, orderTotal } from '../utils/aggregate';

export default function Sidebar({ activeId, className = '' }) {
  const { config } = useConfig();
  const orders = useTodayOrders();
  const orderById = new Map(orders.map((order) => [order.employeeId, order]));

  return (
    <nav className={`overflow-y-auto ${className}`} aria-label={strings.teamHeader(config.employees.length)}>
      <p className="px-4 pb-2 pt-4 text-xs font-semibold uppercase tracking-wide text-muted">
        {strings.teamHeader(config.employees.length)}
      </p>
      <ul className="space-y-1 px-2">
        {config.employees.map((employee) => {
          const order = orderById.get(employee.id);
          const isActive = employee.id === activeId;
          const subtitle = order
            ? strings.orderSubtitle(orderItemCount(order.items), orderTotal(order.items), config.currency)
            : strings.noOrderYet;

          return (
            <li key={employee.id}>
              <Link
                to={`/${employee.id}`}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                  isActive ? 'bg-brand text-white' : 'hover:bg-surface'
                }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-surface text-brand-ink'
                  }`}
                >
                  {employee.name.slice(0, 1)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold">{employee.name}</span>
                  <span className={`block truncate text-xs ${isActive ? 'text-white/80' : 'text-muted'}`}>
                    {subtitle}
                  </span>
                </span>
                {order && (
                  <span
                    aria-hidden="true"
                    className={`h-2 w-2 shrink-0 rounded-full ${isActive ? 'bg-white' : 'bg-brand'}`}
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
