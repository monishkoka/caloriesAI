import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
} from 'react-native';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps extends Omit<PressableProps, 'children'> {
  label: string;
  variant?: Variant;
  loading?: boolean;
  className?: string;
}

const CONTAINER: Record<Variant, string> = {
  primary: 'bg-brand-600 active:bg-brand-700',
  secondary: 'bg-surface-muted active:opacity-80',
  ghost: 'bg-transparent active:opacity-70',
  danger: 'bg-danger active:opacity-80',
};

const LABEL: Record<Variant, string> = {
  primary: 'text-white',
  secondary: 'text-white',
  ghost: 'text-brand-500',
  danger: 'text-white',
};

/**
 * Primary action button with variants and a loading state. Disabled while
 * loading to prevent duplicate submissions.
 */
export function Button({
  label,
  variant = 'primary',
  loading = false,
  disabled,
  className = '',
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      className={`h-12 flex-row items-center justify-center rounded-2xl px-5 ${
        CONTAINER[variant]
      } ${isDisabled ? 'opacity-50' : ''} ${className}`}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <Text className={`text-base font-semibold ${LABEL[variant]}`}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}
