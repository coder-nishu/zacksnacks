import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { ADMIN_PASSWORD } from '../config/env';
import { todayDhaka } from '../utils/date';

const SESSION_KEY = 'twinforce:admin';

const listeners = new Set();

function notify() {
  listeners.forEach((callback) => callback());
}

export function subscribe(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

// --- day lock (Firestore, shared across everyone) ---

let lockedCache = false;
let watchedLockDate = null;
let unwatchLock = null;

function watchDayLock() {
  const date = todayDhaka();
  if (date === watchedLockDate) return;
  watchedLockDate = date;
  if (unwatchLock) unwatchLock();
  lockedCache = false;
  unwatchLock = onSnapshot(doc(db, 'dayMeta', date), (snap) => {
    lockedCache = snap.exists() ? Boolean(snap.data().locked) : false;
    notify();
  });
}

watchDayLock();

export function isDayLocked() {
  watchDayLock();
  return lockedCache;
}

export function setDayLocked(locked) {
  setDoc(
    doc(db, 'dayMeta', todayDhaka()),
    { date: todayDhaka(), locked, lockedAt: serverTimestamp() },
    { merge: true },
  ).catch((err) => console.error('setDayLocked failed', err));
}

// --- snacks (Firestore is the only source — add/remove here shows up everywhere live) ---

let snacksCache = [];

onSnapshot(query(collection(db, 'snacks'), orderBy('order')), (snap) => {
  snacksCache = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  notify();
});

export function getSnacks() {
  return snacksCache;
}

export function addSnack(snack) {
  if (snacksCache.some((s) => s.name === snack.name)) return;
  const id = `snack-${Date.now()}`;
  setDoc(doc(db, 'snacks', id), {
    name: snack.name,
    price: snack.price != null ? Number(snack.price) : null,
    order: Date.now(),
  }).catch((err) => console.error('addSnack failed', err));
}

export function removeSnack(id) {
  deleteDoc(doc(db, 'snacks', id)).catch((err) => console.error('removeSnack failed', err));
}

// --- employees (Firestore is the only source — add/remove here shows up everywhere live) ---

let employeesCache = [];

onSnapshot(query(collection(db, 'employees'), orderBy('order')), (snap) => {
  employeesCache = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  notify();
});

export function getEmployees() {
  return employeesCache;
}

export function addEmployee(name) {
  const id = `emp-${Date.now()}`;
  setDoc(doc(db, 'employees', id), { id, name, order: Date.now() }).catch((err) =>
    console.error('addEmployee failed', err),
  );
  return id;
}

export function removeEmployee(id) {
  deleteDoc(doc(db, 'employees', id)).catch((err) => console.error('removeEmployee failed', err));
}

// --- admin session — per-device, stays in sessionStorage, never Firestore ---

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
