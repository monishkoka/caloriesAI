import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  Auth,
  getAuth,
  // @ts-expect-error — getReactNativePersistence is not yet in the public types
  // for some firebase versions, but is required for RN AsyncStorage persistence.
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';

import { env } from '@utils/env';

/**
 * Firebase initialization.
 *
 * Initialized once (idempotent across Fast Refresh) and exposes the shared
 * `app`, `auth` and `db` singletons. Auth uses AsyncStorage so sessions
 * survive app restarts on native.
 */
const app = getApps().length ? getApp() : initializeApp(env.firebase);

let auth: Auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch {
  // initializeAuth throws if called twice (e.g. Fast Refresh) — fall back.
  auth = getAuth(app);
}

const db: Firestore = getFirestore(app);

export { app, auth, db };
