import { PlaceholderScreen } from '@components';
import type { MainTabScreenProps } from '@navigation/types';

export function NutritionScreen(_props: MainTabScreenProps<'Nutrition'>) {
  return (
    <PlaceholderScreen
      title="Nutrition"
      subtitle="Food log by meal, macro targets and remaining budget."
    />
  );
}
