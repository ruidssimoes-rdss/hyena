'use client';

import { useState, useRef, useCallback, useEffect, ReactNode } from 'react';
import { usePlayground } from './PlaygroundContext';
import { PlaygroundPreview } from './PlaygroundPreview';
import { PlaygroundCode } from './PlaygroundCode';

// ========================================
// Resizable Split View
// ========================================

interface ResizableSplitProps {
  left: ReactNode;
  right: ReactNode;
  defaultRatio?: number;
  minLeftWidth?: number;
  minRightWidth?: number;
}

function ResizableSplit({
  left,
  right,
  defaultRatio = 0.5,
  minLeftWidth = 300,
  minRightWidth = 300,
}: ResizableSplitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ratio, setRatio] = useState(defaultRatio);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const newRatio = (e.clientX - rect.left) / rect.width;

    // Calculate min ratios based on pixel constraints
    const minLeftRatio = minLeftWidth / rect.width;
    const minRightRatio = minRightWidth / rect.width;
    const maxRatio = 1 - minRightRatio;

    setRatio(Math.min(Math.max(newRatio, minLeftRatio), maxRatio));
  }, [isDragging, minLeftWidth, minRightWidth]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div ref={containerRef} className="flex h-full relative">
      {/* Left panel */}
      <div
        className="h-full overflow-hidden"
        style={{ width: `${ratio * 100}%` }}
      >
        {left}
      </div>

      {/* Resize handle */}
      <div
        className={`
          w-1 h-full cursor-col-resize relative group
          ${isDragging ? 'bg-blue-500' : 'bg-gray-200 hover:bg-gray-300'}
          transition-colors
        `}
        onMouseDown={handleMouseDown}
      >
        {/* Visual indicator */}
        <div
          className={`
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-4 h-8 rounded-full
            flex items-center justify-center
            ${isDragging ? 'bg-blue-500' : 'bg-gray-300 group-hover:bg-gray-400'}
            transition-colors
          `}
        >
          <div className="w-0.5 h-4 bg-gray-500 rounded-full mx-0.5" />
          <div className="w-0.5 h-4 bg-gray-500 rounded-full mx-0.5" />
        </div>
      </div>

      {/* Right panel */}
      <div
        className="h-full overflow-hidden"
        style={{ width: `${(1 - ratio) * 100}%` }}
      >
        {right}
      </div>
    </div>
  );
}

// ========================================
// Main Component
// ========================================

interface PlaygroundSplitProps {
  previewContent: ReactNode;
}

export function PlaygroundSplit({ previewContent }: PlaygroundSplitProps) {
  const { viewMode } = usePlayground();

  // Preview only
  if (viewMode === 'preview') {
    return (
      <div className="h-full">
        <PlaygroundPreview>{previewContent}</PlaygroundPreview>
      </div>
    );
  }

  // Code only
  if (viewMode === 'code') {
    return (
      <div className="h-full">
        <PlaygroundCode />
      </div>
    );
  }

  // Split view (default)
  return (
    <ResizableSplit
      left={<PlaygroundPreview>{previewContent}</PlaygroundPreview>}
      right={<PlaygroundCode />}
    />
  );
}

// ========================================
// Mobile Split (Stacked)
// ========================================

export function PlaygroundSplitMobile({ previewContent }: PlaygroundSplitProps) {
  const { viewMode, setViewMode } = usePlayground();
  const [mobileView, setMobileView] = useState<'preview' | 'code'>('preview');

  // On mobile, split becomes a toggle
  const activeView = viewMode === 'split' ? mobileView : viewMode === 'preview' ? 'preview' : 'code';

  return (
    <div className="h-full flex flex-col">
      {/* Toggle buttons */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => {
            setMobileView('preview');
            if (viewMode !== 'split') setViewMode('preview');
          }}
          className={`
            flex-1 py-2 text-sm font-medium transition-colors
            ${activeView === 'preview'
              ? 'text-gray-900 border-b-2 border-gray-900'
              : 'text-gray-500 hover:text-gray-700'
            }
          `}
        >
          Preview
        </button>
        <button
          onClick={() => {
            setMobileView('code');
            if (viewMode !== 'split') setViewMode('code');
          }}
          className={`
            flex-1 py-2 text-sm font-medium transition-colors
            ${activeView === 'code'
              ? 'text-gray-900 border-b-2 border-gray-900'
              : 'text-gray-500 hover:text-gray-700'
            }
          `}
        >
          Code
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeView === 'preview' ? (
          <PlaygroundPreview>{previewContent}</PlaygroundPreview>
        ) : (
          <PlaygroundCode />
        )}
      </div>
    </div>
  );
}
