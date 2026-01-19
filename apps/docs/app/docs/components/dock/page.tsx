'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PlaygroundLayout } from '../../../../components/playground';
import { dockData } from '../../../../lib/componentRegistry';
import {
  DockBasicPreview,
  DockMagnificationPreview,
  DockLeftPreview,
  DockBadgesPreview,
  DockActivePreview,
  DockSeparatorsPreview,
  DockAutoHidePreview,
} from '../../../../components/previews/DockPreviews';

// Map variant IDs to preview components
const previewComponents: Record<string, React.ComponentType> = {
  'basic': DockBasicPreview,
  'magnification': DockMagnificationPreview,
  'left-position': DockLeftPreview,
  'badges': DockBadgesPreview,
  'active': DockActivePreview,
  'separators': DockSeparatorsPreview,
  'auto-hide': DockAutoHidePreview,
};

// Render preview based on variant ID
function renderPreview(variantId: string) {
  const PreviewComponent = previewComponents[variantId];
  if (!PreviewComponent) {
    return <div className="text-gray-500">Preview not found</div>;
  }
  return <PreviewComponent />;
}

function DockPageContent() {
  const searchParams = useSearchParams();
  const variantParam = searchParams.get('variant');

  return (
    <PlaygroundLayout
      componentData={dockData}
      initialVariantId={variantParam || 'basic'}
      renderPreview={renderPreview}
    />
  );
}

// Loading fallback
function PlaygroundSkeleton() {
  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-white">
      <div className="h-12 border-b border-gray-200 flex items-center justify-between px-4">
        <div className="h-6 w-32 bg-gray-100 rounded animate-pulse" />
        <div className="h-6 w-48 bg-gray-100 rounded animate-pulse" />
      </div>
      <div className="flex-1 flex">
        <div className="flex-1 bg-gray-50 flex items-center justify-center">
          <div className="h-32 w-64 bg-gray-100 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default function DockPage() {
  return (
    <Suspense fallback={<PlaygroundSkeleton />}>
      <DockPageContent />
    </Suspense>
  );
}
