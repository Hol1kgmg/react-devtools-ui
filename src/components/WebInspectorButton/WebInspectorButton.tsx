import type { ComponentPropsWithoutRef, ReactElement } from 'react';

import { useDraggable } from '../../hooks/useDraggable';
import { useWebInspector } from '../WebInspector';
import styles from './WebInspectorButton.module.css';

const BUTTON_SIZE = 40;

export type WebInspectorButtonProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'children' | 'onClick'
>;

export const WebInspectorButton = ({
  className,
  ...props
}: WebInspectorButtonProps): ReactElement => {
  const { toggle } = useWebInspector();
  const { position, isDragging, ref, handlers } = useDraggable<HTMLButtonElement>({
    size: BUTTON_SIZE,
    onClickWithoutDrag: toggle,
  });

  const classNames = [styles['webInspectorButton'], isDragging ? styles['dragging'] : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      ref={ref}
      className={classNames}
      style={{ left: position.x, top: position.y }}
      type="button"
      {...handlers}
      {...props}
    >
      <img alt="Settings" draggable={false} height={25} src="/gear.svg" width={30} />
    </button>
  );
};
