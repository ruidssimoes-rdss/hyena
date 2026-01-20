'use client';

import { PreviewMode } from '@/lib/studio/types';

interface PreviewShowcaseProps {
  mode: PreviewMode;
}

// Icons
function MoreVerticalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" x2="12" y1="5" y2="19" />
      <line x1="5" x2="19" y1="12" y2="12" />
    </svg>
  );
}

// Preview Block Component
function PreviewBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-[#737373] px-1.5 py-2">{label}</span>
      <div className="border border-dashed border-[#E5E5E5] bg-white p-6">
        {children}
      </div>
    </div>
  );
}

// Marketing Card Preview
function CardPreview() {
  return (
    <div className="flex justify-center">
      <div
        className="w-96 max-w-full overflow-hidden"
        style={{
          backgroundColor: 'var(--color-card)',
          borderRadius: '14px',
          boxShadow: '0px 0px 0px 1px rgba(10, 10, 10, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.05)',
        }}
      >
        {/* Image */}
        <div
          className="h-54 w-full"
          style={{
            backgroundColor: '#171717',
            height: '216px',
          }}
        />

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="space-y-1">
            <h3
              className="text-base font-medium"
              style={{ color: 'var(--color-foreground)' }}
            >
              Observability Plus is replacing Monitoring
            </h3>
            <p
              className="text-sm leading-5"
              style={{ color: 'var(--color-muted-foreground)' }}
            >
              Switch to the improved way to explore your data, with natural language. Monitoring will no longer be available on the Pro plan in November, 2025
            </p>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: '#FAFAFA',
                borderRadius: '8px',
              }}
            >
              Create Query
              <PlusIcon />
            </button>
            <span
              className="px-2 py-0.5 text-xs font-medium rounded-full"
              style={{
                backgroundColor: '#F5F5F5',
                color: '#171717',
              }}
            >
              Warning
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Form Preview
function FormPreview() {
  return (
    <div
      className="w-full max-w-md"
      style={{
        backgroundColor: 'var(--color-card)',
        borderRadius: '14px',
        boxShadow: '0px 0px 0px 1px rgba(10, 10, 10, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* Header */}
      <div className="p-6 pb-0 flex items-start justify-between">
        <div>
          <h3
            className="text-base font-medium"
            style={{ color: 'var(--color-foreground)' }}
          >
            User Information
          </h3>
          <p
            className="text-sm mt-1"
            style={{ color: 'var(--color-muted-foreground)' }}
          >
            Please fill in your details below
          </p>
        </div>
        <button className="p-2 -mr-2" style={{ color: 'var(--color-foreground)' }}>
          <MoreVerticalIcon />
        </button>
      </div>

      {/* Form */}
      <div className="p-6 space-y-4">
        {/* Name & Role Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              className="text-sm font-medium"
              style={{ color: 'var(--color-foreground)' }}
            >
              Name
            </label>
            <input
              type="text"
              className="w-full px-2.5 py-2 text-sm border"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.002)',
                borderColor: '#E5E5E5',
                borderRadius: '8px',
                boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
              }}
            />
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium"
              style={{ color: 'var(--color-foreground)' }}
            >
              Role
            </label>
            <div
              className="w-full flex items-center justify-between px-2.5 py-2 text-sm border cursor-pointer"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.002)',
                borderColor: '#E5E5E5',
                borderRadius: '8px',
                boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
              }}
            >
              <span style={{ color: 'var(--color-muted-foreground)' }}>Select a role</span>
              <ChevronDownIcon />
            </div>
          </div>
        </div>

        {/* Framework */}
        <div className="space-y-2">
          <label
            className="text-sm font-medium"
            style={{ color: 'var(--color-foreground)' }}
          >
            Framework
          </label>
          <div
            className="w-full flex items-center justify-between px-2.5 py-2 text-sm border"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.002)',
              borderColor: '#E5E5E5',
              borderRadius: '8px',
              boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
            }}
          >
            <span></span>
            <ChevronDownIcon />
          </div>
        </div>

        {/* Comments */}
        <div className="space-y-2">
          <label
            className="text-sm font-medium"
            style={{ color: 'var(--color-foreground)' }}
          >
            Comments
          </label>
          <textarea
            className="w-full px-2.5 py-2 text-sm border min-h-[64px] resize-none"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.002)',
              borderColor: '#E5E5E5',
              borderRadius: '8px',
              boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
            }}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3.5 pt-2">
          <button
            className="px-2.5 py-1.5 text-sm font-medium"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: '#FAFAFA',
              borderRadius: '8px',
            }}
          >
            Submit
          </button>
          <button
            className="px-2.5 py-1.5 text-sm font-medium border"
            style={{
              backgroundColor: '#FFFFFF',
              color: 'var(--color-foreground)',
              borderColor: '#E5E5E5',
              borderRadius: '8px',
              boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// Complex Form Preview (Payment Method)
function ComplexFormPreview() {
  return (
    <div
      className="w-full max-w-md"
      style={{
        backgroundColor: 'var(--color-card)',
        borderRadius: '14px',
        boxShadow: '0px 0px 0px 1px rgba(10, 10, 10, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div className="p-6">
        <h3
          className="text-base font-medium"
          style={{ color: 'var(--color-foreground)' }}
        >
          Payment Method
        </h3>
        <p
          className="text-sm mt-1"
          style={{ color: 'var(--color-muted-foreground)' }}
        >
          All transactions are secure and encrypted
        </p>
      </div>
    </div>
  );
}

// Fields Preview (Compute Environment)
function FieldsPreview() {
  return (
    <div className="space-y-3">
      <h3
        className="text-base font-medium"
        style={{ color: 'var(--color-foreground)' }}
      >
        Compute Environment
      </h3>
      <p
        className="text-sm"
        style={{ color: 'var(--color-muted-foreground)' }}
      >
        Select the compute environment for your cluster.
      </p>
      <div
        className="flex items-center justify-between px-3 py-2.5 border"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.002)',
          borderColor: '#E5E5E5',
          borderRadius: '8px',
        }}
      >
        <span
          className="text-sm"
          style={{ color: 'var(--color-foreground)' }}
        >
          Kubernetes
        </span>
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: 'var(--color-foreground)' }}
        />
      </div>
    </div>
  );
}

export function PreviewShowcase({ mode }: PreviewShowcaseProps) {
  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Left Column */}
      <div className="space-y-8">
        <PreviewBlock label="Card">
          <CardPreview />
        </PreviewBlock>

        <PreviewBlock label="Complex Form">
          <ComplexFormPreview />
        </PreviewBlock>
      </div>

      {/* Right Column */}
      <div className="space-y-8">
        <PreviewBlock label="Form">
          <FormPreview />
        </PreviewBlock>

        <PreviewBlock label="Fields">
          <FieldsPreview />
        </PreviewBlock>
      </div>
    </div>
  );
}
