import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react';

import styles from './FloatButton.module.css';

type FloatButtonPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

type FloatButtonShape = 'circle' | 'square';

type FloatButtonSize = 'small' | 'medium' | 'large';

export type FloatButtonProps = {
  readonly position?: FloatButtonPosition;
  readonly shape?: FloatButtonShape;
  readonly size?: FloatButtonSize;
  readonly icon?: ReactNode;
  readonly children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<'button'>, 'children'>;

export const FloatButton = ({
  position = 'bottom-right',
  shape = 'circle',
  size = 'medium',
  icon,
  children,
  className,
  ...props
}: FloatButtonProps): ReactElement => {
  const classNames = [
    styles['floatButton'],
    styles[position],
    styles[shape],
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classNames} type="button" {...props}>
      {icon ?? children}
    </button>
  );
};
