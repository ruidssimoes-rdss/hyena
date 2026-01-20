'use client';

import { useState } from 'react';
import { TokenSidebar } from './TokenSidebar';
import { TokenPreview } from './TokenPreview';
import { TokenExport } from './TokenExport';
import { ValidationPanel } from './ValidationPanel';
import { ExportModal } from './ExportModal';
import { useTokens } from '@/lib/studio/context';
import Link from 'next/link';

export function TokenBuilder() {
  const { reset, validationErrors } = useTokens();
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Ambient background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="h-14 border-b border-white/5 bg-white/[0.02] backdrop-blur-sm flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span className="text-sm">Back</span>
            </Link>
            <div className="h-4 w-px bg-white/10" />
            <span className="font-semibold">r/ui Token Builder</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={reset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
              </svg>
              Reset
            </button>
            <button
              onClick={() => setExportOpen(true)}
              className="flex items-center gap-1.5 px-4 py-1.5 text-sm bg-white text-black rounded-lg hover:bg-white/90 transition-colors font-medium"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export
            </button>
          </div>
        </header>

        {/* Main content with max-width and padding */}
        <div className="max-w-[1600px] mx-auto px-6 py-6">
          <div className="flex gap-6 min-h-[calc(100vh-120px)]">
            {/* Left panel - glass treatment */}
            <div className="w-[420px] shrink-0">
              <div className="glass-panel h-full overflow-hidden">
                <TokenSidebar />
              </div>
            </div>

            {/* Right panel - glass treatment */}
            <div className="flex-1 flex flex-col gap-6 min-w-0">
              <div className="glass-panel flex-1 overflow-hidden relative">
                <TokenPreview />
                {/* Validation Warnings - overlay at bottom */}
                {validationErrors.length > 0 && (
                  <ValidationPanel errors={validationErrors} />
                )}
              </div>
              <div className="glass-panel h-[300px] overflow-hidden">
                <TokenExport />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ExportModal open={exportOpen} onOpenChange={setExportOpen} />
    </div>
  );
}
