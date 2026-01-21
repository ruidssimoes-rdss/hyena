export {
  breakpoints,
  useResponsiveValue,
  useCurrentBreakpoint,
} from './responsive';
export type { Breakpoint, ResponsiveValue } from './responsive';

export {
  TOUCH_TARGET,
  interactiveSize,
  getHitSlop,
  getHitSlopRect,
  platformSpacing,
  isNative,
  isWeb,
  isIOS,
  isAndroid,
} from './platform';
export type { HitSlop } from './platform';
