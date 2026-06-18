import { BodyMetrics, GoalSettings, NutritionTargets } from '@types';

/**
 * Calorie & macro calculation engine — SIGNATURES ONLY.
 *
 * This module will own all of the energy-balance math: BMR (Mifflin-St Jeor),
 * TDEE, deficit/surplus, and macro distribution. Implementations are
 * intentionally left as TODOs per the architecture-only scope.
 */

/** Estimate Basal Metabolic Rate (kcal/day) via Mifflin-St Jeor. */
export function calculateBMR(_body: BodyMetrics): number {
  // TODO: 10*kg + 6.25*cm - 5*age + sexConstant
  throw new Error('calculateBMR not implemented');
}

/** Total Daily Energy Expenditure = BMR * activity multiplier. */
export function calculateTDEE(
  _body: BodyMetrics,
  _goals: GoalSettings,
): number {
  // TODO: calculateBMR(body) * ACTIVITY_MULTIPLIERS[goals.activityLevel]
  throw new Error('calculateTDEE not implemented');
}

/** Derive the full nutrition target set (calories + macros) for a user. */
export function calculateNutritionTargets(
  _body: BodyMetrics,
  _goals: GoalSettings,
): Omit<NutritionTargets, 'id' | 'userId' | 'createdAt' | 'updatedAt'> {
  // TODO: combine TDEE, CALORIE_ADJUSTMENTS and MACRO_SPLITS.
  throw new Error('calculateNutritionTargets not implemented');
}

/** Estimate calories burned for a workout from MET, weight and duration. */
export function estimateWorkoutCalories(_params: {
  metValue: number;
  weightKg: number;
  durationMinutes: number;
}): number {
  // TODO: MET * 3.5 * kg / 200 * minutes
  throw new Error('estimateWorkoutCalories not implemented');
}
