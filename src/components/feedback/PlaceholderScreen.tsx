import { ReactNode } from 'react';
import { View } from 'react-native';

import { Screen } from '@components/ui/Screen';
import { Text } from '@components/ui/Text';

interface PlaceholderScreenProps {
  title: string;
  subtitle?: string;
  /** Optional content rendered below the heading (actions, notes, etc.). */
  children?: ReactNode;
}

/**
 * Temporary scaffolding screen. Every feature screen renders this until real UI
 * and business logic are implemented, so the full navigation graph is
 * walkable from day one.
 */
export function PlaceholderScreen({
  title,
  subtitle,
  children,
}: PlaceholderScreenProps) {
  return (
    <Screen className="items-center justify-center">
      <View className="items-center gap-3">
        <Text variant="title" className="text-center">
          {title}
        </Text>
        {subtitle ? (
          <Text variant="caption" className="text-center">
            {subtitle}
          </Text>
        ) : null}
        {children}
      </View>
    </Screen>
  );
}
