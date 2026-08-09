import { useConfig } from '../../hooks/useConfig';
import { useTodayOrders } from '../../hooks/useTodayOrders';
import { buildSummary } from '../../utils/aggregate';
import { strings } from '../../config/strings';
import OrderStatusSummary from './OrderStatusSummary';
import ShoppingListTable from './ShoppingListTable';
import PerPersonBreakdown from './PerPersonBreakdown';
import EmptyState from '../common/EmptyState';

export default function SummaryView() {
  const { config } = useConfig();
  const orders = useTodayOrders();

  return (
    <div className="mx-auto max-w-2xl space-y-4 px-4 py-4 sm:px-6">
      <OrderStatusSummary employees={config.employees} orders={orders} />

      {orders.length === 0 ? (
        <EmptyState title={strings.noOrdersToday} />
      ) : (
        <>
          <ShoppingListTable config={config} summary={buildSummary(orders)} />
          <PerPersonBreakdown orders={orders} currency={config.currency} />
        </>
      )}
    </div>
  );
}
