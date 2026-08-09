import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// Analytics is optional — only load it if a measurement id is configured, and
// never let it take the app down if the SDK or the network misbehaves.
const measurementId = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID;
if (measurementId && typeof window !== 'undefined') {
  import('firebase/analytics')
    .then(({ getAnalytics }) => getAnalytics(app))
    .catch(() => {});
}
