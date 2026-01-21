import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import type { ThemeName, Theme } from './types';
import { lightTheme } from './light';
import { darkTheme } from './dark';
import { oatmealTheme } from './oatmeal';
import { glassTheme } from './glass';

// Theme registry
const themes: Record<ThemeName, Theme> = {
  light: lightTheme as Theme,
  dark: darkTheme as Theme,
  oatmeal: oatmealTheme as Theme,
  glass: glassTheme as Theme,
};

export interface ThemeContextValue {
  /** Current theme name */
  themeName: ThemeName;
  /** Current theme object with all tokens */
  theme: Theme;
  /** Alias for theme - current theme token object */
  tokens: Theme;
  /** Function to change the current theme */
  setTheme: (theme: ThemeName) => void;
  /** List of available theme names */
  availableThemes: ThemeName[];
  /** Helper boolean for glass theme detection */
  isGlass: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  /** Initial theme to use */
  defaultTheme?: ThemeName;
  /** Child components */
  children: React.ReactNode;
}

/**
 * ThemeProvider - Provides theme context to the component tree
 *
 * Wrap your app with ThemeProvider to enable theme switching:
 *
 * ```tsx
 * <ThemeProvider defaultTheme="glass">
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  defaultTheme = 'dark',
  children,
}: ThemeProviderProps) {
  const [themeName, setThemeName] = useState<ThemeName>(defaultTheme);

  const setTheme = useCallback((name: ThemeName) => {
    if (themes[name]) {
      setThemeName(name);
    } else {
      console.warn(`Theme "${name}" not found. Available themes: ${Object.keys(themes).join(', ')}`);
    }
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      themeName,
      theme: themes[themeName],
      tokens: themes[themeName],
      setTheme,
      availableThemes: Object.keys(themes) as ThemeName[],
      isGlass: themeName === 'glass',
    }),
    [themeName, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * useTheme - Hook to access the current theme context
 *
 * ```tsx
 * function MyComponent() {
 *   const { theme, themeName, setTheme, isGlass } = useTheme();
 *
 *   return (
 *     <View style={{ backgroundColor: theme.colors.background }}>
 *       <Text>Current theme: {themeName}</Text>
 *       {isGlass && <Text>Glass mode active!</Text>}
 *       <Button onPress={() => setTheme('glass')}>
 *         Switch to Glass
 *       </Button>
 *     </View>
 *   );
 * }
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useTheme must be used within a ThemeProvider. ' +
      'Wrap your app with <ThemeProvider> to use theme features.'
    );
  }

  return context;
}

/**
 * Get a theme by name without requiring context
 * Useful for static style definitions or testing
 */
export function getTheme(name: ThemeName): Theme {
  return themes[name];
}
