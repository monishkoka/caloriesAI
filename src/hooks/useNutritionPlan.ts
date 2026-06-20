import { useEffect, useMemo, useRef } from 'react';

import { nutritionService } from '@services';
import { useAuthStore, useNutritionStore, useUserStore } from '@store';
import { CaloriePlan, NutritionTargets } from '@types';
import {
  calculateCaloriePlan,
  calculateNutritionTargets,
} from '@utils/calories';
import { toISO } from '@utils/formatters';
import { createLogger } from '@utils/logger';

const log = createLogger('useNutritionPlan');

interface NutritionPlanResult {
  /** BMR / maintenance / fat-loss / lean-bulk figures, or null if no profile. */
  plan: CaloriePlan | null;
  /** Calorie + macro targets for the user's selected goal. */
  targets: NutritionTargets | null;
  /** True once body metrics and goals are available to compute from. */
  hasProfile: boolean;
}

/**
 * Computes the user's calorie plan and nutrition targets from their profile
 * (the source of truth), mirrors them into the nutrition store for the UI, and
 * persists the targets to Firestore whenever they change.
 *
 * The calculation is deterministic from the profile, so it is derived on the
 * client; the Firestore copy is kept as a cache/record for other surfaces.
 */
export function useNutritionPlan(): NutritionPlanResult {
  const uid = useAuthStore((s) => s.user?.uid);
  const body = useUserStore((s) => s.profile?.body);
  const goals = useUserStore((s) => s.profile?.goals);
  const setTargets = useNutritionStore((s) => s.setTargets);

  const computed = useMemo(() => {
    if (!body || !goals) {
      return null;
    }
    const plan = calculateCaloriePlan(body, goals.activityLevel);
    const base = calculateNutritionTargets(body, goals);
    const now = toISO();
    const targets: NutritionTargets = {
      id: 'current',
      userId: uid ?? 'local',
      createdAt: now,
      updatedAt: now,
      ...base,
    };
    return { plan, targets, base };
  }, [body, goals, uid]);

  // Avoid redundant writes/store updates when the inputs are unchanged.
  const lastSignature = useRef<string | null>(null);

  useEffect(() => {
    if (!uid || !computed) {
      return;
    }
    const signature = JSON.stringify(computed.base);
    if (signature === lastSignature.current) {
      return;
    }
    lastSignature.current = signature;

    setTargets(computed.targets);
    nutritionService.saveTargets(uid, computed.base).catch((error) => {
      log.error('Failed to persist nutrition targets', error);
    });
  }, [uid, computed, setTargets]);

  return {
    plan: computed?.plan ?? null,
    targets: computed?.targets ?? null,
    hasProfile: Boolean(body && goals),
  };
}
