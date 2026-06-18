import { ExpoConfig, ConfigContext } from 'expo/config';

/**
 * Dynamic Expo configuration.
 *
 * Secrets and environment-specific values are sourced from process.env so that
 * they can be injected by EAS / CI rather than committed to source control.
 * See `.env.example` for the full list of required variables.
 */
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'AI Health Coach',
  slug: 'ai-health-coach',
  scheme: 'aihealthcoach',
  version: '1.0.0',
  orientation: 'portrait',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  splash: {
    resizeMode: 'contain',
    backgroundColor: '#0B1120',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.aihealthcoach.app',
    infoPlist: {
      // HealthKit usage descriptions are required by App Review.
      NSHealthShareUsageDescription:
        'AI Health Coach reads your activity, workouts and body metrics to personalize your plan.',
      NSHealthUpdateUsageDescription:
        'AI Health Coach writes workouts and nutrition data back to Apple Health.',
    },
    entitlements: {
      'com.apple.developer.healthkit': true,
      'com.apple.developer.healthkit.access': [],
    },
  },
  android: {
    package: 'com.aihealthcoach.app',
    adaptiveIcon: {
      backgroundColor: '#0B1120',
    },
  },
  web: {
    bundler: 'metro',
    output: 'single',
  },
  plugins: [
    [
      'react-native-health',
      {
        healthSharePermission:
          'AI Health Coach reads your health data to personalize your coaching.',
        healthUpdatePermission:
          'AI Health Coach updates your health data with logged activity.',
      },
    ],
  ],
  extra: {
    // Public, non-secret runtime configuration. Consumed via `expo-constants`.
    firebase: {
      apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
    },
    openAi: {
      // NOTE: never ship a real OpenAI secret in the client. Proxy via a backend.
      apiBaseUrl: process.env.EXPO_PUBLIC_OPENAI_PROXY_URL,
    },
    eas: {
      projectId: process.env.EAS_PROJECT_ID,
    },
  },
});
