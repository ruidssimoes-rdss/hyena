import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';

describe('Tabs', () => {
  const BasicTabs = ({
    defaultValue = 'tab1',
    onValueChange,
  }: {
    defaultValue?: string;
    onValueChange?: (value: string) => void;
  }) => (
    <Tabs defaultValue={defaultValue} onValueChange={onValueChange}>
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <Text>Content 1</Text>
      </TabsContent>
      <TabsContent value="tab2">
        <Text>Content 2</Text>
      </TabsContent>
      <TabsContent value="tab3">
        <Text>Content 3</Text>
      </TabsContent>
    </Tabs>
  );

  describe('rendering', () => {
    it('renders all tab triggers', () => {
      render(<BasicTabs />);

      expect(screen.getByText('Tab 1')).toBeTruthy();
      expect(screen.getByText('Tab 2')).toBeTruthy();
      expect(screen.getByText('Tab 3')).toBeTruthy();
    });

    it('shows default tab content', () => {
      render(<BasicTabs defaultValue="tab1" />);
      expect(screen.getByText('Content 1')).toBeTruthy();
    });

    it('shows correct content for specified default value', () => {
      render(<BasicTabs defaultValue="tab2" />);
      expect(screen.getByText('Content 2')).toBeTruthy();
    });
  });

  describe('interactions', () => {
    it('switches tab on trigger press', () => {
      render(<BasicTabs />);

      // Initially shows tab 1 content
      expect(screen.getByText('Content 1')).toBeTruthy();

      // Click on tab 2
      fireEvent.press(screen.getByText('Tab 2'));

      // Now shows tab 2 content
      expect(screen.getByText('Content 2')).toBeTruthy();
    });

    it('calls onValueChange when tab changes', () => {
      const onValueChange = jest.fn();
      render(<BasicTabs onValueChange={onValueChange} />);

      fireEvent.press(screen.getByText('Tab 2'));
      expect(onValueChange).toHaveBeenCalledWith('tab2');
    });
  });

  describe('variants', () => {
    it.each(['default', 'pills', 'underline'] as const)(
      'renders %s variant',
      (variant) => {
        render(
          <Tabs defaultValue="tab1">
            <TabsList variant={variant}>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            </TabsList>
          </Tabs>
        );
        expect(screen.getByText('Tab 1')).toBeTruthy();
      }
    );
  });

  describe('disabled state', () => {
    it('does not switch to disabled tab', () => {
      const onValueChange = jest.fn();
      render(
        <Tabs defaultValue="tab1" onValueChange={onValueChange}>
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2" disabled>
              Tab 2
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <Text>Content 1</Text>
          </TabsContent>
          <TabsContent value="tab2">
            <Text>Content 2</Text>
          </TabsContent>
        </Tabs>
      );

      fireEvent.press(screen.getByText('Tab 2'));
      // Should not call onValueChange for disabled tab
      expect(onValueChange).not.toHaveBeenCalled();
    });
  });
});
