'use client';

import { useState } from 'react';

/**
 * EmptyState Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

type IconType = 'no-data' | 'error' | 'search' | 'permission' | 'folder';

function EmptyStateIcon({ type }: { type: IconType }) {
  const iconMap: Record<IconType, React.ReactNode> = {
    'no-data': (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
    ),
    'error': (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    'search': (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    'permission': (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    'folder': (
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
  };

  return (
    <div className="w-16 h-16 rounded-full bg-[var(--component-bg-elevated)] flex items-center justify-center mb-4">
      <div className="w-8 h-8 text-[var(--component-text-muted)]">
        {iconMap[type]}
      </div>
    </div>
  );
}

function EmptyState({
  icon = 'no-data',
  title,
  description,
  actionLabel,
  onAction,
  compact = false,
}: {
  icon?: IconType;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  compact?: boolean;
}) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${compact ? 'py-6' : 'py-12'}`}>
      <EmptyStateIcon type={icon} />
      <h3 className="text-lg font-semibold text-[var(--component-text)]">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-[var(--component-text-muted)] max-w-xs">{description}</p>
      )}
      {actionLabel && (
        <button
          onClick={onAction}
          className="mt-4 px-4 py-2 text-sm font-medium text-white bg-[var(--btn-primary-bg)] hover:bg-[var(--btn-primary-bg-hover)] rounded-lg transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export function EmptyStateNoDataPreview() {
  return (
    <div className="w-full max-w-sm border border-[var(--component-border)] rounded-lg">
      <EmptyState
        icon="no-data"
        title="No data yet"
        description="Get started by creating your first item."
        actionLabel="Create Item"
      />
    </div>
  );
}

export function EmptyStateSearchPreview() {
  return (
    <div className="w-full max-w-sm border border-[var(--component-border)] rounded-lg">
      <EmptyState
        icon="search"
        title="No results found"
        description="Try adjusting your search or filter to find what you're looking for."
      />
    </div>
  );
}

export function EmptyStateErrorPreview() {
  return (
    <div className="w-full max-w-sm border border-[var(--component-border)] rounded-lg">
      <EmptyState
        icon="error"
        title="Something went wrong"
        description="We couldn't load your data. Please try again."
        actionLabel="Retry"
      />
    </div>
  );
}

export function EmptyStatePermissionPreview() {
  return (
    <div className="w-full max-w-sm border border-[var(--component-border)] rounded-lg">
      <EmptyState
        icon="permission"
        title="Access denied"
        description="You don't have permission to view this content."
        actionLabel="Request Access"
      />
    </div>
  );
}

export function EmptyStateWithActionPreview() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-full max-w-sm border border-[var(--component-border)] rounded-lg">
      <EmptyState
        icon="folder"
        title="No files uploaded"
        description={count > 0 ? `You clicked ${count} times` : "Upload files to get started."}
        actionLabel="Upload Files"
        onAction={() => setCount(c => c + 1)}
      />
    </div>
  );
}

export function EmptyStateCompactPreview() {
  return (
    <div className="w-full max-w-xs border border-[var(--component-border)] rounded-lg">
      <EmptyState
        icon="no-data"
        title="No items"
        description="Add items to see them here."
        compact
      />
    </div>
  );
}
