/**
 * Service layer barrel. The app depends on these stable service interfaces
 * rather than on third-party SDKs directly (Firebase, HealthKit, OpenAI),
 * keeping the integration boundary swappable and testable.
 */
export {
  authService,
  firestoreService,
  userProfileService,
  nutritionService,
  metricsService,
  collections,
} from './firebase';
export { openAiService } from './ai/openai.service';
export { healthKitService } from './health/healthkit.service';
