import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from './Card';

describe('Card', () => {
  describe('rendering', () => {
    it('renders basic card', () => {
      const { toJSON } = render(
        <Card>
          <CardContent>
            <Text>Card content</Text>
          </CardContent>
        </Card>
      );
      expect(toJSON()).toBeTruthy();
    });

    it('renders full card with all sections', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description text</CardDescription>
          </CardHeader>
          <CardContent>
            <Text>Main content</Text>
          </CardContent>
          <CardFooter>
            <Text>Footer content</Text>
          </CardFooter>
        </Card>
      );

      expect(screen.getByText('Card Title')).toBeTruthy();
      expect(screen.getByText('Card description text')).toBeTruthy();
    });
  });

  describe('variants', () => {
    it.each(['default', 'outline', 'ghost', 'elevated'] as const)(
      'renders %s variant',
      (variant) => {
        const { toJSON } = render(
          <Card variant={variant}>
            <CardContent>
              <Text>{variant} card</Text>
            </CardContent>
          </Card>
        );
        expect(toJSON()).toBeTruthy();
      }
    );
  });

  describe('padding', () => {
    it.each(['none', 'sm', 'md', 'lg'] as const)(
      'renders with %s padding',
      (padding) => {
        const { toJSON } = render(
          <Card padding={padding}>
            <CardContent>
              <Text>Content</Text>
            </CardContent>
          </Card>
        );
        expect(toJSON()).toBeTruthy();
      }
    );
  });
});

describe('CardHeader', () => {
  it('renders header content', () => {
    render(
      <CardHeader>
        <CardTitle>Header Title</CardTitle>
      </CardHeader>
    );
    expect(screen.getByText('Header Title')).toBeTruthy();
  });
});

describe('CardContent', () => {
  it('renders content', () => {
    const { toJSON } = render(
      <CardContent>
        <Text>Body content</Text>
      </CardContent>
    );
    expect(toJSON()).toBeTruthy();
  });
});

describe('CardFooter', () => {
  it('renders footer content', () => {
    const { toJSON } = render(
      <CardFooter>
        <Text>Footer text</Text>
      </CardFooter>
    );
    expect(toJSON()).toBeTruthy();
  });
});

describe('CardTitle', () => {
  it('renders title text', () => {
    render(<CardTitle>My Title</CardTitle>);
    expect(screen.getByText('My Title')).toBeTruthy();
  });
});

describe('CardDescription', () => {
  it('renders description text', () => {
    render(<CardDescription>My description</CardDescription>);
    expect(screen.getByText('My description')).toBeTruthy();
  });
});
