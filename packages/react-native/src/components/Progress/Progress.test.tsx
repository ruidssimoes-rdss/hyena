import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Progress } from './Progress';

describe('Progress', () => {
  describe('rendering', () => {
    it('renders with default value', () => {
      const { toJSON } = render(<Progress value={50} />);
      expect(toJSON()).toBeTruthy();
    });

    it('renders with zero value', () => {
      const { toJSON } = render(<Progress value={0} />);
      expect(toJSON()).toBeTruthy();
    });

    it('renders with full value', () => {
      const { toJSON } = render(<Progress value={100} />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('variants', () => {
    it.each(['default', 'success', 'warning', 'error'] as const)(
      'renders %s variant',
      (variant) => {
        const { toJSON } = render(<Progress value={50} variant={variant} />);
        expect(toJSON()).toBeTruthy();
      }
    );
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      const { toJSON } = render(<Progress value={50} size={size} />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('showValue', () => {
    it('shows value when showValue is true', () => {
      render(<Progress value={75} showValue />);
      expect(screen.getByText('75%')).toBeTruthy();
    });

    it('does not show value by default', () => {
      render(<Progress value={75} />);
      expect(screen.queryByText('75%')).toBeNull();
    });
  });

  describe('accessibility', () => {
    it('supports accessibilityLabel', () => {
      const { toJSON } = render(
        <Progress
          value={50}
          accessibilityLabel="Upload progress: 50%"
        />
      );
      // Verify component renders with accessibility props
      expect(toJSON()).toBeTruthy();
    });
  });
});
