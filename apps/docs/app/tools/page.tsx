'use client';

import { useState } from 'react';
import Link from 'next/link';

// ========================================
// Tool Data
// ========================================

interface Tool {
  id: string;
  name: string;
  description: string;
  href: string;
  isActive: boolean;
}

const tools: Tool[] = [
  {
    id: 'studio',
    name: 'Studio',
    description: 'Define colors, fonts, spacing, radius, gaps in one place. See it live. Download everything. Plug it in whenever.',
    href: '/studio',
    isActive: true,
  },
  {
    id: 'lint',
    name: 'Lint',
    description: 'Automated design and accessibility linter. Paste code, get instant feedback on issues and best practices.',
    href: '/lint',
    isActive: true,
  },
  {
    id: 'icon',
    name: 'Icon',
    description: 'Search, preview and copy icons. Multiple styles, clean exports. Built for speed.',
    href: '/tools/icon',
    isActive: false,
  },
  {
    id: 'theme',
    name: 'Theme',
    description: 'Live theme generator. Pick a base, tweak, export. Dark mode, light mode, any mode you want.',
    href: '/tools/theme',
    isActive: false,
  },
];

// ========================================
// Preview Components
// ========================================

function StudioPreview() {
  const colors = ['#171717', '#525252', '#A3A3A3', '#D4D4D4', '#F5F5F5'];
  return (
    <div className="flex items-center justify-center h-full gap-2">
      {colors.map((color, i) => (
        <div
          key={i}
          className="w-6 h-6 rounded"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}

function LintPreview() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-full bg-[#dcfce7] flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#166534" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <span className="text-xs font-medium text-hy-600">All checks passed</span>
      </div>
    </div>
  );
}

function IconPreview() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="grid grid-cols-4 gap-2">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-4 h-4 rounded bg-hy-200" />
        ))}
      </div>
    </div>
  );
}

function ThemePreview() {
  return (
    <div className="flex items-center justify-center h-full gap-2">
      <div className="w-8 h-8 rounded bg-white border border-hy-200" />
      <div className="w-8 h-8 rounded bg-hy-900" />
    </div>
  );
}

// Map tool IDs to preview components
function getToolPreview(toolId: string) {
  switch (toolId) {
    case 'studio':
      return <StudioPreview />;
    case 'lint':
      return <LintPreview />;
    case 'icon':
      return <IconPreview />;
    case 'theme':
      return <ThemePreview />;
    default:
      return null;
  }
}

// ========================================
// Tool Card Component
// ========================================

function ToolCard({ tool }: { tool: Tool }) {
  const content = (
    <>
      {/* Preview Area */}
      <div className={`h-24 border-b transition-colors duration-150 ${
        tool.isActive
          ? 'bg-hy-50 border-hy-200 group-hover:bg-hy-100'
          : 'bg-hy-50 border-hy-200'
      }`}>
        <div className={tool.isActive ? '' : 'opacity-40'}>
          {getToolPreview(tool.id)}
        </div>
      </div>

      {/* Name & Description */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className={`text-sm font-medium transition-colors duration-150 ${
            tool.isActive
              ? 'text-hy-900 group-hover:text-hy-800'
              : 'text-hy-400'
          }`}>
            {tool.name}
          </div>
          {!tool.isActive && (
            <span className="text-[10px] font-medium uppercase tracking-wide text-hy-400">
              coming soon
            </span>
          )}
        </div>
        <div className={`mt-1 text-xs leading-relaxed ${
          tool.isActive ? 'text-hy-500' : 'text-hy-400'
        }`}>
          {tool.description}
        </div>
      </div>
    </>
  );

  if (tool.isActive) {
    return (
      <Link
        href={tool.href}
        className="group block rounded-lg border bg-white overflow-hidden transition-all duration-150 border-hy-200 hover:border-hy-400 hover:shadow-md cursor-pointer"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="group block rounded-lg border bg-white overflow-hidden transition-all duration-150 border-hy-200 cursor-default">
      {content}
    </div>
  );
}

// ========================================
// Suggestion Box Component
// ========================================

function SuggestionBox() {
  const [suggestion, setSuggestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim()) return;

    setIsSubmitting(true);

    // For now, just log to console - can be connected to an API later
    console.log('Tool suggestion:', suggestion);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setSuggestion('');

    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="rounded-lg border-2 border-dashed border-hy-300 bg-white p-6">
      <h3 className="text-sm font-medium text-hy-900">suggest a tool</h3>
      <p className="mt-1 text-xs text-hy-500">
        Have an idea for a tool that would help your workflow? Let us know.
      </p>

      {isSubmitted ? (
        <div className="mt-4 flex items-center gap-2 text-sm text-hy-600">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Thanks for your suggestion!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4">
          <textarea
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            placeholder="Describe the tool you'd like to see..."
            rows={3}
            className="w-full px-3 py-2 text-sm rounded-lg border border-hy-200 bg-white text-hy-900 placeholder-hy-400 focus:outline-none focus:border-hy-400 focus:ring-2 focus:ring-hy-900/5 transition-all duration-150 resize-none"
          />
          <button
            type="submit"
            disabled={!suggestion.trim() || isSubmitting}
            className="mt-3 px-4 py-2 text-sm font-medium rounded-lg bg-hy-900 text-white hover:bg-hy-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
          >
            {isSubmitting ? 'Submitting...' : 'Submit suggestion'}
          </button>
        </form>
      )}
    </div>
  );
}

// ========================================
// Main Page Component
// ========================================

export default function ToolsPage() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)]">
      {/* Header Section */}
      <div className="border-b border-hy-200">
        <div className="max-w-[1280px] mx-auto px-6 py-12">
          <div className="text-xs font-mono text-hy-500 uppercase tracking-wide mb-2">
            tools
          </div>
          <h1 className="text-3xl font-bold text-hy-900 mb-2">
            ship faster with dev tools
          </h1>
          <p className="text-lg text-hy-500">
            Productivity tools for designers and developers working with Hyena
          </p>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-[1280px] mx-auto px-6 py-12">
        {/* Section Label */}
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xs font-medium text-hy-400 uppercase tracking-wide">
            TOOLS
          </h2>
          <span className="text-xs text-hy-400">({tools.length})</span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {/* Suggestion Box */}
        <div className="mt-12 max-w-md">
          <SuggestionBox />
        </div>
      </div>

      {/* Bottom padding */}
      <div className="h-16" />
    </div>
  );
}
