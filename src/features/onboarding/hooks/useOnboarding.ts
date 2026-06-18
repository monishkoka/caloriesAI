import { useCallback, useState } from 'react';

import { userProfileService } from '@services';
import { useAuthStore, useOnboardingStore, useUserStore } from '@store';
import { BodyMetrics, GoalSettings, RequestStatus } from '@types';
import { createLogger } from '@utils/logger';

const log = createLogger('useOnboarding');

/**
 * Orchestrates committing the collected onboarding data to Firestore.
 *
 * On success it both persists the payload and optimistically flips
 * `onboardingCompleted` in the user store, which causes `RootNavigator` to swap
 * the Onboarding stack for the Main tabs (landing on the Dashboard).
 */
export function useOnboarding() {
  const uid = useAuthStore((s) => s.user?.uid);
  const patchProfile = useUserStore((s) => s.patchProfile);
  const [status, setStatus] = useState<RequestStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(async (): Promise<boolean> => {
    const { displayName, body, goals, reset } = useOnboardingStore.getState();

    if (!uid) {
      setError('You must be signed in to finish onboarding.');
      setStatus('error');
      return false;
    }

    // Steps gate progression, so these should be present by the review step.
    if (
      body.sex === undefined ||
      body.age === undefined ||
      body.heightCm === undefined ||
      body.currentWeightKg === undefined ||
      goals.type === undefined ||
      goals.activityLevel === undefined
    ) {
      setError('Some details are missing. Please complete every step.');
      setStatus('error');
      return false;
    }

    const fullBody: BodyMetrics = {
      sex: body.sex,
      age: body.age,
      heightCm: body.heightCm,
      currentWeightKg: body.currentWeightKg,
    };

    const fullGoals: GoalSettings = {
      type: goals.type,
      // Pace is not collected during onboarding yet; default to a steady plan.
      pace: 'steady',
      activityLevel: goals.activityLevel,
    };

    setStatus('loading');
    setError(null);
    try {
      await userProfileService.saveOnboarding(uid, {
        displayName: displayName.trim(),
        body: fullBody,
        goals: fullGoals,
      });
      patchProfile({
        displayName: displayName.trim(),
        body: fullBody,
        goals: fullGoals,
        onboardingCompleted: true,
      });
      reset();
      setStatus('success');
      return true;
    } catch (e) {
      log.error('Failed to save onboarding', e);
      setError('Something went wrong saving your profile. Please try again.');
      setStatus('error');
      return false;
    }
  }, [uid, patchProfile]);

  return { submit, status, error, isSubmitting: status === 'loading' };
}
