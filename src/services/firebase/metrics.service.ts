import { DailyMetrics, DateKey, ID } from '@types';

import { collections } from './collections';
import { firestoreService } from './firestore.service';

/**
 * Repository for the per-day rollup documents at
 * `users/{uid}/dailyMetrics/{YYYY-MM-DD}`. These power the dashboard's
 * "Today" cards with a single read per day.
 */
export const metricsService = {
  /** Read a single day's metrics, or null if nothing has been logged yet. */
  async getDay(uid: ID, dateKey: DateKey): Promise<DailyMetrics | null> {
    return firestoreService.getDocument<DailyMetrics>(
      collections.dailyMetricsDay(uid, dateKey),
    );
  },

  /** Subscribe to realtime updates for a single day. */
  subscribeDay(
    uid: ID,
    dateKey: DateKey,
    onChange: (metrics: DailyMetrics | null) => void,
  ): () => void {
    return firestoreService.subscribeDocument<DailyMetrics>(
      collections.dailyMetricsDay(uid, dateKey),
      onChange,
    );
  },
};

export type MetricsService = typeof metricsService;
