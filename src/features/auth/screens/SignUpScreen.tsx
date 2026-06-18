import { PlaceholderScreen } from '@components';
import type { AuthStackScreenProps } from '@navigation/types';

export function SignUpScreen(_props: AuthStackScreenProps<'SignUp'>) {
  return (
    <PlaceholderScreen
      title="Create Account"
      subtitle="Registration form — wiring to authService.signUp()."
    />
  );
}
