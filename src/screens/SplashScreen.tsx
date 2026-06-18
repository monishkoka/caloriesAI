import { ActivityIndicator, View } from 'react-native';

import { Text } from '@components';
import { APP_NAME } from '@utils/constants';

/**
 * Shown while the persisted auth session and user profile are resolving. The
 * RootNavigator swaps this out once `isInitializing` becomes false.
 */
export function SplashScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-6 bg-surface">
      <Text variant="display" className="text-brand-500">
        {APP_NAME}
      </Text>
      <ActivityIndicator color="#3b82f6" />
    </View>
  );
}
