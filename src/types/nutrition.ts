import { DateKey, ID, ISODateString, Timestamps } from './common';

/** Grams of each macronutrient. */
export interface Macros {
  proteinG: number;
  carbsG: number;
  fatG: number;
  /** Optional dietary fiber, tracked when available. */
  fiberG?: number;
}

/**
 * The set of calorie figures derived from a user's BMR and activity level.
 * Surfaced on the dashboard so the user can compare goals at a glance.
 */
export interface CaloriePlan {
  /** Basal Metabolic Rate (kcal/day), Mifflin-St Jeor. */
  bmr: number;
  /** Maintenance calories = BMR × activity multiplier. */
  maintenanceCalories: number;
  /** Maintenance − 500. */
  fatLossCalories: number;
  /** Maintenance + 300. */
  leanBulkCalories: number;
}

/**
 * Daily nutrition targets derived from TDEE, goal and macro split strategy.
 * These are the numbers the dashboard "rings" track against.
 */
export interface NutritionTargets extends Timestamps {
  id: ID;
  userId: ID;
  /** Maintenance calories (TDEE) before any deficit/surplus is applied. */
  maintenanceCalories: number;
  /** Net calorie adjustment: negative = deficit, positive = surplus. */
  calorieAdjustment: number;
  /** Final daily calorie goal = maintenance + adjustment. */
  targetCalories: number;
  /** Target macro distribution in grams. */
  macros: Macros;
  /** When this target set becomes effective. */
  effectiveFrom: ISODateString;
}

/** A single logged food/meal item. */
export interface FoodEntry extends Timestamps {
  id: ID;
  userId: ID;
  /** Day this entry counts toward. */
  date: DateKey;
  name: string;
  mealType: MealType;
  servings: number;
  calories: number;
  macros: Macros;
  /** Optional external food database reference (e.g. barcode / FDC id). */
  sourceRef?: string;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';
