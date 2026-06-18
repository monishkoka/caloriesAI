import { View } from 'react-native';

import { clamp01 } from '@utils/formatters';

interface ProgressBarProps {
  /** Completion fraction in the 0–1 range. */
  progress: number;
  className?: string;
}

/**
 * Slim, rounded progress track used by the onboarding wizard header.
 * Width is driven via inline style since the fill percentage is dynamic.
 */
export function ProgressBar({ progress, className = '' }: ProgressBarProps) {
  const pct = clamp01(progress) * 100;
  return (
    <View className={`h-2 overflow-hidden rounded-full bg-surface-muted ${className}`}>
      <View
        className="h-full rounded-full bg-brand-500"
        style={{ width: `${pct}%` }}
      />
    </View>
  );
}
