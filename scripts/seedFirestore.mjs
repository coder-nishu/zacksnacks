// One-time (and safe to re-run) seed: pushes the roster/menu from
// src/config/data.json into Firestore's `employees` and `snacks` collections,
// which is where the running app reads them from (see src/services/adminStore.js).
// Uses deterministic doc ids, so re-running overwrites rather than duplicating.
//
// Usage: node --env-file=.env scripts/seedFirestore.mjs
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const dataPath = fileURLToPath(new URL('../src/config/data.json', import.meta.url));
const data = JSON.parse(readFileSync(dataPath, 'utf-8'));

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

if (!firebaseConfig.projectId) {
  console.error('Missing VITE_FIREBASE_* env vars. Run with: node --env-file=.env scripts/seedFirestore.mjs');
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedEmployees() {
  await Promise.all(
    data.employees.map((employee, index) =>
      setDoc(doc(db, 'employees', employee.id), { id: employee.id, name: employee.name, order: index }),
    ),
  );
  console.log(`Seeded ${data.employees.length} employees.`);
}

async function seedSnacks() {
  await Promise.all(
    data.snacks.map((snack, index) =>
      setDoc(doc(db, 'snacks', `snack-${String(index + 1).padStart(2, '0')}`), {
        name: snack.name,
        price: snack.price,
        order: index,
      }),
    ),
  );
  console.log(`Seeded ${data.snacks.length} snacks.`);
}

await seedEmployees();
await seedSnacks();
console.log('Done.');
process.exit(0);
