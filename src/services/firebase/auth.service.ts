import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User as FirebaseUser,
} from 'firebase/auth';

import { AuthUser } from '@types';
import { createLogger } from '@utils/logger';

import { auth } from './config';

const log = createLogger('AuthService');

/** Maps a raw Firebase user into our domain `AuthUser`. */
function toAuthUser(user: FirebaseUser): AuthUser {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoUrl: user.photoURL,
    emailVerified: user.emailVerified,
  };
}

/**
 * Authentication service — the single boundary between the app and Firebase
 * Auth. Returns domain types only; consumers never see Firebase SDK objects.
 *
 * NOTE: Business logic (validation, error mapping, analytics) is intentionally
 * left as TODOs — this is architecture scaffolding only.
 */
export const authService = {
  /** Subscribe to auth state changes. Returns an unsubscribe function. */
  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void {
    return onAuthStateChanged(auth, (user) => {
      callback(user ? toAuthUser(user) : null);
    });
  },

  async signIn(email: string, password: string): Promise<AuthUser> {
    log.debug('signIn', { email });
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return toAuthUser(credential.user);
  },

  async signUp(
    email: string,
    password: string,
    displayName?: string,
  ): Promise<AuthUser> {
    log.debug('signUp', { email });
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    if (displayName) {
      await updateProfile(credential.user, { displayName });
    }
    return toAuthUser(credential.user);
  },

  async signOut(): Promise<void> {
    log.debug('signOut');
    await signOut(auth);
  },

  async sendPasswordReset(email: string): Promise<void> {
    log.debug('sendPasswordReset', { email });
    await sendPasswordResetEmail(auth, email);
  },

  getCurrentUser(): AuthUser | null {
    return auth.currentUser ? toAuthUser(auth.currentUser) : null;
  },
};

export type AuthService = typeof authService;
