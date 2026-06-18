import { useState } from 'react';
import { View } from 'react-native';

import { Input } from '@components';
import { OnboardingLayout } from '@features/onboarding/components/OnboardingLayout';
import type { OnboardingStackScreenProps } from '@navigation/types';
import { useOnboardingStore } from '@store';
import { AGE_RANGE, HEIGHT_CM_RANGE, WEIGHT_KG_RANGE } from '@utils/constants';
import {
  isValidAge,
  isValidHeightCm,
  isValidWeightKg,
  parseNumeric,
} from '@utils/validators';

/** Returns an error string when the field is filled but invalid. */
function fieldError(raw: string, isValid: (n: number) => boolean, msg: string) {
  if (raw.trim().length === 0) {
    return undefined;
  }
  const n = parseNumeric(raw);
  return n !== null && isValid(n) ? undefined : msg;
}

export function BodyMetricsScreen({
  navigation,
}: OnboardingStackScreenProps<'BodyMetrics'>) {
  const { body, updateBody } = useOnboardingStore();
  const [age, setAge] = useState(body.age ? String(body.age) : '');
  const [height, setHeight] = useState(
    body.heightCm ? String(body.heightCm) : '',
  );
  const [weight, setWeight] = useState(
    body.currentWeightKg ? String(body.currentWeightKg) : '',
  );

  const ageError = fieldError(
    age,
    isValidAge,
    `Enter an age between ${AGE_RANGE.min} and ${AGE_RANGE.max}.`,
  );
  const heightError = fieldError(
    height,
    isValidHeightCm,
    `Enter a height between ${HEIGHT_CM_RANGE.min} and ${HEIGHT_CM_RANGE.max} cm.`,
  );
  const weightError = fieldError(
    weight,
    isValidWeightKg,
    `Enter a weight between ${WEIGHT_KG_RANGE.min} and ${WEIGHT_KG_RANGE.max} kg.`,
  );

  const ageNum = parseNumeric(age);
  const heightNum = parseNumeric(height);
  const weightNum = parseNumeric(weight);
  const isValid =
    ageNum !== null &&
    isValidAge(ageNum) &&
    heightNum !== null &&
    isValidHeightCm(heightNum) &&
    weightNum !== null &&
    isValidWeightKg(weightNum);

  const handleContinue = () => {
    if (!isValid || ageNum === null || heightNum === null || weightNum === null) {
      return;
    }
    updateBody({
      age: ageNum,
      heightCm: heightNum,
      currentWeightKg: weightNum,
    });
    navigation.navigate('ActivityLevel');
  };

  return (
    <OnboardingLayout
      title="Your measurements"
      subtitle="Used to calculate your maintenance calories and macro targets."
      stepIndex={2}
      onBack={() => navigation.goBack()}
      onContinue={handleContinue}
      continueDisabled={!isValid}
    >
      <View className="gap-6">
        <Input
          label="Age"
          placeholder="years"
          value={age}
          onChangeText={setAge}
          keyboardType="number-pad"
          maxLength={3}
          error={ageError}
        />
        <Input
          label="Height (cm)"
          placeholder="centimeters"
          value={height}
          onChangeText={setHeight}
          keyboardType="decimal-pad"
          maxLength={5}
          error={heightError}
        />
        <Input
          label="Weight (kg)"
          placeholder="kilograms"
          value={weight}
          onChangeText={setWeight}
          keyboardType="decimal-pad"
          maxLength={5}
          error={weightError}
        />
      </View>
    </OnboardingLayout>
  );
}
