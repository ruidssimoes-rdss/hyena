import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'tokens/index': 'src/tokens/index.ts',
    'themes/index': 'src/themes/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: false, // Generate .d.ts separately via tsc for better compatibility
  external: [
    'react',
    'react-native',
    'nativewind',
    'react-native-svg',
    'expo-blur',
    '@react-native-async-storage/async-storage',
    'react-native-safe-area-context',
  ],
  clean: true,
  sourcemap: true,
  skipNodeModulesBundle: true,
});
