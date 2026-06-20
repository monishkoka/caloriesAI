import { View } from 'react-native';

import { Card, ProgressBar, ProgressRing, Text } from '@components';
import { Macros } from '@types';
import { formatCalories, formatGrams } from '@utils/formatters';

interface NutritionCardProps {
  targetCalories: number;
  consumedCalories: number;
  targetMacros: Macros;
  consumedMacros: Macros;
}

const MACRO_META = [
  { key: 'proteinG', label: 'Protein', color: '#3b82f6' },
  { key: 'carbsG', label: 'Carbs', color: '#22c55e' },
  { key: 'fatG', label: 'Fat', color: '#f59e0b' },
] as const;

/**
 * "Today's Nutrition" — a calorie ring showing remaining kcal plus per-macro
 * consumed/target progress.
 */
export function NutritionCard({
  targetCalories,
  consumedCalories,
  targetMacros,
  consumedMacros,
}: NutritionCardProps) {
  const remaining = Math.max(0, Math.round(targetCalories - consumedCalories));
  const ringProgress = targetCalories > 0 ? consumedCalories / targetCalories : 0;

  return (
    <Card className="p-5">
      <View className="flex-row items-center justify-between">
        <Text variant="heading">Today's Nutrition</Text>
        <Text variant="caption">{formatCalories(targetCalories)} goal</Text>
      </View>

      <View className="mt-5 flex-row items-center gap-5">
        <ProgressRing progress={ringProgress} size={132} strokeWidth={13}>
          <Text className="text-3xl font-bold text-white">
            {remaining.toLocaleString()}
          </Text>
          <Text variant="caption">remaining</Text>
        </ProgressRing>

        <View className="flex-1 gap-4">
          <View>
            <Text variant="label">Consumed</Text>
            <Text variant="heading" className="text-lg">
              {formatCalories(consumedCalories)}
            </Text>
          </View>
          <View className="h-px bg-surface-muted" />
          <View>
            <Text variant="label">Remaining</Text>
            <Text variant="heading" className="text-lg text-brand-500">
              {formatCalories(remaining)}
            </Text>
          </View>
        </View>
      </View>

      <View className="mt-6 gap-4">
        {MACRO_META.map((m) => {
          const consumed = consumedMacros[m.key];
          const target = targetMacros[m.key];
          const progress = target > 0 ? consumed / target : 0;
          return (
            <View key={m.key} className="gap-2">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                  <View
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: m.color }}
                  />
                  <Text variant="body" className="font-medium">
                    {m.label}
                  </Text>
                </View>
                <Text variant="caption">
                  {formatGrams(consumed)} / {formatGrams(target)}
                </Text>
              </View>
              <ProgressBar progress={progress} color={m.color} />
            </View>
          );
        })}
      </View>
    </Card>
  );
}
