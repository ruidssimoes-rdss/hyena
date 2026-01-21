# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - Mobile Foundation Release

### Added

- Platform-aware touch targets (44pt iOS / 48dp Android) across all interactive components
- Shared platform utilities (`platform.ts`) for consistent sizing across components
- SafeArea support documentation and patterns
- `hitSlop` on visually compact elements (checkboxes, small buttons) to expand tappable area
- Platform Support guide page with comprehensive setup instructions
- Preview disclaimer in docs for mobile/tablet viewport modes

### Changed

- Button, Checkbox, Input, Switch, Select, Radio, Slider, and 30+ other components now meet accessibility touch target guidelines
- Updated documentation messaging to accurately reflect cross-platform support
- Replaced "Universal" terminology with "Cross-Platform" to set accurate expectations
- Homepage hero updated: "React Native components for iOS, Android & Web"
- Docs landing page features now highlight platform-aware touch targets

### Fixed

- Checkbox touch target increased from 20x20 to proper 44/48pt (with hitSlop)
- Switch touch target compliance on all platforms
- RadioGroup item touch targets now meet guidelines
- Select trigger touch target sizing
- Slider thumb touch target increased
- All icon-only buttons now have proper touch targets

### Documentation

- Main README: Added Platform Support section with feature matrix
- Package README: Updated accessibility section with platform-specific details
- New guide: `/docs/guides/platform-support` covering touch targets, SafeArea, shadows, animations
- Component previews now show disclaimer when in mobile/tablet viewport mode

## [1.0.0] - Initial Release

### Added

- 45+ production-ready components
- 3 built-in themes (Dark, Light, Oatmeal)
- NativeWind styling integration
- Compound component patterns
- Full TypeScript support
- WCAG 2.1 accessibility compliance
- Reduced motion support
- 360+ Storybook stories
