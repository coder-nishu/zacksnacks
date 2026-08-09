import { useMemo } from 'react';
import { useTodayOrders } from './useTodayOrders';

export function useMyOrder(employeeId) {
  const orders = useTodayOrders();
  return useMemo(
    () => orders.find((order) => order.employeeId === employeeId) || null,
    [orders, employeeId],
  );
}
