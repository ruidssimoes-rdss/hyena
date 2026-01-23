'use client';

import { useState, useCallback } from 'react';
import { TokenSystem } from '../types';
import { mapAIResponseToTokenSystem } from '../utils/tokenMapper';

interface ImageAnalysis {
  dominantColors: string[];
  mood: string;
  style: string;
}

interface GenerationState {
  isGenerating: boolean;
  isAnalyzing: boolean;
  error: string | null;
  lastVibeInterpretation: string | null;
  lastAnalysis: ImageAnalysis | null;
}

interface UseVibeGenerationReturn extends GenerationState {
  generateFromText: (vibe: string) => Promise<TokenSystem | null>;
  analyzeImage: (file: File) => Promise<TokenSystem | null>;
  clearError: () => void;
  clearFeedback: () => void;
}

export function useVibeGeneration(): UseVibeGenerationReturn {
  const [state, setState] = useState<GenerationState>({
    isGenerating: false,
    isAnalyzing: false,
    error: null,
    lastVibeInterpretation: null,
    lastAnalysis: null,
  });

  const generateFromText = useCallback(
    async (vibe: string): Promise<TokenSystem | null> => {
      setState((prev) => ({
        ...prev,
        isGenerating: true,
        error: null,
        lastVibeInterpretation: null,
      }));

      try {
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ vibe }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to generate design system');
        }

        const tokens = mapAIResponseToTokenSystem(data.tokens);

        setState((prev) => ({
          ...prev,
          isGenerating: false,
          lastVibeInterpretation: data.vibeInterpretation || null,
        }));

        return tokens;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to generate design system';
        setState((prev) => ({
          ...prev,
          isGenerating: false,
          error: errorMessage,
        }));
        throw err;
      }
    },
    []
  );

  const analyzeImage = useCallback(async (file: File): Promise<TokenSystem | null> => {
    setState((prev) => ({
      ...prev,
      isAnalyzing: true,
      error: null,
      lastAnalysis: null,
    }));

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze image');
      }

      const tokens = mapAIResponseToTokenSystem(data.tokens);

      setState((prev) => ({
        ...prev,
        isAnalyzing: false,
        lastAnalysis: data.analysis || null,
      }));

      return tokens;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze image';
      setState((prev) => ({
        ...prev,
        isAnalyzing: false,
        error: errorMessage,
      }));
      throw err;
    }
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  const clearFeedback = useCallback(() => {
    setState((prev) => ({
      ...prev,
      lastVibeInterpretation: null,
      lastAnalysis: null,
    }));
  }, []);

  return {
    ...state,
    generateFromText,
    analyzeImage,
    clearError,
    clearFeedback,
  };
}
