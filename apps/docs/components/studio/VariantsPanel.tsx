'use client';

import { useState, useMemo } from 'react';
import {
  TokenSystem,
  ComponentVariants,
  ButtonVariants,
  InputVariant,
  CardVariants,
  BadgeVariants,
  AlertVariants,
} from '@/lib/studio/types';
import { generateComponentVariants } from '@/lib/studio/utils/variantGenerator';

interface VariantsPanelProps {
  tokens: TokenSystem;
  variants: ComponentVariants | null;
  onVariantsChange: (variants: ComponentVariants) => void;
  previewMode?: 'light' | 'dark';
}

type ComponentType = 'button' | 'input' | 'card' | 'badge' | 'alert';

export function VariantsPanel({
  tokens,
  variants,
  onVariantsChange,
  previewMode = 'dark',
}: VariantsPanelProps) {
  const [activeComponent, setActiveComponent] =
    useState<ComponentType>('button');
  const [isExpanded, setIsExpanded] = useState(false);

  const currentVariants = useMemo(() => {
    return variants || generateComponentVariants(tokens, previewMode);
  }, [tokens, variants, previewMode]);

  const handleRegenerate = () => {
    const newVariants = generateComponentVariants(tokens, previewMode);
    onVariantsChange(newVariants);
  };

  const components: { id: ComponentType; label: string; count: number }[] = [
    { id: 'button', label: 'Buttons', count: 6 },
    { id: 'input', label: 'Inputs', count: 1 },
    { id: 'card', label: 'Cards', count: 4 },
    { id: 'badge', label: 'Badges', count: 8 },
    { id: 'alert', label: 'Alerts', count: 5 },
  ];

  return (
    <div className="border border-neutral-800 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-neutral-900/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <ComponentIcon className="w-5 h-5 text-neutral-400" />
          <span className="font-medium text-sm">Component Variants</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-500">
            {components.reduce((sum, c) => sum + c.count, 0)} variants
          </span>
          <ChevronIcon
            className={`w-4 h-4 text-neutral-500 transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-neutral-800">
          <div className="flex border-b border-neutral-800 overflow-x-auto">
            {components.map((comp) => (
              <button
                key={comp.id}
                onClick={() => setActiveComponent(comp.id)}
                className={`px-4 py-2 text-sm whitespace-nowrap transition-colors ${
                  activeComponent === comp.id
                    ? 'text-blue-400 border-b-2 border-blue-400 bg-blue-400/5'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {comp.label}
                <span className="ml-1 text-xs text-neutral-600">
                  ({comp.count})
                </span>
              </button>
            ))}
          </div>

          <div className="p-4">
            {activeComponent === 'button' && (
              <ButtonVariantsPreview variants={currentVariants.button} />
            )}
            {activeComponent === 'input' && (
              <InputVariantPreview variant={currentVariants.input} />
            )}
            {activeComponent === 'card' && (
              <CardVariantsPreview variants={currentVariants.card} />
            )}
            {activeComponent === 'badge' && (
              <BadgeVariantsPreview variants={currentVariants.badge} />
            )}
            {activeComponent === 'alert' && (
              <AlertVariantsPreview variants={currentVariants.alert} />
            )}
          </div>

          <div className="px-4 py-3 border-t border-neutral-800 flex justify-between items-center">
            <p className="text-xs text-neutral-500">
              Variants auto-generated from your tokens
            </p>
            <button
              onClick={handleRegenerate}
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              Regenerate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ButtonVariantsPreview({ variants }: { variants: ButtonVariants }) {
  const variantNames: (keyof ButtonVariants)[] = [
    'primary',
    'secondary',
    'outline',
    'ghost',
    'destructive',
    'link',
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {variantNames.map((name) => {
          const v = variants[name];
          return (
            <div key={name} className="space-y-2">
              <p className="text-xs text-neutral-500 capitalize">{name}</p>
              <button
                style={{
                  backgroundColor: v.background,
                  color: v.text,
                  borderColor: v.border,
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }}
                className="w-full px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Button
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function InputVariantPreview({ variant }: { variant: InputVariant }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-xs text-neutral-500">Default</p>
          <input
            type="text"
            placeholder="Placeholder text"
            readOnly
            style={{
              backgroundColor: variant.background,
              color: variant.text,
              borderColor: variant.border,
            }}
            className="w-full px-3 py-2 rounded-md border text-sm outline-none"
          />
        </div>

        <div className="space-y-2">
          <p className="text-xs text-neutral-500">Focus</p>
          <input
            type="text"
            placeholder="Focused input"
            readOnly
            style={{
              backgroundColor: variant.background,
              color: variant.text,
              borderColor: variant.focusBorder,
              boxShadow: `0 0 0 3px ${variant.focusRing}`,
            }}
            className="w-full px-3 py-2 rounded-md border text-sm outline-none"
          />
        </div>

        <div className="space-y-2">
          <p className="text-xs text-neutral-500">Error</p>
          <input
            type="text"
            placeholder="Error state"
            readOnly
            style={{
              backgroundColor: variant.errorBackground,
              color: variant.text,
              borderColor: variant.errorBorder,
            }}
            className="w-full px-3 py-2 rounded-md border text-sm outline-none"
          />
        </div>

        <div className="space-y-2">
          <p className="text-xs text-neutral-500">Disabled</p>
          <input
            type="text"
            placeholder="Disabled input"
            disabled
            style={{
              backgroundColor: variant.disabledBackground,
              color: variant.disabledText,
              borderColor: variant.border,
            }}
            className="w-full px-3 py-2 rounded-md border text-sm cursor-not-allowed outline-none"
          />
        </div>
      </div>
    </div>
  );
}

function CardVariantsPreview({ variants }: { variants: CardVariants }) {
  const variantNames: (keyof CardVariants)[] = [
    'default',
    'elevated',
    'outlined',
    'filled',
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {variantNames.map((name) => {
        const v = variants[name];
        return (
          <div
            key={name}
            style={{
              backgroundColor: v.background,
              borderColor: v.border,
              borderWidth: v.border !== 'transparent' ? '1px' : '0',
              borderStyle: 'solid',
              boxShadow: v.shadow !== 'none' ? v.shadow : undefined,
            }}
            className="rounded-lg overflow-hidden"
          >
            <div className="p-3">
              <p className="text-xs text-neutral-500 capitalize mb-1">{name}</p>
              <p className="text-sm font-medium text-neutral-200">Card Title</p>
              <p className="text-xs text-neutral-500 mt-1">
                Card content goes here
              </p>
            </div>
            <div style={{ backgroundColor: v.footerBackground }} className="px-3 py-2">
              <p className="text-xs text-neutral-500">Footer</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function BadgeVariantsPreview({ variants }: { variants: BadgeVariants }) {
  const variantNames: (keyof BadgeVariants)[] = [
    'default',
    'primary',
    'secondary',
    'success',
    'warning',
    'error',
    'info',
    'outline',
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {variantNames.map((name) => {
        const v = variants[name];
        return (
          <span
            key={name}
            style={{
              backgroundColor: v.background,
              color: v.text,
              borderColor: v.border,
              borderWidth: v.border !== 'transparent' ? '1px' : '0',
              borderStyle: 'solid',
            }}
            className="px-2 py-1 rounded-md text-xs font-medium capitalize"
          >
            {name}
          </span>
        );
      })}
    </div>
  );
}

function AlertVariantsPreview({ variants }: { variants: AlertVariants }) {
  const variantNames: (keyof AlertVariants)[] = [
    'default',
    'success',
    'warning',
    'error',
    'info',
  ];

  return (
    <div className="space-y-2">
      {variantNames.map((name) => {
        const v = variants[name];
        return (
          <div
            key={name}
            style={{
              backgroundColor: v.background,
              color: v.text,
              borderColor: v.border,
              borderWidth: '1px',
              borderStyle: 'solid',
            }}
            className="px-3 py-2 rounded-md flex items-center gap-2"
          >
            <div style={{ color: v.icon }} className="w-4 h-4 flex-shrink-0">
              <AlertIcon />
            </div>
            <span className="text-sm capitalize">{name} alert message</span>
          </div>
        );
      })}
    </div>
  );
}

function ComponentIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
      />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      className="w-full h-full"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
