'use client';

import { useState, useEffect } from 'react';
import { useStudio } from '@/lib/studio/theme-context';
import {
  generateCSSExport,
  generateThemeExport,
  generateTailwindExport,
} from '@/lib/studio/export-utils';
import { cn } from '@/lib/utils';

type ExportFormat = 'css' | 'theme' | 'tailwind' | 'json';

interface ExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function CopyIcon({ size = 14 }: { size?: number }) {
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
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon({ size = 14 }: { size?: number }) {
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
      <polyline points="20 6 9 17 4 12" />
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

function CloseIcon({ size = 20 }: { size?: number }) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function ExportModal({ open, onOpenChange }: ExportModalProps) {
  const { state } = useStudio();
  const [format, setFormat] = useState<ExportFormat>('css');
  const [copied, setCopied] = useState(false);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, onOpenChange]);

  const getExportCode = () => {
    switch (format) {
      case 'css':
        return generateCSSExport(state.theme);
      case 'theme':
        return generateThemeExport(state.theme);
      case 'tailwind':
        return generateTailwindExport(state.theme);
      case 'json':
        return JSON.stringify(state.theme, null, 2);
    }
  };

  const code = getExportCode();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const extensions: Record<ExportFormat, string> = {
      css: 'css',
      theme: 'ts',
      tailwind: 'js',
      json: 'json',
    };

    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `r-ui-theme.${extensions[format]}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={() => onOpenChange(false)}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-zinc-800">
            <div>
              <h2 className="text-lg font-semibold text-white">Export Theme</h2>
              <p className="text-sm text-zinc-400">
                Choose a format and copy or download your theme configuration.
              </p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="p-2 text-zinc-400 hover:text-white transition-colors rounded-md hover:bg-zinc-800"
            >
              <CloseIcon size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4 flex-1 overflow-auto">
            {/* Format selector */}
            <div className="flex gap-2">
              {[
                { key: 'css', label: 'CSS Variables' },
                { key: 'theme', label: 'r/ui Theme' },
                { key: 'tailwind', label: 'Tailwind' },
                { key: 'json', label: 'JSON' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFormat(key as ExportFormat)}
                  className={cn(
                    'px-3 py-1.5 rounded-md text-sm font-medium transition-all',
                    format === key
                      ? 'bg-white text-black'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Code preview */}
            <div className="relative">
              <pre className="bg-zinc-950 p-4 rounded-lg overflow-auto max-h-80 text-sm text-zinc-300 border border-zinc-800">
                <code>{code}</code>
              </pre>

              <div className="absolute top-2 right-2 flex gap-1">
                <button
                  onClick={handleCopy}
                  className="p-2 text-zinc-400 hover:text-white transition-colors rounded-md hover:bg-zinc-800 bg-zinc-900"
                >
                  {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 p-4 border-t border-zinc-800">
            <button
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 text-sm font-medium text-zinc-300 border border-zinc-700 rounded-md hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white text-black rounded-md hover:bg-zinc-200 transition-colors"
            >
              <DownloadIcon size={16} />
              Download
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
