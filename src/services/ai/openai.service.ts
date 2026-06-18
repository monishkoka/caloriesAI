import { CoachInsight, CoachMessage } from '@types';
import { env } from '@utils/env';
import { createLogger } from '@utils/logger';

const log = createLogger('OpenAIService');

/**
 * AI coaching service — PLACEHOLDER.
 *
 * IMPORTANT: The OpenAI API key must never live in the client. All requests go
 * through a backend proxy (`env.openAi.apiBaseUrl`) that injects the secret,
 * enforces rate limits and strips PII. The methods below define the contract
 * the UI codes against; real network/streaming logic is intentionally omitted.
 */
export interface ChatCompletionParams {
  messages: Pick<CoachMessage, 'role' | 'content'>[];
  /** Optional structured context (targets, recent metrics) for grounding. */
  context?: Record<string, unknown>;
}

export const openAiService = {
  /** Whether the AI backend is configured for the current environment. */
  isConfigured(): boolean {
    return env.openAi.apiBaseUrl.length > 0;
  },

  /** Send a chat turn and resolve with the assistant's reply. */
  async sendChatMessage(_params: ChatCompletionParams): Promise<string> {
    log.debug('sendChatMessage (placeholder)');
    // TODO: POST to `${env.openAi.apiBaseUrl}/chat` and return the completion.
    throw new Error('OpenAIService.sendChatMessage not implemented');
  },

  /** Generate dashboard insight cards from the user's recent data. */
  async generateInsights(
    _context: Record<string, unknown>,
  ): Promise<CoachInsight[]> {
    log.debug('generateInsights (placeholder)');
    // TODO: POST to `${env.openAi.apiBaseUrl}/insights`.
    return [];
  },
};

export type OpenAIService = typeof openAiService;
