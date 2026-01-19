import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { FloatButton } from './FloatButton';

describe('FloatButton', () => {
  it('デフォルト状態でレンダリングされる', () => {
    render(<FloatButton aria-label="float button" />);
    const button = screen.getByRole('button', { name: 'float button' });
    expect(button).toBeInTheDocument();
  });

  it('children をレンダリングできる', () => {
    render(<FloatButton>+</FloatButton>);
    expect(screen.getByText('+')).toBeInTheDocument();
  });

  it('icon prop が children より優先される', () => {
    render(<FloatButton icon={<span>icon</span>}>child</FloatButton>);
    expect(screen.getByText('icon')).toBeInTheDocument();
    expect(screen.queryByText('child')).not.toBeInTheDocument();
  });

  it('クリックイベントが発火する', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<FloatButton onClick={handleClick}>Click me</FloatButton>);

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('position prop で位置クラスが変わる', () => {
    const { rerender } = render(<FloatButton data-testid="btn" position="top-left" />);
    expect(screen.getByTestId('btn').className).toContain('top-left');

    rerender(<FloatButton data-testid="btn" position="bottom-right" />);
    expect(screen.getByTestId('btn').className).toContain('bottom-right');
  });

  it('shape prop で形状クラスが変わる', () => {
    const { rerender } = render(<FloatButton data-testid="btn" shape="circle" />);
    expect(screen.getByTestId('btn').className).toContain('circle');

    rerender(<FloatButton data-testid="btn" shape="square" />);
    expect(screen.getByTestId('btn').className).toContain('square');
  });

  it('size prop でサイズクラスが変わる', () => {
    const { rerender } = render(<FloatButton data-testid="btn" size="small" />);
    expect(screen.getByTestId('btn').className).toContain('small');

    rerender(<FloatButton data-testid="btn" size="large" />);
    expect(screen.getByTestId('btn').className).toContain('large');
  });

  it('カスタム className を追加できる', () => {
    render(<FloatButton className="custom-class" data-testid="btn" />);
    expect(screen.getByTestId('btn').className).toContain('custom-class');
  });

  it('disabled 状態で動作する', () => {
    render(<FloatButton disabled>Disabled</FloatButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
