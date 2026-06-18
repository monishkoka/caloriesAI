import { useState } from 'react';
import { View } from 'react-native';

import { OptionCard } from '@components';
import { GOAL_OPTIONS } from '@features/onboarding/config';
import { OnboardingLayout } from '@features/onboarding/components/OnboardingLayout';
import type { OnboardingStackScreenProps } from '@navigation/types';
import { useOnboardingStore } from '@store';
import { GoalType } from '@types';

export function GoalScreen({
  navigation,
}: OnboardingStackScreenProps<'Goal'>) {
  const { goals, updateGoals } = useOnboardingStore();
  const [goal, setGoal] = useState<GoalType | undefined>(goals.type);

  const handleContinue = () => {
    if (goal === undefined) {
      return;
    }
    updateGoals({ type: goal });
    navigation.navigate('Review');
  };

  return (
    <OnboardingLayout
      title="What's your goal?"
      subtitle="This sets the direction of your daily calorie target."
      stepIndex={4}
      onBack={() => navigation.goBack()}
      onContinue={handleContinue}
      continueDisabled={goal === undefined}
    >
      <View className="gap-3">
        {GOAL_OPTIONS.map((option) => (
          <OptionCard
            key={option.value}
            title={option.label}
            description={option.description}
            icon={option.icon}
            selected={goal === option.value}
            onPress={() => setGoal(option.value)}
          />
        ))}
      </View>
    </OnboardingLayout>
  );
}
