import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import { Card, Text } from '@components';
import {
  ACTIVITY_LABELS,
  GENDER_LABELS,
  GOAL_LABELS,
} from '@features/onboarding/config';
import { OnboardingLayout } from '@features/onboarding/components/OnboardingLayout';
import { useOnboarding } from '@features/onboarding/hooks/useOnboarding';
import type { OnboardingStackScreenProps } from '@navigation/types';
import { useOnboardingStore } from '@store';

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-center justify-between py-3">
      <Text variant="caption">{label}</Text>
      <Text variant="body" className="font-medium">
        {value}
      </Text>
    </View>
  );
}

export function ReviewScreen({
  navigation,
}: OnboardingStackScreenProps<'Review'>) {
  const { displayName, body, goals } = useOnboardingStore();
  const { submit, isSubmitting, error } = useOnboarding();

  const handleFinish = async () => {
    // On success RootNavigator swaps to the Main tabs (Dashboard) automatically.
    await submit();
  };

  const fmt = (v: number | undefined, unit: string) =>
    v === undefined ? '—' : `${v} ${unit}`;

  return (
    <OnboardingLayout
      title="You're all set"
      subtitle="Review your details — you can change these anytime in your profile."
      stepIndex={5}
      onBack={() => navigation.goBack()}
      onContinue={handleFinish}
      continueLabel="Finish & Go to Dashboard"
      loading={isSubmitting}
    >
      <View className="gap-4">
        <Card className="px-4 py-1">
          <SummaryRow label="Name" value={displayName || '—'} />
          <View className="h-px bg-surface-muted" />
          <SummaryRow
            label="Gender"
            value={body.sex ? GENDER_LABELS[body.sex] : '—'}
          />
          <View className="h-px bg-surface-muted" />
          <SummaryRow label="Age" value={fmt(body.age, 'yrs')} />
          <View className="h-px bg-surface-muted" />
          <SummaryRow label="Height" value={fmt(body.heightCm, 'cm')} />
          <View className="h-px bg-surface-muted" />
          <SummaryRow
            label="Weight"
            value={fmt(body.currentWeightKg, 'kg')}
          />
          <View className="h-px bg-surface-muted" />
          <SummaryRow
            label="Activity"
            value={
              goals.activityLevel ? ACTIVITY_LABELS[goals.activityLevel] : '—'
            }
          />
          <View className="h-px bg-surface-muted" />
          <SummaryRow
            label="Goal"
            value={goals.type ? GOAL_LABELS[goals.type] : '—'}
          />
        </Card>

        {error ? (
          <View className="flex-row items-center gap-2 rounded-xl bg-danger/10 p-3">
            <Ionicons name="alert-circle" size={18} color="#ef4444" />
            <Text variant="caption" className="flex-1 text-danger">
              {error}
            </Text>
          </View>
        ) : null}
      </View>
    </OnboardingLayout>
  );
}
