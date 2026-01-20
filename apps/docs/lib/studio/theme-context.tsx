'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { StudioTheme, StudioState, ThemeMode, DeviceFrame } from './types';
import { generateColorScale } from './color-utils';
import { presets } from './presets';

interface StudioContextType {
  state: StudioState;

  // Color actions
  setPrimaryColor: (color: string) => void;
  setSecondaryColor: (color: string) => void;
  setAccentColor: (color: string) => void;

  // Radius actions
  setRadius: (key: keyof Omit<StudioTheme['radius'], 'default'>, value: number) => void;
  setDefaultRadius: (value: StudioTheme['radius']['default']) => void;

  // Spacing actions
  setBaseUnit: (value: number) => void;

  // UI actions
  setMode: (mode: ThemeMode) => void;
  setDevice: (device: DeviceFrame) => void;

  // Preset actions
  applyPreset: (presetName: string) => void;

  // Reset
  reset: () => void;
}

const StudioContext = createContext<StudioContextType | null>(null);

export function useStudio() {
  const context = useContext(StudioContext);
  if (!context) {
    throw new Error('useStudio must be used within StudioProvider');
  }
  return context;
}

const defaultTheme: StudioTheme = presets.minimal; // Start with minimal preset

export function StudioProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StudioState>({
    theme: defaultTheme,
    mode: 'dark',
    device: 'desktop',
    activePreset: 'minimal',
  });

  const setPrimaryColor = useCallback((color: string) => {
    setState((prev) => ({
      ...prev,
      activePreset: null,
      theme: {
        ...prev.theme,
        colors: {
          ...prev.theme.colors,
          primary: color,
          primaryScale: generateColorScale(color),
        },
      },
    }));
  }, []);

  const setSecondaryColor = useCallback((color: string) => {
    setState((prev) => ({
      ...prev,
      activePreset: null,
      theme: {
        ...prev.theme,
        colors: {
          ...prev.theme.colors,
          secondary: color,
          secondaryScale: generateColorScale(color),
        },
      },
    }));
  }, []);

  const setAccentColor = useCallback((color: string) => {
    setState((prev) => ({
      ...prev,
      activePreset: null,
      theme: {
        ...prev.theme,
        colors: {
          ...prev.theme.colors,
          accent: color,
          accentScale: generateColorScale(color),
        },
      },
    }));
  }, []);

  const setRadius = useCallback(
    (key: keyof Omit<StudioTheme['radius'], 'default'>, value: number) => {
      setState((prev) => ({
        ...prev,
        activePreset: null,
        theme: {
          ...prev.theme,
          radius: {
            ...prev.theme.radius,
            [key]: value,
          },
        },
      }));
    },
    []
  );

  const setDefaultRadius = useCallback((value: StudioTheme['radius']['default']) => {
    setState((prev) => ({
      ...prev,
      activePreset: null,
      theme: {
        ...prev.theme,
        radius: {
          ...prev.theme.radius,
          default: value,
        },
      },
    }));
  }, []);

  const setBaseUnit = useCallback((value: number) => {
    // Generate new scale based on base unit
    const newScale = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16].map((multiplier) => multiplier * value);
    setState((prev) => ({
      ...prev,
      activePreset: null,
      theme: {
        ...prev.theme,
        spacing: {
          baseUnit: value,
          scale: newScale,
        },
      },
    }));
  }, []);

  const setMode = useCallback((mode: ThemeMode) => {
    setState((prev) => ({
      ...prev,
      mode,
    }));
  }, []);

  const setDevice = useCallback((device: DeviceFrame) => {
    setState((prev) => ({
      ...prev,
      device,
    }));
  }, []);

  const applyPreset = useCallback((presetName: string) => {
    const preset = presets[presetName as keyof typeof presets];
    if (preset) {
      setState((prev) => ({
        ...prev,
        theme: preset,
        activePreset: presetName,
      }));
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      theme: defaultTheme,
      mode: 'dark',
      device: 'desktop',
      activePreset: 'minimal',
    });
  }, []);

  return (
    <StudioContext.Provider
      value={{
        state,
        setPrimaryColor,
        setSecondaryColor,
        setAccentColor,
        setRadius,
        setDefaultRadius,
        setBaseUnit,
        setMode,
        setDevice,
        applyPreset,
        reset,
      }}
    >
      {children}
    </StudioContext.Provider>
  );
}
