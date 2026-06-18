import { Ionicons } from '@expo/vector-icons';

import { ActivityLevel, GoalType, Sex } from '@types';

type IconName = keyof typeof Ionicons.glyphMap;

interface Option<T> {
  value: T;
  label: string;
  description?: string;
  icon?: IconName;
}

/**
 * Static, presentation-facing option lists for the single-choice onboarding
 * steps. Kept beside the feature so labels/copy can evolve without touching the
 * domain enums in `@types`.
 */

export const GENDER_OPTIONS: Option<Sex>[] = [
  { value: 'male', label: 'Male', icon: 'male' },
  { value: 'female', label: 'Female', icon: 'female' },
  { value: 'other', label: 'Other', icon: 'transgender' },
];

export const ACTIVITY_OPTIONS: Option<ActivityLevel>[] = [
  {
    value: 'sedentary',
    label: 'Sedentary',
    description: 'Little or no exercise',
    icon: 'bed',
  },
  {
    value: 'light',
    label: 'Lightly Active',
    description: 'Light exercise 1–3 days/week',
    icon: 'walk',
  },
  {
    value: 'moderate',
    label: 'Moderately Active',
    description: 'Moderate exercise 3–5 days/week',
    icon: 'bicycle',
  },
  {
    value: 'active',
    label: 'Very Active',
    description: 'Hard exercise 6–7 days/week',
    icon: 'fitness',
  },
  {
    value: 'very_active',
    label: 'Athlete',
    description: 'Intense daily training or a physical job',
    icon: 'barbell',
  },
];

export const GOAL_OPTIONS: Option<GoalType>[] = [
  {
    value: 'lose_fat',
    label: 'Lose Fat',
    description: 'Eat in a calorie deficit to drop body fat',
    icon: 'trending-down',
  },
  {
    value: 'maintain',
    label: 'Maintain Weight',
    description: 'Stay at your current weight and recomposition',
    icon: 'remove',
  },
  {
    value: 'build_muscle',
    label: 'Gain Muscle',
    description: 'Eat in a surplus to build lean mass',
    icon: 'trending-up',
  },
];

/** Total number of data-collection steps (excludes the Welcome screen). */
export const ONBOARDING_TOTAL_STEPS = 5;

/** Human-readable label lookups, reused by the review screen. */
export const ACTIVITY_LABELS: Record<ActivityLevel, string> =
  Object.fromEntries(
    ACTIVITY_OPTIONS.map((o) => [o.value, o.label]),
  ) as Record<ActivityLevel, string>;

export const GOAL_LABELS: Record<GoalType, string> = Object.fromEntries(
  GOAL_OPTIONS.map((o) => [o.value, o.label]),
) as Record<GoalType, string>;

export const GENDER_LABELS: Record<Sex, string> = Object.fromEntries(
  GENDER_OPTIONS.map((o) => [o.value, o.label]),
) as Record<Sex, string>;
