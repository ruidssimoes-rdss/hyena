import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      const { toJSON } = render(<Spinner />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      const { toJSON } = render(<Spinner size={size} />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('variants', () => {
    it('renders default variant', () => {
      const { toJSON } = render(<Spinner variant="default" />);
      expect(toJSON()).toBeTruthy();
    });

    // Dots variant uses AccessibilityInfo which requires additional mocking
    it('renders dots variant', () => {
      const { toJSON } = render(<Spinner variant="dots" />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('renders with accessibility support', () => {
      const { toJSON } = render(<Spinner accessibilityLabel="Loading content" />);
      expect(toJSON()).toBeTruthy();
    });
  });
});
