'use client';

import { useState } from 'react';
import { useTokens } from '@/lib/studio/context';
import { StudioToolbar } from './StudioToolbar';
import { StudioPreview } from './StudioPreview';
import { StudioControls } from './StudioControls';
import { ExportModal } from './ExportModal';
import Link from 'next/link';

// Icons
function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function RotateCcwIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

export function TokenBuilder() {
  const { reset } = useTokens();
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      {/* Page Header - Clean, minimal */}
      <header className="h-14 flex-shrink-0 border-b border-[#E5E7EB] flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#6B7280] hover:text-[#111827] transition-colors"
          >
            <ArrowLeftIcon />
            <span className="text-sm">Back</span>
          </Link>
          <div className="h-4 w-px bg-[#E5E7EB]" />
          <span className="font-semibold text-[#111827]">r/ui Token Builder</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={reset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] rounded-md transition-colors"
          >
            <RotateCcwIcon />
            Reset
          </button>
          <button
            onClick={() => setExportOpen(true)}
            className="flex items-center gap-1.5 px-4 py-1.5 text-sm bg-[#18181B] text-white rounded-md hover:bg-[#27272A] transition-colors font-medium"
          >
            <DownloadIcon />
            Export
          </button>
        </div>
      </header>

      {/* Main Content - Full height */}
      <div className="flex-1 w-full mx-auto px-4 lg:px-[120px] xl:px-[200px] py-6 overflow-hidden">
        {/* Playground Container - Full height */}
        <div className="h-full border border-[#E5E7EB] rounded-lg overflow-hidden bg-white flex flex-col">
          {/* Toolbar */}
          <StudioToolbar />

          {/* Split View - 60/40 */}
          <div className="flex-1 flex overflow-hidden">
            {/* Preview - 60% */}
            <div className="flex-[3] border-r border-[#E5E7EB] overflow-hidden">
              <StudioPreview />
            </div>

            {/* Controls - 40% */}
            <div className="flex-[2] overflow-hidden">
              <StudioControls />
            </div>
          </div>
        </div>
      </div>

      <ExportModal open={exportOpen} onOpenChange={setExportOpen} />
    </div>
  );
}
