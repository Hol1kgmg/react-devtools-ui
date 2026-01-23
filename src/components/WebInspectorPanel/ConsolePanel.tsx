import type { ReactElement } from 'react';

import styles from './ConsolePanel.module.css';

// ============================================================================
// Component
// ============================================================================

export const ConsolePanel = (): ReactElement => {
  return (
    <div className={styles['consolePanel']}>
      <div className={styles['placeholder']}>Console</div>
    </div>
  );
};
