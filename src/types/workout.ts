import { ID, ISODateString, Timestamps } from './common';

export type WorkoutType =
  | 'strength'
  | 'cardio'
  | 'hiit'
  | 'cycling'
  | 'running'
  | 'walking'
  | 'swimming'
  | 'yoga'
  | 'other';

export type WorkoutIntensity = 'low' | 'moderate' | 'high';

/** A single completed exercise set within a strength workout. */
export interface ExerciseSet {
  reps: number;
  weightKg?: number;
  /** Rate of Perceived Exertion (1–10), optional. */
  rpe?: number;
}

/** An exercise performed during a workout session. */
export interface WorkoutExercise {
  id: ID;
  name: string;
  sets: ExerciseSet[];
}

/**
 * A logged workout. `caloriesBurned` is computed from type, duration,
 * intensity and the user's body weight (or sourced from HealthKit).
 */
export interface WorkoutSession extends Timestamps {
  id: ID;
  userId: ID;
  type: WorkoutType;
  title: string;
  startedAt: ISODateString;
  /** Total duration in minutes. */
  durationMinutes: number;
  intensity: WorkoutIntensity;
  caloriesBurned: number;
  /** Populated for strength sessions; empty for pure cardio. */
  exercises: WorkoutExercise[];
  source: 'manual' | 'apple_health';
  notes?: string;
}
