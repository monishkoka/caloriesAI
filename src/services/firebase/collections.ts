import { ID } from '@types';

/**
 * Centralized Firestore path builders. Keeping every collection/document path
 * in one place prevents typo-driven bugs and documents the data model.
 *
 * Data model
 * ----------
 * users/{uid}
 * users/{uid}/weightEntries/{entryId}
 * users/{uid}/healthData/{YYYY-MM-DD}
 * users/{uid}/dailyMetrics/{YYYY-MM-DD}
 * users/{uid}/nutritionTargets/{targetId}
 * users/{uid}/foodEntries/{entryId}
 * users/{uid}/workouts/{workoutId}
 * users/{uid}/conversations/{conversationId}
 */
export const collections = {
  users: () => 'users',
  user: (uid: ID) => `users/${uid}`,

  weightEntries: (uid: ID) => `users/${uid}/weightEntries`,
  weightEntry: (uid: ID, id: ID) => `users/${uid}/weightEntries/${id}`,

  healthData: (uid: ID) => `users/${uid}/healthData`,
  healthDataDay: (uid: ID, dateKey: string) =>
    `users/${uid}/healthData/${dateKey}`,

  dailyMetrics: (uid: ID) => `users/${uid}/dailyMetrics`,
  dailyMetricsDay: (uid: ID, dateKey: string) =>
    `users/${uid}/dailyMetrics/${dateKey}`,

  nutritionTargets: (uid: ID) => `users/${uid}/nutritionTargets`,
  nutritionTarget: (uid: ID, id: ID) =>
    `users/${uid}/nutritionTargets/${id}`,

  foodEntries: (uid: ID) => `users/${uid}/foodEntries`,
  foodEntry: (uid: ID, id: ID) => `users/${uid}/foodEntries/${id}`,

  workouts: (uid: ID) => `users/${uid}/workouts`,
  workout: (uid: ID, id: ID) => `users/${uid}/workouts/${id}`,

  conversations: (uid: ID) => `users/${uid}/conversations`,
  conversation: (uid: ID, id: ID) => `users/${uid}/conversations/${id}`,
} as const;
