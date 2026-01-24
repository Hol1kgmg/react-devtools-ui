import { createContext } from 'react';
import type { ReactNode } from 'react';

// ============================================================================
// Types
// ============================================================================

export type WebInspectorContextValue = {
  readonly isOpen: boolean;
  readonly open: () => void;
  readonly close: () => void;
  readonly toggle: () => void;
};

export type WebInspectorProviderProps = {
  readonly children: ReactNode;
  readonly defaultOpen?: boolean;
};

// ============================================================================
// Context
// ============================================================================

export const WebInspectorContext = createContext<WebInspectorContextValue | null>(null);
