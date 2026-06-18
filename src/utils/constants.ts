import { ActivityLevel, GoalPace, GoalType } from '@types';

/**
 * Domain constants used by the (future) calculation engine. Centralizing them
 * keeps the science in one auditable place.
 */

/** Physical Activity Level multipliers applied to BMR to estimate TDEE. */
export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

/**
 * Daily calorie adjustment (kcal) per goal/pace combination.
 * Negative = deficit (fat loss), positive = surplus (muscle gain).
 */
export const CALORIE_ADJUSTMENTS: Record<
  GoalType,
  Record<GoalPace, number>
> = {
  lose_fat: { relaxed: -250, steady: -500, aggressive: -750 },
  maintain: { relaxed: 0, steady: 0, aggressive: 0 },
  build_muscle: { relaxed: 150, steady: 300, aggressive: 500 },
  recomp: { relaxed: -100, steady: 0, aggressive: 100 },
};

/** Default macro split (fraction of total calories) by goal. */
export const MACRO_SPLITS: Record<
  GoalType,
  { protein: number; carbs: number; fat: number }
> = {
  lose_fat: { protein: 0.4, carbs: 0.3, fat: 0.3 },
  maintain: { protein: 0.3, carbs: 0.4, fat: 0.3 },
  build_muscle: { protein: 0.3, carbs: 0.45, fat: 0.25 },
  recomp: { protein: 0.35, carbs: 0.35, fat: 0.3 },
};

/** Calories per gram of each macronutrient (Atwater factors). */
export const KCAL_PER_GRAM = {
  protein: 4,
  carbs: 4,
  fat: 9,
} as const;

// --- Input validation bounds (used by onboarding & validators) -------------

/** Accepted age range in years. */
export const AGE_RANGE = { min: 13, max: 100 } as const;

/** Accepted height range in centimeters. */
export const HEIGHT_CM_RANGE = { min: 100, max: 250 } as const;

/** Accepted weight range in kilograms. */
export const WEIGHT_KG_RANGE = { min: 30, max: 300 } as const;

export const APP_NAME = 'AI Health Coach';
