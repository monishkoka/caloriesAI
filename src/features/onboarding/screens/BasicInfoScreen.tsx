import { useState } from 'react';
import { View } from 'react-native';

import { Input, OptionCard, Text } from '@components';
import { GENDER_OPTIONS } from '@features/onboarding/config';
import { OnboardingLayout } from '@features/onboarding/components/OnboardingLayout';
import type { OnboardingStackScreenProps } from '@navigation/types';
import { useOnboardingStore } from '@store';
import { Sex } from '@types';
import { isNonEmpty } from '@utils/validators';

export function BasicInfoScreen({
  navigation,
}: OnboardingStackScreenProps<'BasicInfo'>) {
  const { displayName, body, setName, updateBody } = useOnboardingStore();
  const [name, setLocalName] = useState(displayName);
  const [sex, setSex] = useState<Sex | undefined>(body.sex);

  const isValid = isNonEmpty(name) && sex !== undefined;

  const handleContinue = () => {
    if (!isValid) {
      return;
    }
    setName(name.trim());
    updateBody({ sex });
    navigation.navigate('BodyMetrics');
  };

  return (
    <OnboardingLayout
      title="About you"
      subtitle="First, the basics. We'll use these to greet you and tune your plan."
      stepIndex={1}
      onBack={() => navigation.goBack()}
      onContinue={handleContinue}
      continueDisabled={!isValid}
    >
      <View className="gap-7">
        <Input
          label="Your name"
          placeholder="e.g. Alex"
          value={name}
          onChangeText={setLocalName}
          autoCapitalize="words"
          returnKeyType="next"
        />

        <View className="gap-3">
          <Text variant="label">Gender</Text>
          {GENDER_OPTIONS.map((option) => (
            <OptionCard
              key={option.value}
              title={option.label}
              icon={option.icon}
              selected={sex === option.value}
              onPress={() => setSex(option.value)}
            />
          ))}
        </View>
      </View>
    </OnboardingLayout>
  );
}
