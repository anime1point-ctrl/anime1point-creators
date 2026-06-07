/**
 * firebase.js — Anime1Point Creators Hub
 * Single Firebase initialisation for the React SPA.
 */
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY            || 'AIzaSyD_replace_in_env',
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN        || 'anime1point-hub.firebaseapp.com',
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID         || 'anime1point-hub',
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET     || 'anime1point-hub.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '000000000000',
  appId:             import.meta.env.VITE_FIREBASE_APP_ID             || '1:000000000000:web:replace_in_env',
  measurementId:     import.meta.env.VITE_FIREBASE_MEASUREMENT_ID     || 'G-7RRRBP4W9S',
}

const app  = getApps().length ? getApp() : initializeApp(firebaseConfig)
const auth = getAuth(app)
const db   = getFirestore(app)

export { app, auth, db }
