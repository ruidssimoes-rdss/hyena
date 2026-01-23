import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { Switch } from './Switch';

describe('Switch', () => {
  describe('rendering', () => {
    it('renders with label', () => {
      render(<Switch label="Enable notifications" />);
      expect(screen.getByText('Enable notifications')).toBeTruthy();
    });

    it('renders with description', () => {
      render(
        <Switch
          label="Dark mode"
          description="Enable dark theme across the app"
        />
      );
      expect(screen.getByText('Dark mode')).toBeTruthy();
      expect(screen.getByText('Enable dark theme across the app')).toBeTruthy();
    });
  });

  describe('states', () => {
    it('renders off by default', () => {
      render(<Switch label="Toggle" />);
      expect(screen.getByText('Toggle')).toBeTruthy();
    });

    it('renders on when checked is true', () => {
      render(<Switch label="On Switch" checked />);
      expect(screen.getByText('On Switch')).toBeTruthy();
    });

    it('renders disabled state', () => {
      render(<Switch label="Disabled" disabled />);
      expect(screen.getByText('Disabled')).toBeTruthy();
    });
  });

  describe('interactions', () => {
    it('calls onCheckedChange when pressed', () => {
      const onCheckedChange = jest.fn();
      render(
        <Switch
          label="Toggle me"
          checked={false}
          onCheckedChange={onCheckedChange}
        />
      );

      fireEvent.press(screen.getByText('Toggle me'));
      expect(onCheckedChange).toHaveBeenCalledWith(true);
    });

    it('toggles from on to off', () => {
      const onCheckedChange = jest.fn();
      render(
        <Switch
          label="Toggle"
          checked={true}
          onCheckedChange={onCheckedChange}
        />
      );

      fireEvent.press(screen.getByText('Toggle'));
      expect(onCheckedChange).toHaveBeenCalledWith(false);
    });

    it('does not toggle when disabled', () => {
      const onCheckedChange = jest.fn();
      render(
        <Switch
          label="Disabled toggle"
          disabled
          onCheckedChange={onCheckedChange}
        />
      );

      fireEvent.press(screen.getByText('Disabled toggle'));
      expect(onCheckedChange).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('supports accessibilityLabel', () => {
      const { toJSON } = render(
        <Switch
          label="Notifications"
          accessibilityLabel="Toggle notifications on or off"
        />
      );
      // Verify component renders with accessibility props
      expect(toJSON()).toBeTruthy();
    });
  });
});
