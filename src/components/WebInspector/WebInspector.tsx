import type { ReactElement, ReactNode } from 'react';

import { WebInspectorButton } from '../WebInspectorButton';
import type { WebInspectorButtonProps } from '../WebInspectorButton';
import { WebInspectorPanel } from '../WebInspectorPanel';
import type { WebInspectorPanelProps } from '../WebInspectorPanel';
import { WebInspectorProvider } from './WebInspectorProvider';

// ============================================================================
// Types
// ============================================================================

export type WebInspectorProps = {
  readonly children: ReactNode;
  readonly defaultOpen?: boolean;
  readonly showButton?: boolean;
  readonly showPanel?: boolean;
  readonly buttonProps?: WebInspectorButtonProps;
  readonly panelProps?: WebInspectorPanelProps;
};

// ============================================================================
// Component
// ============================================================================

/**
 * All-in-one WebInspector component for easy integration.
 * Wraps children with Provider and renders Button/Panel automatically.
 *
 * @example
 * // In layout.tsx
 * <WebInspector>
 *   {children}
 * </WebInspector>
 */
export const WebInspector = ({
  children,
  defaultOpen = false,
  showButton = true,
  showPanel = true,
  buttonProps,
  panelProps,
}: WebInspectorProps): ReactElement => {
  return (
    <WebInspectorProvider defaultOpen={defaultOpen}>
      {children}
      {showButton && <WebInspectorButton {...buttonProps} />}
      {showPanel && <WebInspectorPanel {...panelProps} />}
    </WebInspectorProvider>
  );
};
