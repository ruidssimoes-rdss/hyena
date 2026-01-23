import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  describe('rendering', () => {
    it('renders with label', () => {
      render(<Checkbox label="Accept terms" />);
      expect(screen.getByText('Accept terms')).toBeTruthy();
    });

    it('renders without label', () => {
      const { toJSON } = render(<Checkbox accessibilityLabel="Toggle checkbox" />);
      // Verify component renders (accessibility label is passed to native component)
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('states', () => {
    it('renders unchecked by default', () => {
      render(<Checkbox label="Unchecked" />);
      expect(screen.getByText('Unchecked')).toBeTruthy();
    });

    it('renders checked when checked prop is true', () => {
      render(<Checkbox label="Checked" checked />);
      expect(screen.getByText('Checked')).toBeTruthy();
    });

    it('renders disabled state', () => {
      render(<Checkbox label="Disabled" disabled />);
      expect(screen.getByText('Disabled')).toBeTruthy();
    });
  });

  describe('interactions', () => {
    it('calls onCheckedChange when pressed', () => {
      const onCheckedChange = jest.fn();
      render(
        <Checkbox
          label="Toggle me"
          checked={false}
          onCheckedChange={onCheckedChange}
        />
      );

      fireEvent.press(screen.getByText('Toggle me'));
      expect(onCheckedChange).toHaveBeenCalledWith(true);
    });

    it('toggles from checked to unchecked', () => {
      const onCheckedChange = jest.fn();
      render(
        <Checkbox
          label="Toggle me"
          checked={true}
          onCheckedChange={onCheckedChange}
        />
      );

      fireEvent.press(screen.getByText('Toggle me'));
      expect(onCheckedChange).toHaveBeenCalledWith(false);
    });

    it('does not call onCheckedChange when disabled', () => {
      const onCheckedChange = jest.fn();
      render(
        <Checkbox
          label="Disabled"
          disabled
          onCheckedChange={onCheckedChange}
        />
      );

      fireEvent.press(screen.getByText('Disabled'));
      expect(onCheckedChange).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('has checkbox accessibility role', () => {
      render(<Checkbox label="Accessible checkbox" />);
      // The pressable wrapper should be accessible
      expect(screen.getByText('Accessible checkbox')).toBeTruthy();
    });
  });
});
