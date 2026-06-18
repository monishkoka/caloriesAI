import { PlaceholderScreen } from '@components';
import type { MainTabScreenProps } from '@navigation/types';

export function ProgressScreen(_props: MainTabScreenProps<'Progress'>) {
  return (
    <PlaceholderScreen
      title="Progress"
      subtitle="Weight trend, adherence and health-data charts over time."
    />
  );
}
