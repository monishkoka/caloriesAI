import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  ForgotPasswordScreen,
  LoginScreen,
  SignUpScreen,
} from '@features/auth';

import type { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

/** Unauthenticated flow: sign in, register, recover password. */
export function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}
