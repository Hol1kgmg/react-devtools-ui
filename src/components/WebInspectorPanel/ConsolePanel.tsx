import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactElement } from 'react';

import { clearLogs, subscribeToLogs } from '../../libs/consoleInterceptor';
import type { LogEntry as LogEntryType } from '../../libs/consoleInterceptor';
import styles from './ConsolePanel.module.css';
import { LogEntry } from './LogEntry';

// ============================================================================
// Component
// ============================================================================

export const ConsolePanel = (): ReactElement => {
  const [logs, setLogs] = useState<readonly LogEntryType[]>([]);
  const logListRef = useRef<HTMLDivElement>(null);

  const handleClear = useCallback((): void => {
    clearLogs();
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToLogs(setLogs);
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (logListRef.current) {
      logListRef.current.scrollTop = logListRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className={styles['consolePanel']}>
      <div className={styles['toolbar']}>
        <button
          aria-label="Clear console"
          className={styles['clearButton']}
          type="button"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
      <div ref={logListRef} className={styles['logList']}>
        {logs.map((entry) => (
          <LogEntry key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
};
