import { ReactNode } from 'react';
import { View } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';

interface ScreenProps {
  children: ReactNode;
  /** Tailwind classes appended to the content container. */
  className?: string;
  /** Which safe-area edges to inset. Defaults to all. */
  edges?: Edge[];
}

/**
 * Base screen wrapper. Applies the app background and safe-area insets so every
 * screen has a consistent, notch-aware layout shell.
 */
export function Screen({
  children,
  className = '',
  edges = ['top', 'bottom', 'left', 'right'],
}: ScreenProps) {
  return (
    <SafeAreaView edges={edges} className="flex-1 bg-surface">
      <View className={`flex-1 px-5 ${className}`}>{children}</View>
    </SafeAreaView>
  );
}
