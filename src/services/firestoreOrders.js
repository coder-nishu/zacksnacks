import {
  collection,
  doc,
  query,
  where,
  onSnapshot,
  setDoc,
  deleteDoc,
  getDocs,
  writeBatch,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

const ORDERS_COLLECTION = 'orders';

function orderDocId(date, employeeId) {
  return `${date}_${employeeId}`;
}

export function subscribeTodayOrders(date, onChange) {
  const q = query(collection(db, ORDERS_COLLECTION), where('date', '==', date));
  return onSnapshot(q, (snap) => onChange(snap.docs.map((d) => d.data())));
}

export function saveOrder(date, employeeId, name, items) {
  return setDoc(doc(db, ORDERS_COLLECTION, orderDocId(date, employeeId)), {
    date,
    employeeId,
    name,
    items,
    updatedAt: serverTimestamp(),
  });
}

export function deleteOrder(date, employeeId) {
  return deleteDoc(doc(db, ORDERS_COLLECTION, orderDocId(date, employeeId)));
}

export async function deleteAllOrders(date) {
  const q = query(collection(db, ORDERS_COLLECTION), where('date', '==', date));
  const snap = await getDocs(q);
  const batch = writeBatch(db);
  snap.docs.forEach((d) => batch.delete(d.ref));
  await batch.commit();
}
