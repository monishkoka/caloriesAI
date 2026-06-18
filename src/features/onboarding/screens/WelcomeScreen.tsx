import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import { Button, Screen, Text } from '@components';
import type { OnboardingStackScreenProps } from '@navigation/types';

const HIGHLIGHTS = [
  { icon: 'flame', label: 'Personalized calorie & macro targets' },
  { icon: 'restaurant', label: 'Smart nutrition guidance' },
  { icon: 'sparkles', label: 'Your AI coach, available 24/7' },
] as const;

export function WelcomeScreen({
  navigation,
}: OnboardingStackScreenProps<'Welcome'>) {
  return (
    <Screen className="justify-between py-6">
      <View className="flex-1 justify-center gap-10">
        <View className="items-center gap-4">
          <View className="h-20 w-20 items-center justify-center rounded-3xl bg-brand-600">
            <Ionicons name="heart" size={40} color="#ffffff" />
          </View>
          <View className="items-center gap-2">
            <Text variant="display" className="text-center">
              Welcome to your{'\n'}AI Health Coach
            </Text>
            <Text variant="body" className="text-center text-slate-400">
              Let's set up your profile so we can tailor everything to your body
              and goals.
            </Text>
          </View>
        </View>

        <View className="gap-4">
          {HIGHLIGHTS.map((item) => (
            <View key={item.label} className="flex-row items-center gap-4">
              <View className="h-11 w-11 items-center justify-center rounded-xl bg-surface-elevated">
                <Ionicons name={item.icon} size={20} color="#3b82f6" />
              </View>
              <Text variant="body" className="flex-1">
                {item.label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <Button
        label="Get Started"
        onPress={() => navigation.navigate('BasicInfo')}
      />
    </Screen>
  );
}
