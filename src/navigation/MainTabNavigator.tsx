import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AICoachScreen } from '@features/aiCoach';
import { DashboardScreen } from '@features/dashboard';
import { ProgressScreen } from '@features/health';
import { NutritionScreen } from '@features/nutrition';
import { ProfileScreen } from '@features/profile';

import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

/** Maps each tab to its Ionicons glyph. */
const TAB_ICONS: Record<
  keyof MainTabParamList,
  keyof typeof Ionicons.glyphMap
> = {
  Dashboard: 'home',
  Nutrition: 'restaurant',
  Progress: 'trending-up',
  AICoach: 'sparkles',
  Profile: 'person',
};

/** The authenticated, onboarded experience: five primary tabs. */
export function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#64748b',
        tabBarStyle: {
          backgroundColor: '#111a2e',
          borderTopColor: '#1c2740',
        },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={TAB_ICONS[route.name]} size={size} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Nutrition" component={NutritionScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
      <Tab.Screen
        name="AICoach"
        component={AICoachScreen}
        options={{ title: 'AI Coach' }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
