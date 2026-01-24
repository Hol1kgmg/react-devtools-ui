/**
 * Console interceptor for capturing console outputs
 * Starts intercepting immediately on import
 */

// ============================================================================
// Types
// ============================================================================

export type LogLevel = 'log' | 'info' | 'warn' | 'error' | 'debug';

export type LogEntry = {
  readonly id: string;
  readonly level: LogLevel;
  readonly args: readonly unknown[];
  readonly timestamp: number;
};

export type LogSubscriber = (logs: readonly LogEntry[]) => void;

// ============================================================================
// Constants
// ============================================================================

const LOG_LEVELS: readonly LogLevel[] = ['log', 'info', 'warn', 'error', 'debug'];
const MAX_LOGS = 500;

// ============================================================================
// Global Store
// ============================================================================

type OriginalConsoleMethods = {
  [K in LogLevel]: (typeof console)[K];
};

let idCounter = 0;
let logs: LogEntry[] = [];
const subscribers = new Set<LogSubscriber>();

const generateId = (): string => {
  idCounter += 1;
  return `log-${idCounter}-${Date.now()}`;
};

const notifySubscribers = (): void => {
  const readonlyLogs = logs as readonly LogEntry[];
  for (const subscriber of subscribers) {
    subscriber(readonlyLogs);
  }
};

const addLog = (entry: LogEntry): void => {
  logs.push(entry);
  if (logs.length > MAX_LOGS) {
    logs = logs.slice(-MAX_LOGS);
  }
  notifySubscribers();
};

// ============================================================================
// Public API
// ============================================================================

/**
 * Subscribe to log updates
 * @param callback - Called whenever logs change
 * @returns Unsubscribe function
 */
export const subscribeToLogs = (callback: LogSubscriber): (() => void) => {
  subscribers.add(callback);
  callback(logs as readonly LogEntry[]);

  return (): void => {
    subscribers.delete(callback);
  };
};

/**
 * Get current logs
 */
export const getLogs = (): readonly LogEntry[] => {
  return logs as readonly LogEntry[];
};

/**
 * Clear all logs
 */
export const clearLogs = (): void => {
  logs = [];
  notifySubscribers();
};

// ============================================================================
// Initialize Interceptor (runs on import)
// ============================================================================

const originalMethods: OriginalConsoleMethods = {
  log: console.log,
  info: console.info,
  warn: console.warn,
  error: console.error,
  debug: console.debug,
};

for (const level of LOG_LEVELS) {
  console[level] = (...args: unknown[]): void => {
    const entry: LogEntry = {
      id: generateId(),
      level,
      args,
      timestamp: Date.now(),
    };

    addLog(entry);
    originalMethods[level].apply(console, args);
  };
}
