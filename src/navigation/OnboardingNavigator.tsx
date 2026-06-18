import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  ActivityLevelScreen,
  BasicInfoScreen,
  BodyMetricsScreen,
  GoalScreen,
  ReviewScreen,
  WelcomeScreen,
} from '@features/onboarding';

import type { OnboardingStackParamList } from './types';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

/**
 * Post-signup wizard that collects name, body metrics, activity level and goal,
 * then persists them to Firestore and flips `onboardingCompleted` — which
 * unlocks the main app (Dashboard).
 */
export function OnboardingNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="BasicInfo" component={BasicInfoScreen} />
      <Stack.Screen name="BodyMetrics" component={BodyMetricsScreen} />
      <Stack.Screen name="ActivityLevel" component={ActivityLevelScreen} />
      <Stack.Screen name="Goal" component={GoalScreen} />
      <Stack.Screen name="Review" component={ReviewScreen} />
    </Stack.Navigator>
  );
}
