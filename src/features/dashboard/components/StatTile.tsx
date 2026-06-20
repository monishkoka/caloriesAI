import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import { Card, Text } from '@components';

interface StatTileProps {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
}

/** Compact labeled metric tile used in the dashboard stats row. */
export function StatTile({ label, value, icon }: StatTileProps) {
  return (
    <Card className="flex-1">
      <View className="mb-3 h-9 w-9 items-center justify-center rounded-lg bg-surface-muted">
        <Ionicons name={icon} size={18} color="#3b82f6" />
      </View>
      <Text variant="heading" className="text-xl">
        {value}
      </Text>
      <Text variant="caption">{label}</Text>
    </Card>
  );
}
