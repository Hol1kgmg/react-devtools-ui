import type { ReactElement } from 'react';

import type { LogEntry as LogEntryType, LogLevel } from '../../libs/consoleInterceptor';
import styles from './ConsolePanel.module.css';

// ============================================================================
// Types
// ============================================================================

type LogEntryProps = {
  readonly entry: LogEntryType;
};

// ============================================================================
// Helpers
// ============================================================================

const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

const formatArg = (arg: unknown): string => {
  if (arg === null) {
    return 'null';
  }
  if (arg === undefined) {
    return 'undefined';
  }
  if (typeof arg === 'string') {
    return arg;
  }
  if (typeof arg === 'object') {
    try {
      return JSON.stringify(arg);
    } catch {
      return String(arg);
    }
  }
  return String(arg);
};

const formatArgs = (args: readonly unknown[]): string => {
  return args.map(formatArg).join(' ');
};

const getLevelClassName = (level: LogLevel): string => {
  switch (level) {
    case 'log':
      return styles['level-log'] ?? '';
    case 'info':
      return styles['level-info'] ?? '';
    case 'warn':
      return styles['level-warn'] ?? '';
    case 'error':
      return styles['level-error'] ?? '';
    case 'debug':
      return styles['level-debug'] ?? '';
    default: {
      level satisfies never;
      return '';
    }
  }
};

// ============================================================================
// Component
// ============================================================================

export const LogEntry = ({ entry }: LogEntryProps): ReactElement => {
  const levelClassName = getLevelClassName(entry.level);

  return (
    <div className={`${styles['logEntry']} ${levelClassName}`}>
      <span className={styles['timestamp']}>{formatTimestamp(entry.timestamp)}</span>
      <span className={styles['message']}>{formatArgs(entry.args)}</span>
    </div>
  );
};
