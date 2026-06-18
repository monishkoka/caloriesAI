import { DateKey, ISODateString } from '@types';

/**
 * Pure presentation helpers. No business logic — just formatting primitives
 * for the UI layer.
 */

/** Returns today's date as a "YYYY-MM-DD" key in local time. */
export function todayKey(date: Date = new Date()): DateKey {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function toISO(date: Date = new Date()): ISODateString {
  return date.toISOString();
}

/** Format a calorie value, e.g. 2150 -> "2,150 kcal". */
export function formatCalories(value: number): string {
  return `${Math.round(value).toLocaleString()} kcal`;
}

/** Format grams, e.g. 180 -> "180g". */
export function formatGrams(value: number): string {
  return `${Math.round(value)}g`;
}

/** Format weight in the requested unit system. */
export function formatWeight(kg: number, units: 'metric' | 'imperial'): string {
  if (units === 'imperial') {
    return `${(kg * 2.20462).toFixed(1)} lb`;
  }
  return `${kg.toFixed(1)} kg`;
}

/** Clamp a value to the 0–1 range (useful for progress bars). */
export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}
