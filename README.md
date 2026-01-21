# Hyena

Universal React Native components for iOS, Android, and Web.

[hyena.studio](https://hyena.studio)

## Features

- **45+ Production-Ready Components** — Forms, overlays, navigation, data display
- **4 Built-in Themes** — Dark, Light, Oatmeal, and Glass
- **Glass Morphism** — Frosted glass effects with backdrop blur (22 components)
- **Cross-Platform** — iOS, Android, Web via React Native Web
- **Mobile-First Accessibility** — Platform-aware touch targets (44pt iOS / 48dp Android)
- **Performant** — Compositor-only animations, reduced motion support

## Installation

```bash
npm install @hyena-studio/react-native
```

## Quick Start

```tsx
import { Button, Card } from '@hyena-studio/react-native'

export default function App() {
  return (
    <Card>
      <Text variant="heading">Welcome to Hyena</Text>
      <Button onPress={() => console.log('Hello!')}>
        Get Started
      </Button>
    </Card>
  )
}
```

## Structure

```
hyena/
├── packages/
│   └── react-native/     # React Native + NativeWind components
│
├── apps/
│   └── docs/             # Next.js documentation site
```

## Platform Support

Hyena components are built with mobile-first accessibility in mind:

| Feature | iOS | Android | Web |
|---------|-----|---------|-----|
| Touch targets | 44pt minimum | 48dp minimum | 44px minimum |
| SafeArea | Supported (requires SafeAreaProvider) | Supported | N/A |
| Shadows | Native shadows | Elevation API | CSS shadows |
| Animations | Native driver | Native driver | CSS transitions |
| Font scaling | System respected | System respected | rem-based |

### Touch Target Compliance

All interactive components meet platform accessibility guidelines:
- **iOS**: 44×44pt minimum touch targets per [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/accessibility)
- **Android**: 48×48dp minimum touch targets per [Material Design](https://m3.material.io/foundations/accessible-design)
- Smaller visual elements use `hitSlop` to expand the tappable area

### SafeArea Setup

For proper safe area handling on devices with notches or rounded corners, wrap your app with `SafeAreaProvider`:

```tsx
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      {/* Your app content */}
    </SafeAreaProvider>
  );
}
```

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 8

### Installation

```bash
pnpm install
```

### Development

Start the docs site:

```bash
pnpm dev
```

Build all packages:

```bash
pnpm build
```

## Packages

### @hyena-studio/react-native

The core component library for React Native applications with NativeWind styling.

```bash
# Add to your project
pnpm add @hyena-studio/react-native
```

## License

MIT
