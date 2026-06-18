import { create } from 'zustand';

import { AuthUser, RequestStatus } from '@types';

/**
 * Authentication state.
 *
 * `status` distinguishes the critical "still resolving the persisted session"
 * phase (`loading`) from a resolved signed-out state — the RootNavigator uses
 * this to decide whether to show the splash screen.
 *
 * Side effects (calling `authService`) live in the `useAuth` hook, not here;
 * the store is a pure state container.
 */
interface AuthState {
  status: RequestStatus;
  user: AuthUser | null;
  /** True until the first auth-state resolution completes. */
  isInitializing: boolean;
  error: string | null;
}

interface AuthActions {
  setUser: (user: AuthUser | null) => void;
  setStatus: (status: RequestStatus) => void;
  setError: (error: string | null) => void;
  setInitialized: () => void;
  reset: () => void;
}

const initialState: AuthState = {
  status: 'idle',
  user: null,
  isInitializing: true,
  error: null,
};

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  ...initialState,
  setUser: (user) => set({ user, status: user ? 'success' : 'idle' }),
  setStatus: (status) => set({ status }),
  setError: (error) => set({ error, status: error ? 'error' : 'idle' }),
  setInitialized: () => set({ isInitializing: false }),
  reset: () => set({ ...initialState, isInitializing: false }),
}));

/** Convenience selector: is a user currently authenticated? */
export const selectIsAuthenticated = (s: AuthState) => s.user !== null;
