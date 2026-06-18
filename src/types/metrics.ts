import { Macros } from './nutrition';
import { DateKey, ID, Timestamps } from './common';

/**
 * Pre-aggregated daily rollup stored at
 * `users/{uid}/dailyMetrics/{YYYY-MM-DD}`.
 *
 * This denormalized document lets the dashboard render a day's progress with a
 * single read instead of summing every food/workout entry on the client.
 */
export interface DailyMetrics extends Timestamps {
  id: ID;
  userId: ID;
  date: DateKey;

  // Energy ----------------------------------------------------------------
  /** Total calories consumed from food entries. */
  caloriesConsumed: number;
  /** Calories burned from logged + synced workouts. */
  caloriesBurned: number;
  /** The day's calorie goal (snapshot of the active target). */
  calorieTarget: number;
  /** Net energy balance = consumed - burned - target. */
  netCalories: number;

  // Macros ----------------------------------------------------------------
  macrosConsumed: Macros;
  macrosTarget: Macros;

  // Activity --------------------------------------------------------------
  steps: number;
  activeEnergyKcal: number;
  workoutCount: number;

  // Body ------------------------------------------------------------------
  /** Weight logged on this day, if any. */
  weightKg?: number;
}

/** A computed trend point used by the progress charts. */
export interface TrendPoint {
  date: DateKey;
  value: number;
}
