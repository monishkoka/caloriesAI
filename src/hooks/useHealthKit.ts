import { useCallback, useState } from 'react';

import { healthKitService } from '@services';
import { HealthAuthorizationStatus } from '@types';

/**
 * React surface over the HealthKit service. Exposes availability,
 * authorization state and a request action to screens (e.g. onboarding health
 * permissions, profile sync toggle).
 *
 * Data-sync logic is intentionally not implemented yet — scaffolding only.
 */
export function useHealthKit() {
  const [status, setStatus] = useState<HealthAuthorizationStatus>({
    isAvailable: healthKitService.isAvailable(),
    isAuthorized: false,
    source: 'apple_health',
  });
  const [isRequesting, setIsRequesting] = useState(false);

  const requestAuthorization = useCallback(async () => {
    setIsRequesting(true);
    try {
      const next = await healthKitService.requestAuthorization();
      setStatus(next);
      return next;
    } finally {
      setIsRequesting(false);
    }
  }, []);

  return {
    ...status,
    isRequesting,
    requestAuthorization,
  };
}
