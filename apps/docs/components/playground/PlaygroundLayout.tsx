'use client';

import { ReactNode, useEffect } from 'react';
import { PlaygroundProvider, ComponentData, usePlayground } from './PlaygroundContext';
import { PlaygroundToolbar } from './PlaygroundToolbar';
import { PlaygroundNav, PlaygroundNavMobile } from './PlaygroundNav';
import { PlaygroundSplit, PlaygroundSplitMobile } from './PlaygroundSplit';
import { PlaygroundDocs, PlaygroundDocsCompact } from './PlaygroundDocs';

// ========================================
// Types
// ========================================

interface PlaygroundLayoutProps {
  componentData: ComponentData;
  initialVariantId?: string;
  renderPreview: (variantId: string) => ReactNode;
}

// ========================================
// Inner Layout (uses context)
// ========================================

interface PlaygroundInnerProps {
  renderPreview: (variantId: string) => ReactNode;
}

function PlaygroundInner({ renderPreview }: PlaygroundInnerProps) {
  const { activeVariantId, componentData } = usePlayground();

  // Render the current preview
  const previewContent = renderPreview(activeVariantId);

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-white">
      {/* Desktop: Full toolbar + nav */}
      <div className="hidden lg:block">
        <PlaygroundNav />
        <PlaygroundToolbar />
      </div>

      {/* Mobile/Tablet: Compact nav */}
      <div className="lg:hidden">
        <PlaygroundNavMobile />
      </div>

      {/* Main content area with horizontal padding */}
      <div className="flex-1 min-h-0 overflow-hidden px-6 lg:px-12 py-6">
        {/* Desktop: Split view */}
        <div className="hidden lg:block h-full rounded-lg overflow-hidden border border-gray-200">
          <PlaygroundSplit previewContent={previewContent} />
        </div>

        {/* Mobile/Tablet: Stacked view */}
        <div className="lg:hidden h-full rounded-lg overflow-hidden border border-gray-200">
          <PlaygroundSplitMobile previewContent={previewContent} />
        </div>
      </div>

      {/* Documentation tabs */}
      <div className="hidden lg:block max-h-[40vh] overflow-auto border-t border-gray-200">
        <PlaygroundDocs />
      </div>

      {/* Mobile: Compact docs */}
      <div className="lg:hidden border-t border-gray-200">
        <PlaygroundDocsCompact />
      </div>
    </div>
  );
}

// ========================================
// Main Component
// ========================================

export function PlaygroundLayout({
  componentData,
  initialVariantId,
  renderPreview,
}: PlaygroundLayoutProps) {
  return (
    <PlaygroundProvider
      initialData={componentData}
      initialVariantId={initialVariantId}
    >
      <PlaygroundInner renderPreview={renderPreview} />
    </PlaygroundProvider>
  );
}

// ========================================
// Export for convenience
// ========================================

export { PlaygroundProvider, usePlayground } from './PlaygroundContext';
export type { ComponentData, ComponentVariant, PropTable, PropDefinition } from './PlaygroundContext';
