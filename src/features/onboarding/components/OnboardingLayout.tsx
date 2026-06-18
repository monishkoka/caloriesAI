import { Ionicons } from '@expo/vector-icons';
import { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';

import { Button, ProgressBar, Screen, Text } from '@components';
import { ONBOARDING_TOTAL_STEPS } from '@features/onboarding/config';

interface OnboardingLayoutProps {
  title: string;
  subtitle?: string;
  /** 1-based index of the current data step (drives the progress bar). */
  stepIndex: number;
  totalSteps?: number;
  onBack?: () => void;
  onContinue: () => void;
  continueLabel?: string;
  continueDisabled?: boolean;
  loading?: boolean;
  children: ReactNode;
}

/**
 * Consistent chrome for every onboarding step: a back control, a progress bar,
 * a heading block, scrollable content and a sticky primary action. Centralizing
 * this keeps each step screen focused purely on its own fields.
 */
export function OnboardingLayout({
  title,
  subtitle,
  stepIndex,
  totalSteps = ONBOARDING_TOTAL_STEPS,
  onBack,
  onContinue,
  continueLabel = 'Continue',
  continueDisabled = false,
  loading = false,
  children,
}: OnboardingLayoutProps) {
  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <View className="flex-row items-center gap-3 pt-1">
          {onBack ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              hitSlop={8}
              onPress={onBack}
              className="h-9 w-9 items-center justify-center rounded-full bg-surface-elevated"
            >
              <Ionicons name="chevron-back" size={20} color="#e2e8f0" />
            </Pressable>
          ) : null}
          <ProgressBar
            progress={stepIndex / totalSteps}
            className="flex-1"
          />
          <Text variant="caption">{`${stepIndex} / ${totalSteps}`}</Text>
        </View>

        <View className="mt-8 gap-2">
          <Text variant="title">{title}</Text>
          {subtitle ? <Text variant="caption">{subtitle}</Text> : null}
        </View>

        <ScrollView
          className="mt-7 flex-1"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
        >
          {children}
        </ScrollView>

        <View className="pb-2 pt-3">
          <Button
            label={continueLabel}
            onPress={onContinue}
            disabled={continueDisabled}
            loading={loading}
          />
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}
