import { useCallback, useEffect } from 'react';

import { authService, userProfileService } from '@services';
import { useAuthStore, useUserStore } from '@store';
import { createLogger } from '@utils/logger';

const log = createLogger('useAuth');

/**
 * Orchestrates the auth lifecycle: it wires the Firebase auth listener to the
 * auth store and keeps a live subscription to the user's profile document.
 *
 * Mount this exactly once near the navigation root. Side effects belong here,
 * not in the stores.
 */
export function useAuth() {
  const { user, isInitializing, setUser, setInitialized, reset } =
    useAuthStore();
  const { setProfile, reset: resetUser } = useUserStore();

  // Subscribe to auth state once.
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((authUser) => {
      log.debug('auth state changed', { uid: authUser?.uid });
      setUser(authUser);
      setInitialized();
    });
    return unsubscribe;
  }, [setUser, setInitialized]);

  // Keep the profile document in sync with the authenticated user.
  useEffect(() => {
    if (!user) {
      resetUser();
      return;
    }
    const unsubscribe = userProfileService.subscribe(user.uid, setProfile);
    return unsubscribe;
  }, [user, setProfile, resetUser]);

  const signOut = useCallback(async () => {
    await authService.signOut();
    reset();
    resetUser();
  }, [reset, resetUser]);

  return {
    user,
    isAuthenticated: user !== null,
    isInitializing,
    signOut,
  };
}
