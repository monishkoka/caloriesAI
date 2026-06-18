import { PlaceholderScreen } from '@components';
import type { RootStackScreenProps } from '@navigation/types';

/**
 * Workouts list. Reachable from the dashboard; not a primary tab. Tapping a
 * session navigates to `WorkoutDetail`.
 */
export function WorkoutsScreen(_props: RootStackScreenProps<'Main'>) {
  return (
    <PlaceholderScreen
      title="Workouts"
      subtitle="Logged sessions with estimated calories burned."
    />
  );
}
