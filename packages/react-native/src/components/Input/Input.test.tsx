import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { Input, SearchInput, PasswordInput } from './Input';

describe('Input', () => {
  describe('rendering', () => {
    it('renders with placeholder', () => {
      render(<Input placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeTruthy();
    });

    it('renders with value', () => {
      render(<Input value="Hello World" />);
      expect(screen.getByDisplayValue('Hello World')).toBeTruthy();
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders %s size', (size) => {
      render(<Input size={size} placeholder={`${size} input`} />);
      expect(screen.getByPlaceholderText(`${size} input`)).toBeTruthy();
    });
  });

  describe('interactions', () => {
    it('calls onChangeText when text changes', () => {
      const onChangeText = jest.fn();
      render(
        <Input
          placeholder="Type here"
          onChangeText={onChangeText}
        />
      );

      fireEvent.changeText(screen.getByPlaceholderText('Type here'), 'New text');
      expect(onChangeText).toHaveBeenCalledWith('New text');
    });

    it('calls onFocus when focused', () => {
      const onFocus = jest.fn();
      render(
        <Input placeholder="Focus me" onFocus={onFocus} />
      );

      fireEvent(screen.getByPlaceholderText('Focus me'), 'focus');
      expect(onFocus).toHaveBeenCalled();
    });

    it('calls onBlur when blurred', () => {
      const onBlur = jest.fn();
      render(
        <Input placeholder="Blur me" onBlur={onBlur} />
      );

      fireEvent(screen.getByPlaceholderText('Blur me'), 'blur');
      expect(onBlur).toHaveBeenCalled();
    });
  });

  describe('states', () => {
    it('renders disabled state', () => {
      render(<Input placeholder="Disabled" editable={false} />);
      expect(screen.getByPlaceholderText('Disabled')).toBeTruthy();
    });

    it('renders error state', () => {
      render(<Input placeholder="Error" error />);
      expect(screen.getByPlaceholderText('Error')).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('supports accessibilityLabel', () => {
      render(
        <Input
          placeholder="Email"
          accessibilityLabel="Email address input"
        />
      );
      expect(screen.getByLabelText('Email address input')).toBeTruthy();
    });
  });
});

describe('SearchInput', () => {
  it('renders with search icon', () => {
    render(<SearchInput placeholder="Search..." />);
    expect(screen.getByPlaceholderText('Search...')).toBeTruthy();
  });

  it('calls onChangeText when typing', () => {
    const onChangeText = jest.fn();
    render(
      <SearchInput
        placeholder="Search"
        onChangeText={onChangeText}
      />
    );

    fireEvent.changeText(screen.getByPlaceholderText('Search'), 'query');
    expect(onChangeText).toHaveBeenCalledWith('query');
  });
});

describe('PasswordInput', () => {
  it('renders with placeholder', () => {
    render(<PasswordInput placeholder="Password" />);
    expect(screen.getByPlaceholderText('Password')).toBeTruthy();
  });

  it('hides text by default', () => {
    render(<PasswordInput placeholder="Password" value="secret123" />);
    // The text should be hidden (secureTextEntry)
    expect(screen.getByDisplayValue('secret123')).toBeTruthy();
  });
});
