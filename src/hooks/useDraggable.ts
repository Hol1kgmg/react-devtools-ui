import { useCallback, useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

// ============================================================================
// Types
// ============================================================================

type Position = {
  readonly x: number;
  readonly y: number;
};

type UseDraggableOptions = {
  /** Element size for boundary calculation */
  readonly size: number;
  /** Initial margin from viewport edge */
  readonly initialMargin?: number;
  /** Minimum movement to distinguish drag from click (px) */
  readonly dragThreshold?: number;
  /** Callback fired on click (not drag) */
  readonly onClickWithoutDrag?: (() => void) | undefined;
};

type UseDraggableReturn<T extends HTMLElement> = {
  readonly position: Position;
  readonly isDragging: boolean;
  readonly ref: RefObject<T | null>;
  readonly handlers: {
    readonly onMouseDown: (e: React.MouseEvent) => void;
    readonly onClick: (e: React.MouseEvent) => void;
  };
};

// ============================================================================
// Helpers
// ============================================================================

const clampPosition = (x: number, y: number, size: number): Position => {
  const maxX = window.innerWidth - size;
  const maxY = window.innerHeight - size;
  return {
    x: Math.max(0, Math.min(x, maxX)),
    y: Math.max(0, Math.min(y, maxY)),
  };
};

const getInitialPosition = (size: number, margin: number): Position =>
  clampPosition(window.innerWidth - size - margin, window.innerHeight - size - margin, size);

// ============================================================================
// Hook
// ============================================================================

export const useDraggable = <T extends HTMLElement>({
  size,
  initialMargin = 24,
  dragThreshold = 5,
  onClickWithoutDrag,
}: UseDraggableOptions): UseDraggableReturn<T> => {
  const [position, setPosition] = useState<Position>(() => getInitialPosition(size, initialMargin));
  const [isDragging, setIsDragging] = useState(false);

  const ref = useRef<T>(null);
  const positionRef = useRef(position);
  const dragOffsetRef = useRef<Position>({ x: 0, y: 0 });
  const startPosRef = useRef<Position>({ x: 0, y: 0 });
  const hasMovedRef = useRef(false);

  // Keep positionRef in sync
  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  // ---------------------------------------------------------------------------
  // Drag handlers
  // ---------------------------------------------------------------------------

  const handleDragStart = useCallback((clientX: number, clientY: number) => {
    setIsDragging(true);
    hasMovedRef.current = false;
    startPosRef.current = { x: clientX, y: clientY };
    dragOffsetRef.current = {
      x: clientX - positionRef.current.x,
      y: clientY - positionRef.current.y,
    };
  }, []);

  const handleDragMove = useCallback(
    (clientX: number, clientY: number) => {
      const dx = Math.abs(clientX - startPosRef.current.x);
      const dy = Math.abs(clientY - startPosRef.current.y);

      if (dx > dragThreshold || dy > dragThreshold) {
        hasMovedRef.current = true;
      }

      if (hasMovedRef.current) {
        const newX = clientX - dragOffsetRef.current.x;
        const newY = clientY - dragOffsetRef.current.y;
        setPosition(clampPosition(newX, newY, size));
      }
    },
    [dragThreshold, size],
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // ---------------------------------------------------------------------------
  // Touch events (via ref to avoid markuplint error)
  // ---------------------------------------------------------------------------

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const onTouchStart = (e: TouchEvent): void => {
      const touch = e.touches[0];
      if (touch) {
        handleDragStart(touch.clientX, touch.clientY);
      }
    };

    element.addEventListener('touchstart', onTouchStart, { passive: true });
    return () => element.removeEventListener('touchstart', onTouchStart);
  }, [handleDragStart]);

  // ---------------------------------------------------------------------------
  // Global move/end events (only when dragging)
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent): void => {
      handleDragMove(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent): void => {
      const touch = e.touches[0];
      if (touch) {
        handleDragMove(touch.clientX, touch.clientY);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', handleDragEnd);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  // ---------------------------------------------------------------------------
  // Window resize
  // ---------------------------------------------------------------------------

  useEffect(() => {
    const onResize = (): void => {
      setPosition((prev) => clampPosition(prev.x, prev.y, size));
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [size]);

  // ---------------------------------------------------------------------------
  // Event handlers for component
  // ---------------------------------------------------------------------------

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      handleDragStart(e.clientX, e.clientY);
    },
    [handleDragStart],
  );

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      if (hasMovedRef.current) {
        e.preventDefault();
        return;
      }
      onClickWithoutDrag?.();
    },
    [onClickWithoutDrag],
  );

  return {
    position,
    isDragging,
    ref,
    handlers: { onMouseDown, onClick },
  };
};
