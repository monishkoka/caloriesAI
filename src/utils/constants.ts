import { ActivityLevel, GoalPace, GoalType, Sex } from '@types';

/**
 * Domain constants used by the nutrition calculation engine. Centralizing them
 * keeps the science in one auditable place.
 */

/** Physical Activity Level multipliers applied to BMR to estimate maintenance. */
export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

/**
 * Sex-specific constant added in the Mifflin-St Jeor BMR equation.
 * `other` uses the midpoint of the male/female constants.
 */
export const MIFFLIN_SEX_CONSTANT: Record<Sex, number> = {
  male: 5,
  female: -161,
  other: -78,
};

/**
 * Fixed daily calorie delta (kcal) applied to maintenance per goal.
 * Fat loss: -500, Lean bulk: +300, Maintain/recomp: 0.
 */
export const GOAL_CALORIE_DELTAS: Record<GoalType, number> = {
  lose_fat: -500,
  maintain: 0,
  build_muscle: 300,
  recomp: 0,
};

/** Protein target in grams per kilogram of bodyweight. */
export const PROTEIN_G_PER_KG = 2;

/** Fat target in grams per kilogram of bodyweight. */
export const FAT_G_PER_KG = 0.8;

/** Approximate energy content of one kilogram of body fat (kcal). */
export const KCAL_PER_KG_FAT = 7700;

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
