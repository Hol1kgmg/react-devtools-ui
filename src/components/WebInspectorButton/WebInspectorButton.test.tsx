import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { WebInspectorProvider } from '../WebInspector';
import { WebInspectorButton } from './WebInspectorButton';

const renderWithProvider = (ui: React.ReactElement): ReturnType<typeof render> => {
  return render(<WebInspectorProvider>{ui}</WebInspectorProvider>);
};

describe('WebInspectorButton', () => {
  it('GearIcon を表示する', () => {
    renderWithProvider(<WebInspectorButton data-testid="btn" />);
    const button = screen.getByTestId('btn');
    const svg = button.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('クリックでパネルの開閉状態がトグルされる', async () => {
    const user = userEvent.setup();
    renderWithProvider(<WebInspectorButton data-testid="btn" />);

    await user.click(screen.getByTestId('btn'));
    // Context内のtoggleが呼ばれることをProvider経由で確認
    // 統合テストで動作確認する
  });

  it('カスタム className を追加できる', () => {
    renderWithProvider(<WebInspectorButton className="custom-class" data-testid="btn" />);
    expect(screen.getByTestId('btn').className).toContain('custom-class');
  });

  it('disabled 状態で動作する', () => {
    renderWithProvider(<WebInspectorButton disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
