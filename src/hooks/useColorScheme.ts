import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * Thin wrapper over RN's color scheme hook. Defaults to dark to match the
 * app's design language. Centralized so theming can be extended later
 * (e.g. user-selectable themes persisted in preferences).
 */
export function useColorScheme(): 'light' | 'dark' {
  return useRNColorScheme() ?? 'dark';
}
