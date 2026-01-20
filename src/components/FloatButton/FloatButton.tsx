import type { ComponentPropsWithoutRef, ReactElement } from 'react';

import { useDraggable } from '../../hooks/useDraggable';
import styles from './FloatButton.module.css';

const BUTTON_SIZE = 40;

export type FloatButtonProps = Omit<ComponentPropsWithoutRef<'button'>, 'children'>;

export const FloatButton = ({ className, onClick, ...props }: FloatButtonProps): ReactElement => {
  const { position, isDragging, ref, handlers } = useDraggable<HTMLButtonElement>({
    size: BUTTON_SIZE,
    onClickWithoutDrag: onClick
      ? () => onClick({} as React.MouseEvent<HTMLButtonElement>)
      : undefined,
  });

  const classNames = [styles['floatButton'], isDragging ? styles['dragging'] : '', className]
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
