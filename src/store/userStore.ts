import { create } from 'zustand';

import { RequestStatus, User } from '@types';

/**
 * Holds the loaded `User` profile document (the domain aggregate, distinct from
 * the auth identity). Populated by a profile subscription set up after sign-in.
 */
interface UserState {
  status: RequestStatus;
  profile: User | null;
  error: string | null;
}

interface UserActions {
  setProfile: (profile: User | null) => void;
  /** Optimistically merge fields into the loaded profile (no-op if unloaded). */
  patchProfile: (patch: Partial<User>) => void;
  setStatus: (status: RequestStatus) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState: UserState = {
  status: 'idle',
  profile: null,
  error: null,
};

export const useUserStore = create<UserState & UserActions>((set) => ({
  ...initialState,
  setProfile: (profile) => set({ profile, status: 'success' }),
  patchProfile: (patch) =>
    set((s) => (s.profile ? { profile: { ...s.profile, ...patch } } : {})),
  setStatus: (status) => set({ status }),
  setError: (error) => set({ error, status: error ? 'error' : 'idle' }),
  reset: () => set(initialState),
}));

/** Selector: has the user finished onboarding? */
export const selectOnboardingCompleted = (s: UserState) =>
  s.profile?.onboardingCompleted ?? false;
