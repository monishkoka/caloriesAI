import { Ionicons } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';

import { Text } from './Text';

interface OptionCardProps {
  title: string;
  description?: string;
  selected: boolean;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
}

/**
 * Large, tappable selection card used for single-choice steps (gender,
 * activity level, goal). Highlights its border and shows a check when selected.
 */
export function OptionCard({
  title,
  description,
  selected,
  onPress,
  icon,
}: OptionCardProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={onPress}
      className={`flex-row items-center gap-4 rounded-2xl border p-4 ${
        selected
          ? 'border-brand-500 bg-brand-500/10'
          : 'border-surface-muted bg-surface-elevated'
      }`}
    >
      {icon ? (
        <View
          className={`h-11 w-11 items-center justify-center rounded-xl ${
            selected ? 'bg-brand-500' : 'bg-surface-muted'
          }`}
        >
          <Ionicons
            name={icon}
            size={22}
            color={selected ? '#ffffff' : '#94a3b8'}
          />
        </View>
      ) : null}

      <View className="flex-1">
        <Text variant="heading" className="text-base">
          {title}
        </Text>
        {description ? (
          <Text variant="caption" className="mt-0.5">
            {description}
          </Text>
        ) : null}
      </View>

      <Ionicons
        name={selected ? 'checkmark-circle' : 'ellipse-outline'}
        size={24}
        color={selected ? '#3b82f6' : '#475569'}
      />
    </Pressable>
  );
}
