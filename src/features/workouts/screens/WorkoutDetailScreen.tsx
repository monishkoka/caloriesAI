import { PlaceholderScreen } from '@components';
import type { RootStackScreenProps } from '@navigation/types';

export function WorkoutDetailScreen({
  route,
}: RootStackScreenProps<'WorkoutDetail'>) {
  return (
    <PlaceholderScreen
      title="Workout Detail"
      subtitle={`Session ${route.params.workoutId} — exercises, sets and burn.`}
    />
  );
}
