import Constants from 'expo-constants';

/**
 * Typed, centralized access to runtime configuration injected via
 * `app.config.ts` (`extra`) and `EXPO_PUBLIC_*` environment variables.
 *
 * Read config exclusively through this module so the rest of the codebase
 * never touches `process.env` or `Constants.expoConfig` directly.
 */
interface FirebaseEnv {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

interface OpenAiEnv {
  apiBaseUrl: string;
}

interface AppEnv {
  firebase: FirebaseEnv;
  openAi: OpenAiEnv;
  isDev: boolean;
}

const extra = (Constants.expoConfig?.extra ?? {}) as {
  firebase?: Partial<FirebaseEnv>;
  openAi?: Partial<OpenAiEnv>;
};

const firebase = extra.firebase ?? {};
const openAi = extra.openAi ?? {};

export const env: AppEnv = {
  firebase: {
    apiKey: firebase.apiKey ?? '',
    authDomain: firebase.authDomain ?? '',
    projectId: firebase.projectId ?? '',
    storageBucket: firebase.storageBucket ?? '',
    messagingSenderId: firebase.messagingSenderId ?? '',
    appId: firebase.appId ?? '',
  },
  openAi: {
    apiBaseUrl: openAi.apiBaseUrl ?? '',
  },
  isDev: __DEV__,
};

/**
 * Returns true when the Firebase config appears fully populated. Useful to
 * guard against running against an unconfigured environment.
 */
export function isFirebaseConfigured(): boolean {
  return Object.values(env.firebase).every((v) => v.length > 0);
}
