import { serverTimestamp } from 'firebase/firestore';

import {
  AuthUser,
  BodyMetrics,
  GoalSettings,
  ID,
  User,
  UserPreferences,
} from '@types';
import { createLogger } from '@utils/logger';

import { collections } from './collections';
import { firestoreService } from './firestore.service';

const log = createLogger('UserProfileService');

const DEFAULT_PREFERENCES: UserPreferences = {
  units: 'metric',
  timezone: 'UTC',
  notificationsEnabled: true,
  healthSyncEnabled: false,
};

/**
 * Repository for the `users/{uid}` profile document. This is the canonical
 * place to read/write the `User` aggregate.
 */
export const userProfileService = {
  /** Fetch the profile document for a user. */
  async getProfile(uid: ID): Promise<User | null> {
    return firestoreService.getDocument<User>(collections.user(uid));
  },

  /**
   * Create the initial profile right after sign-up. Idempotent via `merge`.
   * Onboarding subsequently fills in `body` and `goals`.
   */
  async createInitialProfile(authUser: AuthUser): Promise<void> {
    log.debug('createInitialProfile', { uid: authUser.uid });
    await firestoreService.setDocument(collections.user(authUser.uid), {
      email: authUser.email ?? '',
      displayName: authUser.displayName ?? undefined,
      photoUrl: authUser.photoUrl ?? undefined,
      onboardingCompleted: false,
      preferences: DEFAULT_PREFERENCES,
      createdAt: serverTimestamp(),
    });
  },

  /** Patch arbitrary fields on the profile. */
  async updateProfile(uid: ID, patch: Partial<User>): Promise<void> {
    await firestoreService.updateDocument(collections.user(uid), patch);
  },

  /** Mark onboarding as completed — gates entry into the main app. */
  async completeOnboarding(uid: ID): Promise<void> {
    await firestoreService.updateDocument(collections.user(uid), {
      onboardingCompleted: true,
    });
  },

  /**
   * Persist the full onboarding payload and flip `onboardingCompleted` in a
   * single write. Uses `merge` so it is safe even if the profile document was
   * never pre-created.
   */
  async saveOnboarding(
    uid: ID,
    data: {
      displayName: string;
      body: BodyMetrics;
      goals: GoalSettings;
    },
  ): Promise<void> {
    log.debug('saveOnboarding', { uid });
    await firestoreService.setDocument(collections.user(uid), {
      displayName: data.displayName,
      body: data.body,
      goals: data.goals,
      onboardingCompleted: true,
    });
  },

  /** Subscribe to realtime profile changes. Returns an unsubscribe function. */
  subscribe(uid: ID, onChange: (user: User | null) => void): () => void {
    return firestoreService.subscribeDocument<User>(
      collections.user(uid),
      onChange,
    );
  },
};

export type UserProfileService = typeof userProfileService;
