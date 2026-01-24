import { useContext } from 'react';

import { WebInspectorContext } from './WebInspectorContext';
import type { WebInspectorContextValue } from './WebInspectorContext';

export const useWebInspector = (): WebInspectorContextValue => {
  const context = useContext(WebInspectorContext);

  if (context === null) {
    throw new Error('useWebInspector must be used within a WebInspectorProvider');
  }

  return context;
};
