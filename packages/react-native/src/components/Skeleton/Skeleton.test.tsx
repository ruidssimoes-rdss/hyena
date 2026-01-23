import React from 'react';
import { render } from '@testing-library/react-native';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      const { toJSON } = render(<Skeleton />);
      expect(toJSON()).toBeTruthy();
    });

    it('renders with custom dimensions', () => {
      const { toJSON } = render(<Skeleton width={100} height={20} />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('variants', () => {
    it.each(['text', 'circular', 'rectangular'] as const)(
      'renders %s variant',
      (variant) => {
        const { toJSON } = render(<Skeleton variant={variant} />);
        expect(toJSON()).toBeTruthy();
      }
    );
  });

  describe('text variant', () => {
    it('renders text variant', () => {
      const { toJSON } = render(<Skeleton variant="text" width={200} />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('circular variant', () => {
    it('renders with height prop for size', () => {
      const { toJSON } = render(<Skeleton variant="circular" height={48} />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('animation', () => {
    it('renders with animation disabled', () => {
      const { toJSON } = render(<Skeleton animate={false} />);
      expect(toJSON()).toBeTruthy();
    });

    it('renders with pulse animation', () => {
      const { toJSON } = render(<Skeleton />);
      expect(toJSON()).toBeTruthy();
    });
  });
});
