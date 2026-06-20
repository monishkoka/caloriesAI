import { ReactNode } from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { clamp01 } from '@utils/formatters';

interface ProgressRingProps {
  /** Completion fraction in the 0–1 range. */
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  /** Centered content (e.g. a value + label). */
  children?: ReactNode;
}

/**
 * Circular progress indicator (Apple Activity-ring style) built on SVG.
 * Rotated −90° so progress sweeps clockwise from the top.
 */
export function ProgressRing({
  progress,
  size = 200,
  strokeWidth = 16,
  color = '#3b82f6',
  trackColor = '#1c2740',
  children,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clamp01(progress));

  return (
    <View
      style={{ width: size, height: size }}
      className="items-center justify-center"
    >
      <Svg
        width={size}
        height={size}
        style={{ position: 'absolute', transform: [{ rotate: '-90deg' }] }}
      >
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
      <View className="items-center justify-center">{children}</View>
    </View>
  );
}
