/**
 * Shared primitive and utility types used across the domain models.
 */

/** ISO-8601 timestamp string, e.g. "2026-06-19T03:11:00.000Z". */
export type ISODateString = string;

/** Calendar day key in "YYYY-MM-DD" form, used for daily aggregates. */
export type DateKey = string;

/** Firestore document identifier. */
export type ID = string;

export type Sex = 'male' | 'female' | 'other';

export type UnitSystem = 'metric' | 'imperial';

/**
 * Physical activity level used to estimate the activity multiplier
 * (PAL) when computing Total Daily Energy Expenditure (TDEE).
 */
export type ActivityLevel =
  | 'sedentary'
  | 'light'
  | 'moderate'
  | 'active'
  | 'very_active';

/** The user's primary health objective. Drives calorie target direction. */
export type GoalType = 'lose_fat' | 'maintain' | 'build_muscle' | 'recomp';

/** Pace at which the user wants to approach their goal. */
export type GoalPace = 'relaxed' | 'steady' | 'aggressive';

/**
 * Standard async resource lifecycle, useful for screen/store states without
 * pulling in a data-fetching library.
 */
export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

/** Generic, serializable result envelope for service calls. */
export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: AppError };

/** Normalized application error shape surfaced to the UI layer. */
export interface AppError {
  code: string;
  message: string;
  /** Optional underlying cause for logging/telemetry. */
  cause?: unknown;
}

/** Fields automatically managed on every Firestore document. */
export interface Timestamps {
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
