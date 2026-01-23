import { useCallback, useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

// ============================================================================
// Types
// ============================================================================

type UseResizableOptions = {
  /** Initial height ratio relative to window height (0-1) */
  readonly initialHeightRatio?: number;
  /** Minimum height in pixels */
  readonly minHeight?: number;
  /** Maximum height ratio relative to window height (0-1) */
  readonly maxHeightRatio?: number;
};

type UseResizableReturn<T extends HTMLElement> = {
  readonly height: number;
  readonly isResizing: boolean;
  readonly handleRef: RefObject<T | null>;
  readonly handleHandlers: {
    readonly onMouseDown: (e: React.MouseEvent) => void;
  };
};

// ============================================================================
// Constants
// ============================================================================

const DEFAULT_INITIAL_HEIGHT_RATIO = 0.3;
const DEFAULT_MIN_HEIGHT = 100;
const DEFAULT_MAX_HEIGHT_RATIO = 0.8;

// ============================================================================
// Helpers
// ============================================================================

const clampHeight = (height: number, minHeight: number, maxHeight: number): number =>
  Math.max(minHeight, Math.min(height, maxHeight));

const getMaxHeight = (maxHeightRatio: number): number => window.innerHeight * maxHeightRatio;

const getInitialHeight = (
  initialHeightRatio: number,
  minHeight: number,
  maxHeightRatio: number,
): number =>
  clampHeight(window.innerHeight * initialHeightRatio, minHeight, getMaxHeight(maxHeightRatio));

// ============================================================================
// Hook
// ============================================================================

export const useResizable = <T extends HTMLElement>({
  initialHeightRatio = DEFAULT_INITIAL_HEIGHT_RATIO,
  minHeight = DEFAULT_MIN_HEIGHT,
  maxHeightRatio = DEFAULT_MAX_HEIGHT_RATIO,
}: UseResizableOptions = {}): UseResizableReturn<T> => {
  const [height, setHeight] = useState<number>(() =>
    getInitialHeight(initialHeightRatio, minHeight, maxHeightRatio),
  );
  const [isResizing, setIsResizing] = useState(false);

  const handleRef = useRef<T>(null);
  const startYRef = useRef(0);
  const startHeightRef = useRef(0);

  // ---------------------------------------------------------------------------
  // Resize handlers
  // ---------------------------------------------------------------------------

  const handleResizeStart = useCallback(
    (clientY: number) => {
      setIsResizing(true);
      startYRef.current = clientY;
      startHeightRef.current = height;
    },
    [height],
  );

  const handleResizeMove = useCallback(
    (clientY: number) => {
      const deltaY = startYRef.current - clientY;
      const newHeight = startHeightRef.current + deltaY;
      const maxHeight = getMaxHeight(maxHeightRatio);
      setHeight(clampHeight(newHeight, minHeight, maxHeight));
    },
    [minHeight, maxHeightRatio],
  );

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);
  }, []);

  // ---------------------------------------------------------------------------
  // Touch events (via ref)
  // ---------------------------------------------------------------------------

  useEffect(() => {
    const element = handleRef.current;
    if (!element) return;

    const onTouchStart = (e: TouchEvent): void => {
      const touch = e.touches[0];
      if (touch) {
        handleResizeStart(touch.clientY);
      }
    };

    element.addEventListener('touchstart', onTouchStart, { passive: true });
    return () => element.removeEventListener('touchstart', onTouchStart);
  }, [handleResizeStart]);

  // ---------------------------------------------------------------------------
  // Global move/end events (only when resizing)
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (!isResizing) return;

    const onMouseMove = (e: MouseEvent): void => {
      handleResizeMove(e.clientY);
    };

    const onTouchMove = (e: TouchEvent): void => {
      const touch = e.touches[0];
      if (touch) {
        handleResizeMove(touch.clientY);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', handleResizeEnd);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', handleResizeEnd);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', handleResizeEnd);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', handleResizeEnd);
    };
  }, [isResizing, handleResizeMove, handleResizeEnd]);

  // ---------------------------------------------------------------------------
  // Window resize
  // ---------------------------------------------------------------------------

  useEffect(() => {
    const onResize = (): void => {
      const maxHeight = getMaxHeight(maxHeightRatio);
      setHeight((prev) => clampHeight(prev, minHeight, maxHeight));
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [minHeight, maxHeightRatio]);

  // ---------------------------------------------------------------------------
  // Event handlers for component
  // ---------------------------------------------------------------------------

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      handleResizeStart(e.clientY);
    },
    [handleResizeStart],
  );

  return {
    height,
    isResizing,
    handleRef,
    handleHandlers: { onMouseDown },
  };
};
