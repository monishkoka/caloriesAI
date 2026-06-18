import { create } from 'zustand';

import { BodyMetrics, GoalSettings } from '@types';

/**
 * Transient state for the multi-step onboarding wizard. Collects the user's
 * name plus partial body metrics and goal settings across screens before
 * committing them to the user profile on completion.
 *
 * Step navigation is handled by the native stack navigator — this store only
 * owns the collected data.
 */
interface OnboardingState {
  displayName: string;
  body: Partial<BodyMetrics>;
  goals: Partial<GoalSettings>;
}

interface OnboardingActions {
  setName: (displayName: string) => void;
  updateBody: (patch: Partial<BodyMetrics>) => void;
  updateGoals: (patch: Partial<GoalSettings>) => void;
  reset: () => void;
}

const initialState: OnboardingState = {
  displayName: '',
  body: {},
  goals: {},
};

export const useOnboardingStore = create<
  OnboardingState & OnboardingActions
>((set) => ({
  ...initialState,
  setName: (displayName) => set({ displayName }),
  updateBody: (patch) => set((s) => ({ body: { ...s.body, ...patch } })),
  updateGoals: (patch) => set((s) => ({ goals: { ...s.goals, ...patch } })),
  reset: () => set(initialState),
}));
