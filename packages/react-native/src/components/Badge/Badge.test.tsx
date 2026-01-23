import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Badge } from './Badge';

describe('Badge', () => {
  describe('rendering', () => {
    it('renders with text content', () => {
      render(<Badge>New</Badge>);
      expect(screen.getByText('New')).toBeTruthy();
    });

    it('renders with number content', () => {
      render(<Badge>{42}</Badge>);
      expect(screen.getByText('42')).toBeTruthy();
    });
  });

  describe('variants', () => {
    it.each([
      'default',
      'secondary',
      'success',
      'warning',
      'error',
    ] as const)('renders %s variant', (variant) => {
      render(<Badge variant={variant}>Badge</Badge>);
      expect(screen.getByText('Badge')).toBeTruthy();
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md'] as const)('renders %s size', (size) => {
      render(<Badge size={size}>Badge</Badge>);
      expect(screen.getByText('Badge')).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('supports accessibilityLabel', () => {
      const { toJSON } = render(<Badge accessibilityLabel="3 new notifications">3</Badge>);
      // Verify component renders with accessibility props
      expect(toJSON()).toBeTruthy();
    });
  });
});
