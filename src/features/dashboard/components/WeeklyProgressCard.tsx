import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import { Card, Text } from '@components';
import { GoalType, UnitSystem } from '@types';

interface WeeklyProgressCardProps {
  /** Expected weekly weight change in kg (negative = loss). */
  weeklyChangeKg: number;
  goalType: GoalType;
  units: UnitSystem;
}

/** "Expected Weekly Progress" — projected weekly weight change from the plan. */
export function WeeklyProgressCard({
  weeklyChangeKg,
  units,
}: WeeklyProgressCardProps) {
  const isMaintain = Math.abs(weeklyChangeKg) < 0.01;
  const losing = weeklyChangeKg < 0;

  const magnitude = Math.abs(weeklyChangeKg);
  const display =
    units === 'imperial' ? magnitude * 2.20462 : magnitude;
  const unitLabel = units === 'imperial' ? 'lb' : 'kg';

  const tint = isMaintain ? '#94a3b8' : losing ? '#22c55e' : '#3b82f6';
  const icon: keyof typeof Ionicons.glyphMap = isMaintain
    ? 'remove'
    : losing
      ? 'trending-down'
      : 'trending-up';

  const headline = isMaintain
    ? 'Maintain'
    : `${losing ? '−' : '+'}${display.toFixed(2)} ${unitLabel}`;

  const subtitle = isMaintain
    ? "You're set to hold your current weight."
    : `On track to ${losing ? 'lose' : 'gain'} about ${display.toFixed(
        2,
      )} ${unitLabel} each week.`;

  return (
    <Card className="p-5">
      <Text variant="heading">Expected Weekly Progress</Text>
      <View className="mt-4 flex-row items-center gap-4">
        <View
          className="h-14 w-14 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${tint}22` }}
        >
          <Ionicons name={icon} size={26} color={tint} />
        </View>
        <View className="flex-1">
          <Text variant="title" className="text-2xl" style={{ color: tint }}>
            {headline}
          </Text>
          <Text variant="caption" className="mt-1">
            {subtitle}
          </Text>
        </View>
      </View>
    </Card>
  );
}
