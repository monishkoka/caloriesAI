import {
  ActivityLevel,
  GoalPace,
  GoalType,
  ID,
  Sex,
  Timestamps,
  UnitSystem,
} from './common';

/**
 * Biometric facts about the user, collected during onboarding. Height rarely
 * changes; weight is also tracked separately as a time series via `WeightEntry`.
 */
export interface BodyMetrics {
  sex: Sex;
  /** Age in years. */
  age: number;
  /** Height in centimeters. */
  heightCm: number;
  /** Current weight in kilograms, denormalized for quick reads. */
  currentWeightKg: number;
  /** Optional body-fat percentage (0–100) when known. */
  bodyFatPercentage?: number;
}

/** The user's goal configuration that drives all target calculations. */
export interface GoalSettings {
  type: GoalType;
  pace: GoalPace;
  /** Target weight in kg. Optional for `maintain`. */
  targetWeightKg?: number;
  activityLevel: ActivityLevel;
}

/** User-facing preferences and locale settings. */
export interface UserPreferences {
  units: UnitSystem;
  /** IANA timezone, e.g. "America/New_York". */
  timezone: string;
  notificationsEnabled: boolean;
  healthSyncEnabled: boolean;
}

/**
 * Root user document stored at `users/{uid}` in Firestore.
 *
 * `onboardingCompleted` gates navigation between the onboarding flow and the
 * main app. The `body` and `goals` fields are optional until onboarding fills
 * them in.
 */
export interface User extends Timestamps {
  id: ID;
  email: string;
  displayName?: string;
  photoUrl?: string;
  onboardingCompleted: boolean;
  body?: BodyMetrics;
  goals?: GoalSettings;
  preferences: UserPreferences;
}

/** The minimal auth identity exposed by the auth provider (Firebase). */
export interface AuthUser {
  uid: ID;
  email: string | null;
  displayName: string | null;
  photoUrl: string | null;
  emailVerified: boolean;
}
