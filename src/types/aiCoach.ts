import { ID, ISODateString } from './common';

export type ChatRole = 'system' | 'user' | 'assistant';

/** A single message in an AI coaching conversation. */
export interface CoachMessage {
  id: ID;
  role: ChatRole;
  content: string;
  createdAt: ISODateString;
  /** True while an assistant message is being streamed/awaited. */
  pending?: boolean;
}

/** A coaching conversation thread. */
export interface CoachConversation {
  id: ID;
  userId: ID;
  title: string;
  messages: CoachMessage[];
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

/**
 * Structured, AI-generated guidance card surfaced on the dashboard
 * (e.g. "You're trending under protein — add a snack").
 */
export interface CoachInsight {
  id: ID;
  title: string;
  body: string;
  category: 'nutrition' | 'training' | 'recovery' | 'general';
  /** 0–1 confidence/priority used for ordering. */
  priority: number;
  createdAt: ISODateString;
}
