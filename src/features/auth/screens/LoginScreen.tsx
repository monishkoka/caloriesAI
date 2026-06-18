import { PlaceholderScreen } from '@components';
import type { AuthStackScreenProps } from '@navigation/types';

export function LoginScreen(_props: AuthStackScreenProps<'Login'>) {
  return (
    <PlaceholderScreen
      title="Sign In"
      subtitle="Email/password login form — wiring to authService.signIn()."
    />
  );
}
