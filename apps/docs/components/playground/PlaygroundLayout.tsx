'use client';

import { ReactNode } from 'react';
import { PlaygroundProvider, ComponentData, usePlayground } from './PlaygroundContext';
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
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)] bg-white">
      {/* Contained layout - 320px side padding on desktop (1920-320*2=1280px content) */}
      <div className="w-full mx-auto px-4 lg:px-[320px] flex flex-col">
        {/* Desktop: Single combined toolbar row - 60px top padding, 48px height */}
        <div className="hidden lg:block pt-[60px]">
          <PlaygroundNav />
        </div>

        {/* Mobile/Tablet: Compact nav */}
        <div className="lg:hidden pt-4">
          <PlaygroundNavMobile />
        </div>

        {/* Main content area - fixed 450px height */}
        <div className="lg:h-[450px] lg:flex-shrink-0 mt-0">
          {/* Desktop: Split view with border */}
          <div className="hidden lg:block h-full">
            <PlaygroundSplit previewContent={previewContent} />
          </div>

          {/* Mobile/Tablet: Stacked view */}
          <div className="lg:hidden h-[400px]">
            <PlaygroundSplitMobile previewContent={previewContent} />
          </div>
        </div>

        {/* Documentation section - 24px top padding, 32px bottom */}
        <div className="hidden lg:block pt-6 pb-8">
          <PlaygroundDocs />
        </div>

        {/* Mobile: Compact docs */}
        <div className="lg:hidden">
          <PlaygroundDocsCompact />
        </div>
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
