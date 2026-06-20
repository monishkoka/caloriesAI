import { ScrollView, View } from 'react-native';

import { PlaceholderScreen, Screen, Text } from '@components';
import { NutritionCard } from '@features/dashboard/components/NutritionCard';
import { StatTile } from '@features/dashboard/components/StatTile';
import { WeeklyProgressCard } from '@features/dashboard/components/WeeklyProgressCard';
import { WorkoutSummaryCard } from '@features/dashboard/components/WorkoutSummaryCard';
import { useNutritionPlan, useTodayMetrics } from '@hooks';
import type { MainTabScreenProps } from '@navigation/types';
import { useUserStore } from '@store';
import { GoalType, Macros } from '@types';
import { estimateWeeklyWeightChangeKg } from '@utils/calories';
import { formatCalories, formatWeight } from '@utils/formatters';

const GOAL_LABELS: Record<GoalType, string> = {
  lose_fat: 'Lose Fat',
  maintain: 'Maintain',
  build_muscle: 'Gain Muscle',
  recomp: 'Recomp',
};

const EMPTY_MACROS: Macros = { proteinG: 0, carbsG: 0, fatG: 0 };

function greeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) {
    return 'Good morning';
  }
  if (hour < 18) {
    return 'Good afternoon';
  }
  return 'Good evening';
}

export function DashboardScreen(_props: MainTabScreenProps<'Dashboard'>) {
  const { plan, targets, hasProfile } = useNutritionPlan();
  const metrics = useTodayMetrics();

  const profile = useUserStore((s) => s.profile);
  const goalType = profile?.goals?.type;
  const units = profile?.preferences?.units ?? 'metric';
  const currentWeightKg = profile?.body?.currentWeightKg;

  if (!hasProfile || !plan || !targets || !goalType || currentWeightKg === undefined) {
    return (
      <PlaceholderScreen
        title="Dashboard"
        subtitle="Complete your profile to unlock your personalized dashboard."
      />
    );
  }

  const consumedCalories = metrics?.caloriesConsumed ?? 0;
  const consumedMacros = metrics?.macrosConsumed ?? EMPTY_MACROS;
  const caloriesBurned = metrics?.caloriesBurned ?? 0;
  const workoutMinutes = metrics?.workoutMinutes ?? 0;
  const weeklyChangeKg = estimateWeeklyWeightChangeKg(targets.calorieAdjustment);

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 16, gap: 16 }}
      >
        <View className="gap-1">
          <Text variant="caption">{greeting()}</Text>
          <Text variant="title">{profile?.displayName || 'Welcome back'}</Text>
        </View>

        {/* Top-line stats */}
        <View className="flex-row gap-3">
          <StatTile
            label="Current Weight"
            value={formatWeight(currentWeightKg, units)}
            icon="body"
          />
          <StatTile
            label="Goal"
            value={GOAL_LABELS[goalType]}
            icon="flag"
          />
        </View>

        <NutritionCard
          targetCalories={targets.targetCalories}
          consumedCalories={consumedCalories}
          targetMacros={targets.macros}
          consumedMacros={consumedMacros}
        />

        <View className="flex-row gap-3">
          <StatTile
            label="Maintenance"
            value={formatCalories(plan.maintenanceCalories)}
            icon="flame"
          />
          <StatTile
            label="Target"
            value={formatCalories(targets.targetCalories)}
            icon="locate"
          />
        </View>

        <WorkoutSummaryCard
          durationMinutes={workoutMinutes}
          caloriesBurned={caloriesBurned}
        />

        <WeeklyProgressCard
          weeklyChangeKg={weeklyChangeKg}
          goalType={goalType}
          units={units}
        />
      </ScrollView>
    </Screen>
  );
}
