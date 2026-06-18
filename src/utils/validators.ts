/**
 * Lightweight, dependency-free validation helpers used by forms (auth,
 * onboarding). Swap for a schema library (zod/yup) later if needed.
 */
import { AGE_RANGE, HEIGHT_CM_RANGE, WEIGHT_KG_RANGE } from './constants';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

export function isValidPassword(password: string): boolean {
  // Minimum baseline; tighten per security requirements.
  return password.length >= 8;
}

export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

export function isPositiveNumber(value: number): boolean {
  return Number.isFinite(value) && value > 0;
}

export function isInRange(value: number, min: number, max: number): boolean {
  return Number.isFinite(value) && value >= min && value <= max;
}

// --- Onboarding biometric validators ---------------------------------------

export function isValidAge(age: number): boolean {
  return Number.isInteger(age) && isInRange(age, AGE_RANGE.min, AGE_RANGE.max);
}

export function isValidHeightCm(heightCm: number): boolean {
  return isInRange(heightCm, HEIGHT_CM_RANGE.min, HEIGHT_CM_RANGE.max);
}

export function isValidWeightKg(weightKg: number): boolean {
  return isInRange(weightKg, WEIGHT_KG_RANGE.min, WEIGHT_KG_RANGE.max);
}

/** Parses a numeric form field, returning null when not a finite number. */
export function parseNumeric(value: string): number | null {
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return null;
  }
  const n = Number(trimmed);
  return Number.isFinite(n) ? n : null;
}
