import { ID, NutritionTargets } from '@types';
import { createLogger } from '@utils/logger';

import { collections } from './collections';
import { firestoreService } from './firestore.service';

const log = createLogger('NutritionService');

/**
 * The user's currently-active target set is stored at a stable document id so
 * it can be read/overwritten in one operation. Historical targets could later
 * be appended as separate docs in the same collection.
 */
const CURRENT_TARGET_ID = 'current';

type TargetInput = Omit<
  NutritionTargets,
  'id' | 'userId' | 'createdAt' | 'updatedAt'
>;

/** Repository for `users/{uid}/nutritionTargets`. */
export const nutritionService = {
  /** Read the active nutrition targets, or null if none have been computed. */
  async getTargets(uid: ID): Promise<NutritionTargets | null> {
    return firestoreService.getDocument<NutritionTargets>(
      collections.nutritionTarget(uid, CURRENT_TARGET_ID),
    );
  },

  /** Persist (create or overwrite) the active nutrition targets. */
  async saveTargets(uid: ID, targets: TargetInput): Promise<void> {
    log.debug('saveTargets', { uid });
    await firestoreService.setDocument(
      collections.nutritionTarget(uid, CURRENT_TARGET_ID),
      { ...targets, userId: uid },
    );
  },

  /** Subscribe to realtime changes of the active targets. */
  subscribe(
    uid: ID,
    onChange: (targets: NutritionTargets | null) => void,
  ): () => void {
    return firestoreService.subscribeDocument<NutritionTargets>(
      collections.nutritionTarget(uid, CURRENT_TARGET_ID),
      onChange,
    );
  },
};

export type NutritionService = typeof nutritionService;
