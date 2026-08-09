import { useEffect, useState } from 'react';
import { getOrders, subscribe } from '../services/orderStore';

export function useTodayOrders() {
  const [orders, setOrders] = useState(() => getOrders());

  useEffect(() => {
    return subscribe(() => setOrders(getOrders()));
  }, []);

  return orders;
}
