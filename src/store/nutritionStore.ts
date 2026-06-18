import { create } from 'zustand';

import { DailyMetrics, DateKey, NutritionTargets, RequestStatus } from '@types';

/**
 * Caches the active nutrition targets and the currently-viewed day's metrics so
 * the dashboard and nutrition tabs can render without redundant reads.
 */
interface NutritionState {
  status: RequestStatus;
  targets: NutritionTargets | null;
  /** Daily metrics keyed by "YYYY-MM-DD" for quick lookups. */
  metricsByDate: Record<DateKey, DailyMetrics>;
  selectedDate: DateKey | null;
}

interface NutritionActions {
  setTargets: (targets: NutritionTargets | null) => void;
  setDailyMetrics: (metrics: DailyMetrics) => void;
  setSelectedDate: (date: DateKey) => void;
  setStatus: (status: RequestStatus) => void;
  reset: () => void;
}

const initialState: NutritionState = {
  status: 'idle',
  targets: null,
  metricsByDate: {},
  selectedDate: null,
};

export const useNutritionStore = create<
  NutritionState & NutritionActions
>((set) => ({
  ...initialState,
  setTargets: (targets) => set({ targets }),
  setDailyMetrics: (metrics) =>
    set((s) => ({
      metricsByDate: { ...s.metricsByDate, [metrics.date]: metrics },
    })),
  setSelectedDate: (selectedDate) => set({ selectedDate }),
  setStatus: (status) => set({ status }),
  reset: () => set(initialState),
}));
