import { PlaceholderScreen } from '@components';
import type { MainTabScreenProps } from '@navigation/types';

export function ProfileScreen(_props: MainTabScreenProps<'Profile'>) {
  return (
    <PlaceholderScreen
      title="Profile"
      subtitle="Account, goals, units, health sync and sign out."
    />
  );
}
