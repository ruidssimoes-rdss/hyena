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

const formatConfig: Record<ExportFormat, { label: string; ext: string; icon: string }> = {
  css: { label: 'CSS Variables', ext: 'css', icon: '{ }' },
  theme: { label: 'r/ui Theme', ext: 'ts', icon: 'TS' },
  tailwind: { label: 'Tailwind', ext: 'js', icon: 'TW' },
  json: { label: 'JSON', ext: 'json', icon: '{ }' },
};

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
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `r-ui-theme.${formatConfig[format].ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop with heavy blur */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xl z-50"
        onClick={() => onOpenChange(false)}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="studio-glass-strong rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl animate-in zoom-in-95 fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-[var(--studio-glass-border)]">
            <div>
              <h2 className="text-lg font-semibold text-[var(--studio-text)]">Export Theme</h2>
              <p className="text-sm text-[var(--studio-text-muted)] mt-0.5">
                Choose a format and copy or download your theme
              </p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="p-2 text-[var(--studio-text-muted)] hover:text-[var(--studio-text)] transition-colors rounded-lg hover:bg-white/5"
            >
              <CloseIcon size={18} />
            </button>
          </div>

          {/* Content */}
          <div className="p-5 space-y-4 flex-1 overflow-auto">
            {/* Format selector */}
            <div className="flex gap-2">
              {(Object.keys(formatConfig) as ExportFormat[]).map((key) => {
                const config = formatConfig[key];
                return (
                  <button
                    key={key}
                    onClick={() => setFormat(key)}
                    className={cn(
                      'flex-1 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                      'studio-glass-subtle',
                      format === key
                        ? 'studio-glass-active text-[var(--studio-text)]'
                        : 'text-[var(--studio-text-muted)] hover:text-[var(--studio-text)]'
                    )}
                  >
                    <span className="block text-[10px] font-mono mb-0.5 opacity-50">{config.icon}</span>
                    {config.label}
                  </button>
                );
              })}
            </div>

            {/* Code preview */}
            <div className="relative group">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-[var(--studio-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <pre className="bg-black/40 p-4 rounded-xl overflow-auto max-h-72 text-sm text-[var(--studio-text-muted)] border border-[var(--studio-glass-border)] font-mono">
                <code>{code}</code>
              </pre>

              {/* Copy button overlay */}
              <button
                onClick={handleCopy}
                className={cn(
                  'absolute top-3 right-3 p-2 rounded-lg transition-all duration-200',
                  'studio-glass-subtle hover:studio-glass',
                  copied
                    ? 'text-green-400'
                    : 'text-[var(--studio-text-muted)] hover:text-[var(--studio-text)]'
                )}
              >
                {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-5 border-t border-[var(--studio-glass-border)]">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--studio-text-dimmed)]">
                {code.split('\n').length} lines
              </span>
              <span className="text-xs text-[var(--studio-text-dimmed)]">•</span>
              <span className="text-xs text-[var(--studio-text-dimmed)]">
                .{formatConfig[format].ext}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenChange(false)}
                className="studio-btn studio-btn-ghost"
              >
                Cancel
              </button>
              <button
                onClick={handleDownload}
                className="studio-btn studio-btn-primary"
              >
                <DownloadIcon size={14} />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
