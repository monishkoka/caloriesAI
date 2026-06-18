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
