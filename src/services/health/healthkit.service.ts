import { Platform } from 'react-native';

import { DateKey, HealthAuthorizationStatus, HealthData } from '@types';
import { createLogger } from '@utils/logger';

const log = createLogger('HealthKitService');

/**
 * Apple HealthKit integration — PLACEHOLDER.
 *
 * Wraps `react-native-health` so the rest of the app depends on this stable
 * interface rather than the native module directly. HealthKit is iOS-only;
 * every method short-circuits on other platforms.
 *
 * The actual permission requests and queries are intentionally left as TODOs.
 */
const READ_PERMISSIONS = [
  'Steps',
  'ActiveEnergyBurned',
  'BasalEnergyBurned',
  'AppleExerciseTime',
  'HeartRate',
  'BodyMass',
  'SleepAnalysis',
] as const;

export const healthKitService = {
  isAvailable(): boolean {
    return Platform.OS === 'ios';
  },

  /** Request the read/write scopes the app needs. */
  async requestAuthorization(): Promise<HealthAuthorizationStatus> {
    log.debug('requestAuthorization (placeholder)', {
      scopes: READ_PERMISSIONS,
    });
    // TODO: AppleHealthKit.initHealthKit(permissions, callback)
    return {
      isAvailable: this.isAvailable(),
      isAuthorized: false,
      source: 'apple_health',
    };
  },

  /** Pull a day's aggregate health metrics. */
  async getDailyHealthData(_date: DateKey): Promise<HealthData | null> {
    log.debug('getDailyHealthData (placeholder)');
    // TODO: query steps / active energy / exercise minutes for the date.
    return null;
  },

  /** Pull body-weight samples between two dates. */
  async getWeightSamples(
    _startDate: DateKey,
    _endDate: DateKey,
  ): Promise<{ date: DateKey; weightKg: number }[]> {
    log.debug('getWeightSamples (placeholder)');
    // TODO: query BodyMass samples.
    return [];
  },
};

export type HealthKitService = typeof healthKitService;
