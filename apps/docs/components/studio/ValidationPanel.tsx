'use client';

import { ValidationError } from '@/lib/studio/types';

interface ValidationPanelProps {
  errors: ValidationError[];
}

export function ValidationPanel({ errors }: ValidationPanelProps) {
  const errorCount = errors.filter((e) => e.type === 'error').length;
  const warningCount = errors.filter((e) => e.type === 'warning').length;

  return (
    <div className="absolute bottom-4 left-4 right-4 glass-panel-subtle rounded-xl p-4">
      <div className="flex items-start gap-3">
        {/* Icon */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-amber-400 shrink-0 mt-0.5"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-amber-400">
            {errorCount > 0 && `${errorCount} error${errorCount > 1 ? 's' : ''}`}
            {errorCount > 0 && warningCount > 0 && ', '}
            {warningCount > 0 && `${warningCount} warning${warningCount > 1 ? 's' : ''}`}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1 truncate">
            {errors[0]?.message}
            {errors[0]?.suggestion && ` (${errors[0].suggestion})`}
          </p>
        </div>
      </div>
    </div>
  );
}
