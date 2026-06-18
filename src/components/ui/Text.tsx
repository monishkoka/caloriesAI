import { Text as RNText, TextProps as RNTextProps } from 'react-native';

type Variant = 'display' | 'title' | 'heading' | 'body' | 'caption' | 'label';

const VARIANT_CLASSES: Record<Variant, string> = {
  display: 'text-3xl font-bold text-white',
  title: 'text-2xl font-bold text-white',
  heading: 'text-lg font-semibold text-white',
  body: 'text-base text-slate-200',
  caption: 'text-sm text-slate-400',
  label: 'text-xs font-medium uppercase tracking-wide text-slate-400',
};

interface TextProps extends RNTextProps {
  variant?: Variant;
  className?: string;
}

/**
 * Typographic primitive. Centralizes the type scale so screens compose text
 * by intent (`variant`) instead of repeating font utilities.
 */
export function Text({
  variant = 'body',
  className = '',
  ...rest
}: TextProps) {
  return <RNText className={`${VARIANT_CLASSES[variant]} ${className}`} {...rest} />;
}
