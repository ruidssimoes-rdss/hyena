import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Alert, AlertTitle, AlertDescription } from './Alert';

describe('Alert', () => {
  describe('rendering', () => {
    it('renders with default variant', () => {
      render(
        <Alert>
          <AlertTitle>Alert Title</AlertTitle>
          <AlertDescription>Alert description text.</AlertDescription>
        </Alert>
      );

      expect(screen.getByText('Alert Title')).toBeTruthy();
      expect(screen.getByText('Alert description text.')).toBeTruthy();
    });

    it('renders without icon when showIcon is false', () => {
      render(
        <Alert showIcon={false}>
          <AlertTitle>No Icon</AlertTitle>
        </Alert>
      );

      expect(screen.getByText('No Icon')).toBeTruthy();
    });
  });

  describe('variants', () => {
    it.each([
      'default',
      'error',
      'success',
      'warning',
      'info',
    ] as const)('renders %s variant', (variant) => {
      render(
        <Alert variant={variant}>
          <AlertTitle>{variant} Alert</AlertTitle>
        </Alert>
      );

      expect(screen.getByText(`${variant} Alert`)).toBeTruthy();
    });
  });

  describe('AlertTitle', () => {
    it('renders title text', () => {
      render(<AlertTitle>Important Notice</AlertTitle>);
      expect(screen.getByText('Important Notice')).toBeTruthy();
    });
  });

  describe('AlertDescription', () => {
    it('renders description text', () => {
      render(<AlertDescription>This is a detailed description.</AlertDescription>);
      expect(screen.getByText('This is a detailed description.')).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('has correct accessibility role', () => {
      render(
        <Alert accessibilityLabel="Alert message">
          <AlertTitle>Accessible Alert</AlertTitle>
        </Alert>
      );

      expect(screen.getByLabelText('Alert message')).toBeTruthy();
    });
  });
});
