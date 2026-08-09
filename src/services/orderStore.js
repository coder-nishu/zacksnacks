import { todayDhaka } from '../utils/date';

const PREFIX = 'twinforce:orders:';

function keyForToday() {
  return `${PREFIX}${todayDhaka()}`;
}

function readOrders() {
  try {
    const raw = localStorage.getItem(keyForToday());
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeOrders(orders) {
  try {
    localStorage.setItem(keyForToday(), JSON.stringify(orders));
  } catch {
    // storage unavailable or full — order won't persist, but the app keeps working
  }
}

const listeners = new Set();

function notify() {
  listeners.forEach((callback) => callback());
}

window.addEventListener('storage', (event) => {
  if (event.key === keyForToday()) notify();
});

export function getOrders() {
  return readOrders();
}

export function getMyOrder(employeeId) {
  return readOrders().find((order) => order.employeeId === employeeId) || null;
}

export function submitOrder(employeeId, name, items) {
  const orders = readOrders().filter((order) => order.employeeId !== employeeId);
  orders.push({ employeeId, name, items, updatedAt: Date.now() });
  writeOrders(orders);
  notify();
}

export function clearMyOrder(employeeId) {
  const orders = readOrders().filter((order) => order.employeeId !== employeeId);
  writeOrders(orders);
  notify();
}

export function resetDay() {
  writeOrders([]);
  notify();
}

export function subscribe(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}
