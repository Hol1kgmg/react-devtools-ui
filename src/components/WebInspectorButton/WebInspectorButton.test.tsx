import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { WebInspectorButton } from './WebInspectorButton';

describe('WebInspectorButton', () => {
  it('gear.svg アイコンを表示する', () => {
    render(<WebInspectorButton />);
    const img = screen.getByAltText('Settings');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/gear.svg');
  });

  it('クリックイベントが発火する', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<WebInspectorButton onClick={handleClick} />);

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('カスタム className を追加できる', () => {
    render(<WebInspectorButton className="custom-class" data-testid="btn" />);
    expect(screen.getByTestId('btn').className).toContain('custom-class');
  });

  it('disabled 状態で動作する', () => {
    render(<WebInspectorButton disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
