import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import { Card, Text } from '@components';
import { formatCalories } from '@utils/formatters';

interface WorkoutSummaryCardProps {
  durationMinutes: number;
  caloriesBurned: number;
}

function Metric({
  icon,
  value,
  label,
  tint,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
  label: string;
  tint: string;
}) {
  return (
    <View className="flex-1 gap-2">
      <View
        className="h-10 w-10 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${tint}22` }}
      >
        <Ionicons name={icon} size={20} color={tint} />
      </View>
      <Text variant="heading" className="text-xl">
        {value}
      </Text>
      <Text variant="caption">{label}</Text>
    </View>
  );
}

/** "Workout Summary" — duration and calories burned for the day. */
export function WorkoutSummaryCard({
  durationMinutes,
  caloriesBurned,
}: WorkoutSummaryCardProps) {
  return (
    <Card className="p-5">
      <Text variant="heading">Workout Summary</Text>
      <View className="mt-4 flex-row gap-4">
        <Metric
          icon="time-outline"
          value={`${Math.round(durationMinutes)} min`}
          label="Duration"
          tint="#3b82f6"
        />
        <View className="w-px bg-surface-muted" />
        <Metric
          icon="flame-outline"
          value={formatCalories(caloriesBurned)}
          label="Calories Burned"
          tint="#f59e0b"
        />
      </View>
    </Card>
  );
}
