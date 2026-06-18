import { PlaceholderScreen } from '@components';
import type { MainTabScreenProps } from '@navigation/types';

export function DashboardScreen(_props: MainTabScreenProps<'Dashboard'>) {
  return (
    <PlaceholderScreen
      title="Dashboard"
      subtitle="Today's calories, macro rings, activity and AI insight cards."
    />
  );
}
