import { env } from './env';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/**
 * Thin logging facade. In development it writes to the console; in production
 * `debug`/`info` are suppressed and `warn`/`error` can be wired to a telemetry
 * provider (Sentry, Crashlytics, etc.) from a single place.
 */
function emit(level: LogLevel, scope: string, message: string, meta?: unknown) {
  const prefix = `[${scope}]`;
  if (!env.isDev && (level === 'debug' || level === 'info')) {
    return;
  }
  // eslint-disable-next-line no-console
  const fn = console[level] ?? console.log;
  if (meta !== undefined) {
    fn(prefix, message, meta);
  } else {
    fn(prefix, message);
  }
}

export function createLogger(scope: string) {
  return {
    debug: (message: string, meta?: unknown) =>
      emit('debug', scope, message, meta),
    info: (message: string, meta?: unknown) =>
      emit('info', scope, message, meta),
    warn: (message: string, meta?: unknown) =>
      emit('warn', scope, message, meta),
    error: (message: string, meta?: unknown) =>
      emit('error', scope, message, meta),
  };
}

export type Logger = ReturnType<typeof createLogger>;
