import { View } from 'react-native';

import { clamp01 } from '@utils/formatters';

interface ProgressBarProps {
  /** Completion fraction in the 0–1 range. */
  progress: number;
  /** Optional fill color; defaults to the brand color. */
  color?: string;
  className?: string;
}

/**
 * Slim, rounded progress track. Width (and optional fill color) are driven via
 * inline style since they are dynamic.
 */
export function ProgressBar({
  progress,
  color,
  className = '',
}: ProgressBarProps) {
  const pct = clamp01(progress) * 100;
  return (
    <View className={`h-2 overflow-hidden rounded-full bg-surface-muted ${className}`}>
      <View
        className={`h-full rounded-full ${color ? '' : 'bg-brand-500'}`}
        style={{ width: `${pct}%`, ...(color ? { backgroundColor: color } : {}) }}
      />
    </View>
  );
}
