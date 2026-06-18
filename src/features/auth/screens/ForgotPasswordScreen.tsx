import { PlaceholderScreen } from '@components';
import type { AuthStackScreenProps } from '@navigation/types';

export function ForgotPasswordScreen(
  _props: AuthStackScreenProps<'ForgotPassword'>,
) {
  return (
    <PlaceholderScreen
      title="Reset Password"
      subtitle="Email entry — wiring to authService.sendPasswordReset()."
    />
  );
}
