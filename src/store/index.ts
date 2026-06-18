/**
 * Zustand store barrel. Stores are pure state containers; orchestration and
 * side effects live in hooks (`@hooks`).
 */
export { useAuthStore, selectIsAuthenticated } from './authStore';
export { useUserStore, selectOnboardingCompleted } from './userStore';
export { useOnboardingStore } from './onboardingStore';
export { useNutritionStore } from './nutritionStore';
