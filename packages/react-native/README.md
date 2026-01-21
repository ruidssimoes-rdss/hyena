# Hyena React Native

A React Native component library with native touch optimization for iOS, Android, and Web.

## Features

- **45+ Components** — Forms, overlays, navigation, data display
- **4 Themes** — Dark, Light, Oatmeal, Glass (and customizable)
- **Glass Morphism** — Frosted glass effects with backdrop blur
- **Cross-Platform** — iOS, Android, Web via React Native Web
- **Mobile-Optimized** — Platform-aware touch targets (44pt iOS / 48dp Android)
- **Accessible** — WCAG 2.1 compliant, screen reader tested
- **Performant** — Compositor-only animations, reduced motion support
- **Composable** — Compound component patterns

## Installation

```bash
npm install @hyena-studio/react-native
# or
yarn add @hyena-studio/react-native
# or
pnpm add @hyena-studio/react-native
```

## Quick Start

```tsx
import { Button, Card, CardContent, Text } from '@hyena-studio/react-native';

function MyComponent() {
  return (
    <Card>
      <CardContent>
        <Text>Welcome to Hyena</Text>
        <Button onPress={() => console.log('pressed')}>
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
}
```

## Components

### Data Display
- Avatar, Badge, Card, Progress, Skeleton, Table, Accordion, Collapsible, Carousel

### Feedback
- Alert, Toast, Dialog, AlertDialog, Spinner

### Overlays
- Dropdown, Popover, Tooltip, HoverCard, ContextMenu, Sheet, ActionSheet

### Forms
- Input, Textarea, Checkbox, Switch, Select, RadioGroup, Slider, OTPInput, Command

### Navigation
- Tabs, Breadcrumb, Pagination, Link, Menubar, NavigationMenu

### Layout
- Container, Flex, Grid, Separator, Spacer, AspectRatio, ScrollArea

## Glass Theme

Enable the glass morphism effect for a modern frosted glass appearance:

```tsx
import { ThemeProvider, Card, CardTitle, CardContent } from '@hyena-studio/react-native';

function App() {
  return (
    <ThemeProvider defaultTheme="light" isGlass>
      <Card>
        <CardTitle>Glass Card</CardTitle>
        <CardContent>Frosted glass effect with backdrop blur</CardContent>
      </Card>
    </ThemeProvider>
  );
}
```

22 components support glass morphism, including Card, Dialog, Sheet, Toast, Dropdown, Tabs, Navbar, and more.

## Accessibility

Hyena is built with accessibility as a priority:

- Platform-aware touch targets (44pt iOS / 48dp Android / 44px Web)
- Icon-only buttons include descriptive labels for screen readers
- Keyboard navigation support on all interactive components
- ARIA roles and states on form controls
- Focus management in overlays and modals
- Full `prefers-reduced-motion` support for users sensitive to animation

### Touch Target Compliance

All interactive components meet platform-specific accessibility guidelines:

| Platform | Minimum Touch Target | Guideline |
|----------|---------------------|-----------|
| iOS | 44×44pt | [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/accessibility) |
| Android | 48×48dp | [Material Design Accessibility](https://m3.material.io/foundations/accessible-design) |
| Web | 44×44px | WCAG 2.1 Level AA |

Implementation approaches:
- Direct sizing via `Platform.select()` for platform-appropriate dimensions
- Expanded hit areas using `hitSlop` for visually compact elements
- Shared utilities in `platform.ts` for consistent sizing across components

### Reduced Motion

All animations respect the system's reduced motion preference:

```tsx
import { useReducedMotion } from '@hyena-studio/react-native';

function MyAnimatedComponent() {
  const reducedMotion = useReducedMotion();

  // Animations will be disabled when reducedMotion is true
}
```

See [ANIMATION.md](./ANIMATION.md) for detailed animation guidelines.

## Hooks

### useReducedMotion

Detects if the user prefers reduced motion:

```tsx
import { useReducedMotion } from '@hyena-studio/react-native';

function MyComponent() {
  const reducedMotion = useReducedMotion();

  return reducedMotion ? <StaticView /> : <AnimatedView />;
}
```

### useIsVisible

Detects if an element is visible in the viewport (web only):

```tsx
import { useIsVisible } from '@hyena-studio/react-native';

function MyComponent() {
  const { ref, isVisible } = useIsVisible();

  return <View ref={ref}>{isVisible && <ExpensiveContent />}</View>;
}
```

## Tokens

Access design tokens directly:

```tsx
import { colors, spacing, radius, shadows } from '@hyena-studio/react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg.elevated,
    padding: spacing[4],
    borderRadius: radius.lg,
    ...shadows.md,
  },
});
```

## Documentation

- [Animation Guidelines](./ANIMATION.md)
- [Review Checklist](./REVIEW_CHECKLIST.md)

## License

MIT
