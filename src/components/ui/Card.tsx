import { ReactNode } from 'react';
import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  children: ReactNode;
  className?: string;
}

/**
 * Elevated content surface used to group related information on dashboards and
 * detail screens.
 */
export function Card({ children, className = '', ...rest }: CardProps) {
  return (
    <View
      className={`rounded-2xl bg-surface-elevated p-4 ${className}`}
      {...rest}
    >
      {children}
    </View>
  );
}
