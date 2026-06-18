import {
  DarkTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { WorkoutDetailScreen } from '@features/workouts';
import { useAuth } from '@hooks';
import { SplashScreen } from '@screens/SplashScreen';
import { useUserStore } from '@store';

import { AuthNavigator } from './AuthNavigator';
import { MainTabNavigator } from './MainTabNavigator';
import { OnboardingNavigator } from './OnboardingNavigator';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

/** App-wide navigation theme aligned with the Tailwind surface palette. */
const navTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#0b1120',
    card: '#111a2e',
    primary: '#3b82f6',
    text: '#ffffff',
    border: '#1c2740',
  },
};

/**
 * Top-level router. Selects the active flow based on the resolved auth and
 * onboarding state:
 *
 *   initializing            -> Splash
 *   signed out              -> Auth
 *   signed in, not onboarded-> Onboarding
 *   signed in, onboarded    -> Main (tabs) + detail/modal routes
 */
export function RootNavigator() {
  const { isAuthenticated, isInitializing } = useAuth();
  const onboardingCompleted = useUserStore(
    (s) => s.profile?.onboardingCompleted ?? false,
  );

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isInitializing ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : !isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : !onboardingCompleted ? (
          <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabNavigator} />
            <Stack.Screen
              name="WorkoutDetail"
              component={WorkoutDetailScreen}
              options={{ presentation: 'modal', headerShown: true, title: '' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
