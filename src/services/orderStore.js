import { todayDhaka } from '../utils/date';
import { subscribeTodayOrders, saveOrder, deleteOrder, deleteAllOrders } from './firestoreOrders';

let cache = [];
let watchedDate = null;
let unwatch = null;

const listeners = new Set();

function notify() {
  listeners.forEach((callback) => callback());
}

// Re-points the onSnapshot listener whenever todayDhaka() rolls over to a new
// day (e.g. the app was left open across midnight), so the cache never serves
// yesterday's orders.
function ensureWatching() {
  const date = todayDhaka();
  if (date === watchedDate) return;
  watchedDate = date;
  if (unwatch) unwatch();
  cache = [];
  unwatch = subscribeTodayOrders(date, (orders) => {
    cache = orders;
    notify();
  });
}

ensureWatching();

export function getOrders() {
  ensureWatching();
  return cache;
}

export function getMyOrder(employeeId) {
  return getOrders().find((order) => order.employeeId === employeeId) || null;
}

export function submitOrder(employeeId, name, items) {
  saveOrder(todayDhaka(), employeeId, name, items).catch((err) => console.error('submitOrder failed', err));
}

export function clearMyOrder(employeeId) {
  deleteOrder(todayDhaka(), employeeId).catch((err) => console.error('clearMyOrder failed', err));
}

export function resetDay() {
  deleteAllOrders(todayDhaka()).catch((err) => console.error('resetDay failed', err));
}

export function subscribe(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}
