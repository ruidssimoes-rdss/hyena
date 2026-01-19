'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PlaygroundLayout } from '../../../../components/playground';
import { datePickerData } from '../../../../lib/componentRegistry';
import {
  DatePickerBasicPreview,
  DatePickerWithDefaultPreview,
  DatePickerWithMinMaxPreview,
  DatePickerNoWeekendsPreview,
  DatePickerDisabledPreview,
  DatePickerCustomFormatPreview,
} from '../../../../components/previews/DatePickerPreviews';

// Map variant IDs to preview components
const previewComponents: Record<string, React.ComponentType> = {
  'basic': DatePickerBasicPreview,
  'with-default': DatePickerWithDefaultPreview,
  'with-min-max': DatePickerWithMinMaxPreview,
  'no-weekends': DatePickerNoWeekendsPreview,
  'disabled': DatePickerDisabledPreview,
  'custom-format': DatePickerCustomFormatPreview,
};

// Render preview based on variant ID
function renderPreview(variantId: string) {
  const PreviewComponent = previewComponents[variantId];
  if (!PreviewComponent) {
    return <div className="text-gray-500">Preview not found</div>;
  }
  return <PreviewComponent />;
}

function DatePickerPageContent() {
  const searchParams = useSearchParams();
  const variantParam = searchParams.get('variant');

  return (
    <PlaygroundLayout
      componentData={datePickerData}
      initialVariantId={variantParam || 'basic'}
      renderPreview={renderPreview}
    />
  );
}

// Loading fallback
function PlaygroundSkeleton() {
  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-white">
      {/* Nav skeleton */}
      <div className="h-12 border-b border-gray-200 flex items-center justify-between px-4">
        <div className="h-6 w-32 bg-gray-100 rounded animate-pulse" />
        <div className="h-6 w-48 bg-gray-100 rounded animate-pulse" />
      </div>
      {/* Toolbar skeleton */}
      <div className="h-12 border-b border-gray-200 bg-gray-50/50 flex items-center px-4 gap-2">
        <div className="h-8 w-24 bg-gray-100 rounded animate-pulse" />
        <div className="h-8 w-8 bg-gray-100 rounded animate-pulse" />
        <div className="h-8 w-24 bg-gray-100 rounded animate-pulse" />
      </div>
      {/* Content skeleton */}
      <div className="flex-1 flex">
        <div className="flex-1 bg-gray-50 flex items-center justify-center">
          <div className="h-32 w-64 bg-gray-100 rounded-lg animate-pulse" />
        </div>
        <div className="flex-1 bg-zinc-950" />
      </div>
    </div>
  );
}

export default function DatePickerPage() {
  return (
    <Suspense fallback={<PlaygroundSkeleton />}>
      <DatePickerPageContent />
    </Suspense>
  );
}
