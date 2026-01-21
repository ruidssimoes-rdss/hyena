'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

// ========================================
// Types
// ========================================

export type DeviceMode = 'mobile' | 'tablet' | 'desktop';
export type ViewMode = 'preview' | 'code' | 'split';
export type PreviewTheme = 'light' | 'dark';

const GLASS_STORAGE_KEY = 'hyena-glass-preview';

export interface ComponentVariant {
  id: string;
  label: string;
  code: string;
}

export interface ComponentData {
  slug: string;
  name: string;
  description: string;
  category: string;
  categorySlug: string;
  variants: ComponentVariant[];
  installation: string;
  usage: string;
  features: string[];
  props: PropTable[];
  accessibility?: string;
}

export interface PropTable {
  component: string;
  props: PropDefinition[];
}

export interface PropDefinition {
  name: string;
  type: string;
  default: string;
  description: string;
}

interface PlaygroundState {
  // Device & view
  deviceMode: DeviceMode;
  viewMode: ViewMode;
  previewTheme: PreviewTheme;
  glassMode: boolean;

  // Navigation
  activeVariantId: string;

  // Component data
  componentData: ComponentData | null;
}

interface PlaygroundContextValue extends PlaygroundState {
  // Setters
  setDeviceMode: (mode: DeviceMode) => void;
  setViewMode: (mode: ViewMode) => void;
  setPreviewTheme: (theme: PreviewTheme) => void;
  setGlassMode: (enabled: boolean) => void;
  toggleGlassMode: () => void;
  setActiveVariantId: (id: string) => void;
  setComponentData: (data: ComponentData) => void;

  // Navigation helpers
  goToPrevVariant: () => void;
  goToNextVariant: () => void;

  // Computed values
  activeVariant: ComponentVariant | null;
  variantIndex: number;
  totalVariants: number;

  // Actions
  copyCode: () => Promise<void>;
  refreshPreview: () => void;
  openInNewTab: () => void;
}

// ========================================
// Context
// ========================================

const PlaygroundContext = createContext<PlaygroundContextValue | null>(null);

// ========================================
// Provider
// ========================================

interface PlaygroundProviderProps {
  children: ReactNode;
  initialData?: ComponentData;
  initialVariantId?: string;
}

export function PlaygroundProvider({
  children,
  initialData,
  initialVariantId
}: PlaygroundProviderProps) {
  // State
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [previewTheme, setPreviewTheme] = useState<PreviewTheme>('light');
  const [glassMode, setGlassModeState] = useState<boolean>(false);
  const [activeVariantId, setActiveVariantId] = useState<string>(
    initialVariantId || initialData?.variants[0]?.id || ''
  );
  const [componentData, setComponentData] = useState<ComponentData | null>(initialData || null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Load glass mode from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(GLASS_STORAGE_KEY);
    if (stored === 'true') {
      setGlassModeState(true);
    }
  }, []);

  // Glass mode setter with localStorage persistence
  const setGlassMode = useCallback((enabled: boolean) => {
    setGlassModeState(enabled);
    localStorage.setItem(GLASS_STORAGE_KEY, enabled ? 'true' : 'false');
  }, []);

  const toggleGlassMode = useCallback(() => {
    setGlassMode(!glassMode);
  }, [glassMode, setGlassMode]);

  // Update active variant when component data changes
  useEffect(() => {
    if (componentData && !componentData.variants.find(v => v.id === activeVariantId)) {
      setActiveVariantId(componentData.variants[0]?.id || '');
    }
  }, [componentData, activeVariantId]);

  // Computed values
  const activeVariant = componentData?.variants.find(v => v.id === activeVariantId) || null;
  const variantIndex = componentData?.variants.findIndex(v => v.id === activeVariantId) ?? -1;
  const totalVariants = componentData?.variants.length ?? 0;

  // Navigation
  const goToPrevVariant = useCallback(() => {
    if (!componentData || variantIndex <= 0) return;
    setActiveVariantId(componentData.variants[variantIndex - 1].id);
  }, [componentData, variantIndex]);

  const goToNextVariant = useCallback(() => {
    if (!componentData || variantIndex >= totalVariants - 1) return;
    setActiveVariantId(componentData.variants[variantIndex + 1].id);
  }, [componentData, variantIndex, totalVariants]);

  // Actions
  const copyCode = useCallback(async () => {
    if (activeVariant?.code) {
      await navigator.clipboard.writeText(activeVariant.code);
    }
  }, [activeVariant]);

  const refreshPreview = useCallback(() => {
    setRefreshKey(k => k + 1);
  }, []);

  const openInNewTab = useCallback(() => {
    // Could open in CodeSandbox or similar
    window.open(`/preview/${componentData?.slug}/${activeVariantId}`, '_blank');
  }, [componentData, activeVariantId]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if focused on input elements
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Arrow keys for variant navigation
      if (e.key === 'ArrowLeft' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        goToPrevVariant();
        return;
      }
      if (e.key === 'ArrowRight' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        goToNextVariant();
        return;
      }

      // Without modifiers
      if (!e.metaKey && !e.ctrlKey && !e.altKey) {
        switch (e.key) {
          case '1':
            setDeviceMode('mobile');
            break;
          case '2':
            setDeviceMode('tablet');
            break;
          case '3':
            setDeviceMode('desktop');
            break;
          case 'p':
            setViewMode('preview');
            break;
          case 'c':
            setViewMode('code');
            break;
          case 's':
            setViewMode('split');
            break;
          case 't':
            setPreviewTheme(prev => prev === 'light' ? 'dark' : 'light');
            break;
          case 'g':
            toggleGlassMode();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevVariant, goToNextVariant, toggleGlassMode]);

  const value: PlaygroundContextValue = {
    deviceMode,
    viewMode,
    previewTheme,
    glassMode,
    activeVariantId,
    componentData,
    setDeviceMode,
    setViewMode,
    setPreviewTheme,
    setGlassMode,
    toggleGlassMode,
    setActiveVariantId,
    setComponentData,
    goToPrevVariant,
    goToNextVariant,
    activeVariant,
    variantIndex,
    totalVariants,
    copyCode,
    refreshPreview,
    openInNewTab,
  };

  return (
    <PlaygroundContext.Provider value={value}>
      {children}
    </PlaygroundContext.Provider>
  );
}

// ========================================
// Hook
// ========================================

export function usePlayground() {
  const context = useContext(PlaygroundContext);
  if (!context) {
    throw new Error('usePlayground must be used within a PlaygroundProvider');
  }
  return context;
}

export function usePlaygroundOptional() {
  return useContext(PlaygroundContext);
}
