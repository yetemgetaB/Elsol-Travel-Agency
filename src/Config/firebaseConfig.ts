import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCWgHZjvYemAxtrXLWdnp1ABtxzR0_rzR0",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "travel-agency-c27e0.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "travel-agency-c27e0",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "travel-agency-c27e0.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1022693047162",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1022693047162:web:3c01f128b134b3c1eff4c3",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-NLPJHCY0W9"
};

// Initialize Firebase (singleton)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
