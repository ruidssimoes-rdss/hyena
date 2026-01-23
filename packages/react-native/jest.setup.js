// Jest setup file
import '@testing-library/jest-native/extend-expect';

// Mock react-native completely to avoid ESM issues with RN 0.83
jest.mock('react-native', () => {
  const React = require('react');

  const createComponent = (name) => {
    const Component = React.forwardRef(({ children, ...props }, ref) => {
      return React.createElement(name, { ...props, ref }, children);
    });
    Component.displayName = name;
    return Component;
  };

  // Special Pressable that handles render function children
  const Pressable = React.forwardRef(({ children, style, ...props }, ref) => {
    // Handle render function pattern: {({ pressed }) => content}
    const renderedChildren = typeof children === 'function'
      ? children({ pressed: false })
      : children;

    // Handle style function pattern: {({ pressed }) => styles}
    const resolvedStyle = typeof style === 'function'
      ? style({ pressed: false })
      : style;

    return React.createElement('Pressable', { ...props, style: resolvedStyle, ref }, renderedChildren);
  });
  Pressable.displayName = 'Pressable';

  // Special TouchableOpacity that handles render function children
  const TouchableOpacity = React.forwardRef(({ children, style, ...props }, ref) => {
    const renderedChildren = typeof children === 'function'
      ? children({ pressed: false })
      : children;
    const resolvedStyle = typeof style === 'function'
      ? style({ pressed: false })
      : style;
    return React.createElement('TouchableOpacity', { ...props, style: resolvedStyle, ref }, renderedChildren);
  });
  TouchableOpacity.displayName = 'TouchableOpacity';

  // Animated Value class with all methods
  class AnimatedValue {
    constructor(value) {
      this._value = value;
      this._listeners = [];
    }
    setValue(value) { this._value = value; }
    setOffset(offset) { this._offset = offset; }
    flattenOffset() {}
    extractOffset() {}
    addListener(cb) { this._listeners.push(cb); return { remove: () => {} }; }
    removeListener() {}
    removeAllListeners() {}
    stopAnimation(cb) { cb && cb(this._value); }
    resetAnimation(cb) { cb && cb(this._value); }
    interpolate(config) {
      return new AnimatedValue(this._value);
    }
  }

  // Animated API
  const Animated = {
    View: createComponent('Animated.View'),
    Text: createComponent('Animated.Text'),
    Image: createComponent('Animated.Image'),
    ScrollView: createComponent('Animated.ScrollView'),
    FlatList: createComponent('Animated.FlatList'),
    Value: AnimatedValue,
    ValueXY: class {
      constructor() {
        this.x = new AnimatedValue(0);
        this.y = new AnimatedValue(0);
      }
      setValue() {}
      setOffset() {}
      flattenOffset() {}
      extractOffset() {}
      addListener() { return { remove: () => {} }; }
      removeListener() {}
      stopAnimation() {}
      resetAnimation() {}
      getLayout() { return {}; }
      getTranslateTransform() { return []; }
    },
    timing: (value, config) => ({
      start: (callback) => callback && callback({ finished: true }),
      stop: () => {},
      reset: () => {},
    }),
    spring: (value, config) => ({
      start: (callback) => callback && callback({ finished: true }),
      stop: () => {},
      reset: () => {},
    }),
    decay: (value, config) => ({
      start: (callback) => callback && callback({ finished: true }),
      stop: () => {},
      reset: () => {},
    }),
    sequence: (animations) => ({
      start: (callback) => callback && callback({ finished: true }),
      stop: () => {},
      reset: () => {},
    }),
    parallel: (animations, config) => ({
      start: (callback) => callback && callback({ finished: true }),
      stop: () => {},
      reset: () => {},
    }),
    stagger: (delay, animations) => ({
      start: (callback) => callback && callback({ finished: true }),
      stop: () => {},
      reset: () => {},
    }),
    delay: (time) => ({
      start: (callback) => callback && callback({ finished: true }),
      stop: () => {},
      reset: () => {},
    }),
    loop: (animation, config) => ({
      start: (callback) => {},
      stop: () => {},
      reset: () => {},
    }),
    event: (mapping, config) => () => {},
    createAnimatedComponent: (Component) => Component,
    add: (a, b) => new AnimatedValue(0),
    subtract: (a, b) => new AnimatedValue(0),
    divide: (a, b) => new AnimatedValue(0),
    multiply: (a, b) => new AnimatedValue(0),
    modulo: (a, b) => new AnimatedValue(0),
    diffClamp: (a, min, max) => new AnimatedValue(0),
  };

  // AccessibilityInfo mock
  const AccessibilityInfo = {
    isReduceMotionEnabled: jest.fn(() => Promise.resolve(false)),
    isScreenReaderEnabled: jest.fn(() => Promise.resolve(false)),
    isBoldTextEnabled: jest.fn(() => Promise.resolve(false)),
    isGrayscaleEnabled: jest.fn(() => Promise.resolve(false)),
    isInvertColorsEnabled: jest.fn(() => Promise.resolve(false)),
    isReduceTransparencyEnabled: jest.fn(() => Promise.resolve(false)),
    prefersCrossFadeTransitions: jest.fn(() => Promise.resolve(false)),
    announceForAccessibility: jest.fn(),
    announceForAccessibilityWithOptions: jest.fn(),
    setAccessibilityFocus: jest.fn(),
    addEventListener: jest.fn(() => ({ remove: jest.fn() })),
    removeEventListener: jest.fn(),
  };

  return {
    View: createComponent('View'),
    Text: createComponent('Text'),
    TouchableOpacity,
    TouchableHighlight: createComponent('TouchableHighlight'),
    TouchableWithoutFeedback: createComponent('TouchableWithoutFeedback'),
    Pressable,
    ScrollView: createComponent('ScrollView'),
    FlatList: createComponent('FlatList'),
    SectionList: createComponent('SectionList'),
    TextInput: createComponent('TextInput'),
    Image: createComponent('Image'),
    ImageBackground: createComponent('ImageBackground'),
    Modal: createComponent('Modal'),
    ActivityIndicator: createComponent('ActivityIndicator'),
    Switch: createComponent('Switch'),
    SafeAreaView: createComponent('SafeAreaView'),
    KeyboardAvoidingView: createComponent('KeyboardAvoidingView'),
    StatusBar: createComponent('StatusBar'),
    Animated,
    AccessibilityInfo,
    StyleSheet: {
      create: (s) => s,
      flatten: (s) => (Array.isArray(s) ? Object.assign({}, ...s.filter(Boolean)) : s || {}),
      absoluteFill: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
      absoluteFillObject: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
      hairlineWidth: 1,
    },
    Platform: {
      OS: 'ios',
      Version: '14.0',
      isTV: false,
      isTesting: true,
      select: (obj) => obj.ios ?? obj.default ?? obj.native,
    },
    Dimensions: {
      get: () => ({ width: 375, height: 812, scale: 2, fontScale: 1 }),
      addEventListener: () => ({ remove: () => {} }),
    },
    PixelRatio: {
      get: () => 2,
      getFontScale: () => 1,
      getPixelSizeForLayoutSize: (size) => size * 2,
      roundToNearestPixel: (size) => Math.round(size),
    },
    Appearance: {
      getColorScheme: () => 'light',
      addChangeListener: () => ({ remove: () => {} }),
    },
    Keyboard: {
      addListener: () => ({ remove: () => {} }),
      dismiss: () => {},
    },
    Linking: {
      openURL: jest.fn(() => Promise.resolve()),
      canOpenURL: jest.fn(() => Promise.resolve(true)),
      getInitialURL: jest.fn(() => Promise.resolve(null)),
    },
    Alert: {
      alert: jest.fn(),
      prompt: jest.fn(),
    },
    NativeModules: {},
    useColorScheme: () => 'light',
    useWindowDimensions: () => ({ width: 375, height: 812, scale: 2, fontScale: 1 }),
    Easing: {
      linear: (x) => x,
      ease: (x) => x,
      quad: (x) => x * x,
      cubic: (x) => x * x * x,
      poly: (n) => (x) => Math.pow(x, n),
      sin: (x) => 1 - Math.cos((x * Math.PI) / 2),
      circle: (x) => 1 - Math.sqrt(1 - x * x),
      exp: (x) => Math.pow(2, 10 * (x - 1)),
      elastic: (bounciness = 1) => (x) => 1 - Math.pow(Math.cos((x * Math.PI) / 2), 3) * Math.cos(x * bounciness * Math.PI),
      back: (s = 1.70158) => (x) => x * x * ((s + 1) * x - s),
      bounce: (x) => {
        if (x < 1 / 2.75) return 7.5625 * x * x;
        if (x < 2 / 2.75) return 7.5625 * (x -= 1.5 / 2.75) * x + 0.75;
        if (x < 2.5 / 2.75) return 7.5625 * (x -= 2.25 / 2.75) * x + 0.9375;
        return 7.5625 * (x -= 2.625 / 2.75) * x + 0.984375;
      },
      bezier: (x1, y1, x2, y2) => (t) => t,
      in: (easing) => easing,
      out: (easing) => (t) => 1 - easing(1 - t),
      inOut: (easing) => (t) => t < 0.5 ? easing(t * 2) / 2 : 1 - easing((1 - t) * 2) / 2,
    },
  };
});

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => ({
  default: {
    call: () => {},
    createAnimatedComponent: (c) => c,
    Value: class { constructor(v) { this._value = v; } setValue() {} },
    event: () => () => {},
    timing: () => ({ start: (cb) => cb && cb({ finished: true }) }),
    spring: () => ({ start: (cb) => cb && cb({ finished: true }) }),
  },
  useSharedValue: jest.fn((init) => ({ value: init })),
  useAnimatedStyle: jest.fn(() => ({})),
  useDerivedValue: jest.fn((fn) => ({ value: fn() })),
  withTiming: jest.fn((v) => v),
  withSpring: jest.fn((v) => v),
  withSequence: jest.fn((...v) => v[v.length - 1]),
  withDelay: jest.fn((_, v) => v),
  withRepeat: jest.fn((v) => v),
  runOnJS: jest.fn((fn) => fn),
  runOnUI: jest.fn((fn) => fn),
  Easing: { linear: jest.fn(), ease: jest.fn(), bezier: jest.fn(() => jest.fn()) },
  FadeIn: { duration: jest.fn(() => ({ build: () => ({}) })) },
  FadeOut: { duration: jest.fn(() => ({ build: () => ({}) })) },
}));

// Mock NativeWind
jest.mock('nativewind', () => ({
  styled: (component) => component,
  useColorScheme: () => ({ colorScheme: 'dark', setColorScheme: jest.fn() }),
}));

// Mock expo-blur
jest.mock('expo-blur', () => ({
  BlurView: 'BlurView',
}));

// Mock react-native-svg with actual component mocks
jest.mock('react-native-svg', () => {
  const React = require('react');
  const createSvgComponent = (name) => {
    const Component = React.forwardRef(({ children, ...props }, ref) => {
      return React.createElement(name, { ...props, ref }, children);
    });
    Component.displayName = name;
    return Component;
  };
  return {
    __esModule: true,
    default: createSvgComponent('Svg'),
    Svg: createSvgComponent('Svg'),
    Circle: createSvgComponent('Circle'),
    Rect: createSvgComponent('Rect'),
    Path: createSvgComponent('Path'),
    Line: createSvgComponent('Line'),
    Polyline: createSvgComponent('Polyline'),
    Polygon: createSvgComponent('Polygon'),
    G: createSvgComponent('G'),
    Defs: createSvgComponent('Defs'),
    LinearGradient: createSvgComponent('LinearGradient'),
    RadialGradient: createSvgComponent('RadialGradient'),
    Stop: createSvgComponent('Stop'),
    ClipPath: createSvgComponent('ClipPath'),
    Text: createSvgComponent('SvgText'),
    TSpan: createSvgComponent('TSpan'),
    Mask: createSvgComponent('Mask'),
    Use: createSvgComponent('Use'),
    Symbol: createSvgComponent('Symbol'),
    Pattern: createSvgComponent('Pattern'),
    Image: createSvgComponent('SvgImage'),
    ForeignObject: createSvgComponent('ForeignObject'),
  };
});

// Mock lucide-react-native icons (virtual since module may not be installed)
jest.mock('lucide-react-native', () => {
  const React = require('react');
  const createIconMock = (name) => {
    const Icon = React.forwardRef((props, ref) => {
      return React.createElement('View', { ...props, ref, testID: `icon-${name}` });
    });
    Icon.displayName = name;
    return Icon;
  };

  // Export common icons
  return new Proxy({}, {
    get: (target, prop) => {
      if (prop === '__esModule') return true;
      return createIconMock(prop);
    }
  });
}, { virtual: true });

// Silence console warnings during tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};
