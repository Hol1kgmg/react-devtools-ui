import { useCallback, useMemo, useState } from 'react';
import type { ReactElement } from 'react';

import { WebInspectorContext } from './WebInspectorContext';
import type { WebInspectorContextValue, WebInspectorProviderProps } from './WebInspectorContext';

export const WebInspectorProvider = ({
  children,
  defaultOpen = false,
}: WebInspectorProviderProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const open = useCallback((): void => {
    setIsOpen(true);
  }, []);

  const close = useCallback((): void => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback((): void => {
    setIsOpen((prev) => !prev);
  }, []);

  const value = useMemo(
    (): WebInspectorContextValue => ({
      isOpen,
      open,
      close,
      toggle,
    }),
    [isOpen, open, close, toggle],
  );

  return <WebInspectorContext.Provider value={value}>{children}</WebInspectorContext.Provider>;
};
