import type { ReactElement } from 'react';

import styles from './NetworkPanel.module.css';

// ============================================================================
// Component
// ============================================================================

export const NetworkPanel = (): ReactElement => {
  return (
    <div className={styles['networkPanel']}>
      <div className={styles['placeholder']}>Network</div>
    </div>
  );
};
