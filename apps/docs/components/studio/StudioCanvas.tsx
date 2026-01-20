'use client';

import { useState } from 'react';
import { useStudio } from '@/lib/studio/theme-context';
import { TokenPanel } from './TokenPanel';
import { LivePreview } from './LivePreview';
import { PreviewControls } from './PreviewControls';
import { ExportModal } from './ExportModal';
import Link from 'next/link';

function RotateCcwIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
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

function DownloadIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
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

export function StudioCanvas() {
  const { state, reset } = useStudio();
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="h-14 border-b border-zinc-800 flex items-center justify-between px-4 bg-zinc-950/80 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-white">r/ui</span>
            <span className="text-sm text-zinc-400">Studio</span>
          </Link>

          {state.activePreset && (
            <span className="text-xs bg-zinc-800 px-2 py-1 rounded-md text-zinc-400">
              {state.activePreset}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={reset}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <RotateCcwIcon size={16} />
            Reset
          </button>

          <button
            onClick={() => setExportOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-white text-black rounded-md hover:bg-zinc-200 transition-colors"
          >
            <DownloadIcon size={16} />
            Export Theme
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Token Editors */}
        <aside className="w-80 border-r border-zinc-800 overflow-y-auto bg-zinc-900/50">
          <TokenPanel />
        </aside>

        {/* Right Panel - Preview */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Preview Controls */}
          <div className="h-12 border-b border-zinc-800 flex items-center justify-center px-4 gap-2">
            <PreviewControls />
          </div>

          {/* Live Preview */}
          <div className="flex-1 overflow-auto p-8 bg-zinc-950">
            <LivePreview />
          </div>
        </main>
      </div>

      {/* Export Modal */}
      <ExportModal open={exportOpen} onOpenChange={setExportOpen} />
    </div>
  );
}
