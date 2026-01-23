import { useState } from 'react';
import type { ComponentPropsWithoutRef, ReactElement } from 'react';

import { useResizable } from '../../hooks/useResizable';
import { ConsolePanel } from './ConsolePanel';
import { NetworkPanel } from './NetworkPanel';
import styles from './WebInspectorPanel.module.css';

// ============================================================================
// Types
// ============================================================================

type TabType = 'console' | 'network';

export type WebInspectorPanelProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  /** Whether the panel is open */
  readonly isOpen: boolean;
};

// ============================================================================
// Constants
// ============================================================================

const TABS: readonly { readonly id: TabType; readonly label: string }[] = [
  { id: 'console', label: 'Console' },
  { id: 'network', label: 'Network' },
] as const;

// ============================================================================
// Component
// ============================================================================

export const WebInspectorPanel = ({
  isOpen,
  className,
  ...props
}: WebInspectorPanelProps): ReactElement => {
  const { height, isResizing, handleRef, handleHandlers } = useResizable<HTMLDivElement>();
  const [activeTab, setActiveTab] = useState<TabType>('console');

  const panelClassNames = [styles['panel'], isOpen ? styles['open'] : '', className]
    .filter(Boolean)
    .join(' ');

  const handleClassNames = [styles['resizeHandle'], isResizing ? styles['resizing'] : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={panelClassNames} style={{ height: isOpen ? height : 0 }} {...props}>
      <div ref={handleRef} className={handleClassNames} {...handleHandlers}>
        <div className={styles['handleBar']} />
      </div>
      <div className={styles['tabBar']}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={[styles['tab'], activeTab === tab.id ? styles['active'] : '']
              .filter(Boolean)
              .join(' ')}
            type="button"
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles['content']}>
        {activeTab === 'console' && <ConsolePanel />}
        {activeTab === 'network' && <NetworkPanel />}
      </div>
    </div>
  );
};
