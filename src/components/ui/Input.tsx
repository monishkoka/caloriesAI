import { TextInput, TextInputProps, View } from 'react-native';

import { Text } from './Text';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  className?: string;
}

/**
 * Labeled text field with an optional inline error message. Used across the
 * auth and onboarding forms.
 */
export function Input({
  label,
  error,
  className = '',
  ...rest
}: InputProps) {
  return (
    <View className={`gap-1.5 ${className}`}>
      {label ? <Text variant="label">{label}</Text> : null}
      <TextInput
        placeholderTextColor="#64748b"
        className={`h-12 rounded-2xl border bg-surface-muted px-4 text-base text-white ${
          error ? 'border-danger' : 'border-transparent'
        }`}
        {...rest}
      />
      {error ? (
        <Text variant="caption" className="text-danger">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
