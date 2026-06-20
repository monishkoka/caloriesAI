import {
  ActivityLevel,
  BodyMetrics,
  CaloriePlan,
  GoalSettings,
  GoalType,
  Macros,
  NutritionTargets,
} from '@types';

import {
  ACTIVITY_MULTIPLIERS,
  FAT_G_PER_KG,
  GOAL_CALORIE_DELTAS,
  KCAL_PER_GRAM,
  KCAL_PER_KG_FAT,
  MIFFLIN_SEX_CONSTANT,
  PROTEIN_G_PER_KG,
} from './constants';
import { toISO } from './formatters';

/**
 * Nutrition calculation engine.
 *
 * A set of pure, reusable functions implementing the energy-balance math:
 * BMR (Mifflin-St Jeor) → maintenance → goal calories → macro distribution.
 * Every function is side-effect free and rounds to whole numbers for display.
 */

/**
 * Basal Metabolic Rate (kcal/day) via the Mifflin-St Jeor equation:
 *
 *   BMR = 10·kg + 6.25·cm − 5·age + sexConstant
 *
 * where sexConstant is +5 (male), −161 (female), −78 (other/midpoint).
 */
export function calculateBMR(body: BodyMetrics): number {
  const base =
    10 * body.currentWeightKg + 6.25 * body.heightCm - 5 * body.age;
  return Math.round(base + MIFFLIN_SEX_CONSTANT[body.sex]);
}

/**
 * Maintenance calories (a.k.a. TDEE) = BMR × activity multiplier.
 */
export function calculateMaintenanceCalories(
  body: BodyMetrics,
  activityLevel: ActivityLevel,
): number {
  return Math.round(calculateBMR(body) * ACTIVITY_MULTIPLIERS[activityLevel]);
}

/** Maintenance − 500 kcal. */
export function calculateFatLossCalories(maintenanceCalories: number): number {
  return maintenanceCalories + GOAL_CALORIE_DELTAS.lose_fat;
}

/** Maintenance + 300 kcal. */
export function calculateLeanBulkCalories(maintenanceCalories: number): number {
  return maintenanceCalories + GOAL_CALORIE_DELTAS.build_muscle;
}

/**
 * Final daily calorie target = maintenance + the fixed delta for the goal.
 */
export function calculateGoalCalories(
  maintenanceCalories: number,
  goalType: GoalType,
): number {
  return maintenanceCalories + GOAL_CALORIE_DELTAS[goalType];
}

/**
 * The full set of comparison calorie figures (BMR, maintenance, fat loss,
 * lean bulk) for a user. Useful for dashboards and goal-selection UIs.
 */
export function calculateCaloriePlan(
  body: BodyMetrics,
  activityLevel: ActivityLevel,
): CaloriePlan {
  const bmr = calculateBMR(body);
  const maintenanceCalories = Math.round(
    bmr * ACTIVITY_MULTIPLIERS[activityLevel],
  );
  return {
    bmr,
    maintenanceCalories,
    fatLossCalories: calculateFatLossCalories(maintenanceCalories),
    leanBulkCalories: calculateLeanBulkCalories(maintenanceCalories),
  };
}

/**
 * Macro targets from a calorie goal and bodyweight:
 *   - Protein: 2 g/kg
 *   - Fat:     0.8 g/kg
 *   - Carbs:   remaining calories ÷ 4
 *
 * Carbs are floored at zero so an unusually low target never goes negative.
 */
export function calculateMacros(
  targetCalories: number,
  weightKg: number,
): Macros {
  const proteinG = Math.round(PROTEIN_G_PER_KG * weightKg);
  const fatG = Math.round(FAT_G_PER_KG * weightKg);

  const proteinKcal = proteinG * KCAL_PER_GRAM.protein;
  const fatKcal = fatG * KCAL_PER_GRAM.fat;
  const remainingKcal = Math.max(0, targetCalories - proteinKcal - fatKcal);
  const carbsG = Math.round(remainingKcal / KCAL_PER_GRAM.carbs);

  return { proteinG, carbsG, fatG };
}

/**
 * Derive the complete, persistable nutrition target set for a user from their
 * body metrics and goal settings. Returns everything except the document
 * identity/timestamps, which the persistence layer fills in.
 */
export function calculateNutritionTargets(
  body: BodyMetrics,
  goals: GoalSettings,
): Omit<NutritionTargets, 'id' | 'userId' | 'createdAt' | 'updatedAt'> {
  const maintenanceCalories = calculateMaintenanceCalories(
    body,
    goals.activityLevel,
  );
  const targetCalories = calculateGoalCalories(maintenanceCalories, goals.type);
  const macros = calculateMacros(targetCalories, body.currentWeightKg);

  return {
    maintenanceCalories,
    calorieAdjustment: GOAL_CALORIE_DELTAS[goals.type],
    targetCalories,
    macros,
    effectiveFrom: toISO(),
  };
}

/**
 * Estimate expected weekly weight change (kg) from a daily calorie adjustment,
 * using ~7700 kcal per kg of body fat. Negative = loss, positive = gain.
 */
export function estimateWeeklyWeightChangeKg(calorieAdjustment: number): number {
  const weeklyKcal = calorieAdjustment * 7;
  return weeklyKcal / KCAL_PER_KG_FAT;
}

/**
 * Estimate calories burned for a workout using the MET formula:
 *   kcal = MET × 3.5 × kg / 200 × minutes
 */
export function estimateWorkoutCalories(params: {
  metValue: number;
  weightKg: number;
  durationMinutes: number;
}): number {
  const { metValue, weightKg, durationMinutes } = params;
  return Math.round((metValue * 3.5 * weightKg) / 200 * durationMinutes);
}
