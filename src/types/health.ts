import { DateKey, ID, ISODateString, Timestamps } from './common';

/** Source of a piece of health data. */
export type HealthDataSource = 'manual' | 'apple_health' | 'google_fit';

/**
 * A single body-weight measurement. Stored as a time series under
 * `users/{uid}/weightEntries` to power the progress chart and trend analysis.
 */
export interface WeightEntry extends Timestamps {
  id: ID;
  userId: ID;
  date: DateKey;
  weightKg: number;
  source: HealthDataSource;
  note?: string;
}

/**
 * Snapshot of health metrics synced from a platform health store
 * (Apple HealthKit / Google Fit) or entered manually for a given day.
 */
export interface HealthData extends Timestamps {
  id: ID;
  userId: ID;
  date: DateKey;
  source: HealthDataSource;
  steps?: number;
  /** Active energy burned in kcal (exercise + movement above resting). */
  activeEnergyKcal?: number;
  /** Resting/basal energy burned in kcal. */
  restingEnergyKcal?: number;
  exerciseMinutes?: number;
  /** Average resting heart rate in bpm. */
  restingHeartRate?: number;
  sleepHours?: number;
  /** Timestamp of the last successful sync from the source. */
  lastSyncedAt?: ISODateString;
}

/** Permission state for a platform health integration. */
export interface HealthAuthorizationStatus {
  isAvailable: boolean;
  isAuthorized: boolean;
  source: HealthDataSource;
}
