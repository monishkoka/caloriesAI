import { useEffect } from 'react';

import { metricsService } from '@services';
import { useAuthStore, useNutritionStore } from '@store';
import { DailyMetrics } from '@types';
import { todayKey } from '@utils/formatters';

/**
 * Subscribes to the current user's metrics document for today and mirrors it
 * into the nutrition store. Returns the day's metrics, or null when nothing has
 * been logged yet (the dashboard renders zeroed states in that case).
 */
export function useTodayMetrics(): DailyMetrics | null {
  const uid = useAuthStore((s) => s.user?.uid);
  const date = todayKey();
  const metrics = useNutritionStore((s) => s.metricsByDate[date] ?? null);
  const setDailyMetrics = useNutritionStore((s) => s.setDailyMetrics);

  useEffect(() => {
    if (!uid) {
      return;
    }
    return metricsService.subscribeDay(uid, date, (next) => {
      if (next) {
        setDailyMetrics(next);
      }
    });
  }, [uid, date, setDailyMetrics]);

  return metrics;
}
