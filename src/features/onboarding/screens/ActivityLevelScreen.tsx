import { useState } from 'react';
import { View } from 'react-native';

import { OptionCard } from '@components';
import { ACTIVITY_OPTIONS } from '@features/onboarding/config';
import { OnboardingLayout } from '@features/onboarding/components/OnboardingLayout';
import type { OnboardingStackScreenProps } from '@navigation/types';
import { useOnboardingStore } from '@store';
import { ActivityLevel } from '@types';

export function ActivityLevelScreen({
  navigation,
}: OnboardingStackScreenProps<'ActivityLevel'>) {
  const { goals, updateGoals } = useOnboardingStore();
  const [level, setLevel] = useState<ActivityLevel | undefined>(
    goals.activityLevel,
  );

  const handleContinue = () => {
    if (level === undefined) {
      return;
    }
    updateGoals({ activityLevel: level });
    navigation.navigate('Goal');
  };

  return (
    <OnboardingLayout
      title="How active are you?"
      subtitle="Pick the option that best matches a typical week."
      stepIndex={3}
      onBack={() => navigation.goBack()}
      onContinue={handleContinue}
      continueDisabled={level === undefined}
    >
      <View className="gap-3">
        {ACTIVITY_OPTIONS.map((option) => (
          <OptionCard
            key={option.value}
            title={option.label}
            description={option.description}
            icon={option.icon}
            selected={level === option.value}
            onPress={() => setLevel(option.value)}
          />
        ))}
      </View>
    </OnboardingLayout>
  );
}
