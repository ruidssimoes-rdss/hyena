/**
 * Animation tokens for consistent motion across components
 */

export const animations = {
  /**
   * Duration tokens in milliseconds
   */
  duration: {
    /** Instant transition (0ms) */
    instant: 0,
    /** Fast animations (150ms) - micro-interactions, hover states */
    fast: 150,
    /** Normal animations (200ms) - standard transitions */
    normal: 200,
    /** Slow animations (300ms) - complex transitions */
    slow: 300,
    /** Slower animations (500ms) - page transitions, large movements */
    slower: 500,
  },

  /**
   * Easing functions for timing-based animations
   */
  easing: {
    linear: 'linear',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },

  /**
   * Spring configurations for physics-based animations
   * Used with Animated.spring() in React Native
   */
  spring: {
    /** Gentle spring - smooth, subtle movements */
    gentle: { tension: 65, friction: 10 },
    /** Snappy spring - quick, responsive feel */
    snappy: { tension: 100, friction: 10 },
    /** Bouncy spring - playful, energetic */
    bouncy: { tension: 300, friction: 15 },
    /** Stiff spring - minimal overshoot, precise */
    stiff: { tension: 300, friction: 30 },
  },
} as const;

export type AnimationDuration = keyof typeof animations.duration;
export type AnimationEasing = keyof typeof animations.easing;
export type AnimationSpring = keyof typeof animations.spring;
export type Animations = typeof animations;
