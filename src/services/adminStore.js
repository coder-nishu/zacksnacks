import { ADMIN_PASSWORD } from '../config/env';
import { todayDhaka } from '../utils/date';

const LOCK_PREFIX = 'twinforce:lock:';
const SNACKS_KEY = 'twinforce:snacks:custom';
const EMPLOYEES_KEY = 'twinforce:employees:custom';
const SESSION_KEY = 'twinforce:admin';

function lockKeyForToday() {
  return `${LOCK_PREFIX}${todayDhaka()}`;
}

const listeners = new Set();

function notify() {
  listeners.forEach((callback) => callback());
}

window.addEventListener('storage', (event) => {
  if (event.key === lockKeyForToday() || event.key === SNACKS_KEY || event.key === EMPLOYEES_KEY) notify();
});

export function subscribe(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

// --- day lock ---

export function isDayLocked() {
  return localStorage.getItem(lockKeyForToday()) === '1';
}

export function setDayLocked(locked) {
  if (locked) {
    localStorage.setItem(lockKeyForToday(), '1');
  } else {
    localStorage.removeItem(lockKeyForToday());
  }
  notify();
}

// --- admin-added snacks ---

export function getCustomSnacks() {
  try {
    const raw = localStorage.getItem(SNACKS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addCustomSnack(snack) {
  const snacks = getCustomSnacks().filter((s) => s.name !== snack.name);
  snacks.push(snack);
  localStorage.setItem(SNACKS_KEY, JSON.stringify(snacks));
  notify();
}

// --- admin-added employees ---

export function getCustomEmployees() {
  try {
    const raw = localStorage.getItem(EMPLOYEES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addCustomEmployee(name) {
  const employees = getCustomEmployees();
  const id = `emp-${Date.now()}`;
  employees.push({ id, name });
  localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(employees));
  notify();
  return id;
}

// --- admin session ---

export function isAdmin() {
  return sessionStorage.getItem(SESSION_KEY) === '1';
}

export function login(password) {
  if (!ADMIN_PASSWORD || password !== ADMIN_PASSWORD) return false;
  sessionStorage.setItem(SESSION_KEY, '1');
  notify();
  return true;
}

export function logout() {
  sessionStorage.removeItem(SESSION_KEY);
  notify();
}
