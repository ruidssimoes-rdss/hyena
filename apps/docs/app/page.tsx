'use client';

import { useState } from 'react';
import Link from 'next/link';

/**
 * Homepage v4 - Sort.to Style (Precise)
 *
 * Minimal, calm homepage inspired by sort.to.
 * Lots of whitespace, centered layouts, simple features.
 */

// Icons (inline SVGs to avoid dependencies)
function SmartphoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}

function MonitorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function PaletteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" />
    </svg>
  );
}

function AccessibilityIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="4" r="1" />
      <path d="m18 19 1-7-6 1" />
      <path d="m5 8 3-3 5.5 3-2.36 3.5" />
      <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />
      <path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
    </svg>
  );
}

function TerminalIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" x2="20" y1="19" y2="19" />
    </svg>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function FeatureItem({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-4 text-gray-400">
        {icon}
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
}

function PreviewCard({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3 p-4 rounded-lg bg-white border border-gray-100">
      <div className="flex items-center justify-center min-h-[48px]">
        {children}
      </div>
      <span className="text-xs text-gray-400">{label}</span>
    </div>
  );
}

export default function HomePage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText('npm install @hyena-studio/react-native');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* SECTION 1: Hero */}
      <section className="pt-20 pb-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Eyebrow */}
          <p className="text-sm text-gray-500 mb-4">
            Available for iOS, Android & Web
          </p>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-tight">
            Universal React Native Components
          </h1>

          {/* Subheadline */}
          <p className="mt-4 text-lg text-gray-500 max-w-lg mx-auto">
            Beautiful, accessible components you can copy and paste.
            Build once, run everywhere.
          </p>

          {/* Single CTA */}
          <div className="mt-8">
            <Link
              href="/docs/installation"
              className="inline-flex items-center px-8 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: Product Screenshot */}
      <section className="py-16 bg-[#f5f0e8]">
        <div className="relative">
          {/* Screenshot container */}
          <div className="relative max-w-5xl mx-auto px-6">
            <div className="rounded-xl overflow-hidden shadow-2xl bg-white border border-gray-200">
              <div className="p-6">
                {/* Window chrome - dots */}
                <div className="flex gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-gray-200" />
                  <div className="w-3 h-3 rounded-full bg-gray-200" />
                  <div className="w-3 h-3 rounded-full bg-gray-200" />
                </div>

                {/* Component preview grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Button */}
                  <PreviewCard label="Button">
                    <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg">
                      Click me
                    </button>
                  </PreviewCard>

                  {/* Card */}
                  <PreviewCard label="Card">
                    <div className="w-full p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="h-2 w-14 bg-gray-200 rounded mb-2" />
                      <div className="h-2 w-10 bg-gray-100 rounded" />
                    </div>
                  </PreviewCard>

                  {/* Switch */}
                  <PreviewCard label="Switch">
                    <div className="w-11 h-6 bg-gray-900 rounded-full relative">
                      <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow" />
                    </div>
                  </PreviewCard>

                  {/* Input */}
                  <PreviewCard label="Input">
                    <div className="w-full px-3 py-2 bg-white rounded-lg border border-gray-200 text-sm text-gray-400">
                      Placeholder...
                    </div>
                  </PreviewCard>

                  {/* Badge */}
                  <PreviewCard label="Badge">
                    <span className="px-2.5 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                      New
                    </span>
                  </PreviewCard>

                  {/* Checkbox */}
                  <PreviewCard label="Checkbox">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-900 rounded flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-600">Checked</span>
                    </div>
                  </PreviewCard>

                  {/* Avatar */}
                  <PreviewCard label="Avatar">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                      RS
                    </div>
                  </PreviewCard>

                  {/* Progress */}
                  <PreviewCard label="Progress">
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="w-2/3 h-full bg-gray-900 rounded-full" />
                    </div>
                  </PreviewCard>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Features Grid */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
            <FeatureItem
              icon={<SmartphoneIcon className="w-6 h-6" />}
              title="Cross-platform"
              description="Build for iOS, Android, and Web with a single codebase."
            />
            <FeatureItem
              icon={<MonitorIcon className="w-6 h-6" />}
              title="Works everywhere"
              description="Use with Expo, React Native CLI, or Next.js."
            />
            <FeatureItem
              icon={<ClockIcon className="w-6 h-6" />}
              title="Ship faster"
              description="Copy, paste, and customize. No complex setup required."
            />
            <FeatureItem
              icon={<PaletteIcon className="w-6 h-6" />}
              title="4 themes included"
              description="Dark, Light, Oatmeal, and Glass. Switch instantly."
            />
            <FeatureItem
              icon={<AccessibilityIcon className="w-6 h-6" />}
              title="Fully accessible"
              description="WCAG compliant. Screen reader and keyboard support."
            />
            <FeatureItem
              icon={<TerminalIcon className="w-6 h-6" />}
              title="CLI included"
              description="Add components with a single command."
            />
          </div>
        </div>
      </section>

      {/* SECTION 4: Two Feature Cards */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              {/* Icons row */}
              <div className="flex justify-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center">
                  <div className="w-5 h-5 bg-gray-200 rounded" />
                </div>
                <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center">
                  <div className="w-5 h-5 bg-gray-300 rounded-full" />
                </div>
                <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center">
                  <div className="w-5 h-3 bg-gray-200 rounded-full" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">73+ Components</h3>
              <p className="text-sm text-gray-500">
                From buttons to complex data tables. Everything you need to build.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              {/* Icons row */}
              <div className="flex justify-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-lg bg-white/80 backdrop-blur shadow-sm border border-white/50 flex items-center justify-center">
                  <div className="w-5 h-5 bg-gray-200/50 rounded" />
                </div>
                <div className="w-10 h-10 rounded-lg bg-white/80 backdrop-blur shadow-sm border border-white/50 flex items-center justify-center">
                  <div className="w-5 h-5 bg-gray-300/50 rounded-full" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Glass theme built-in</h3>
              <p className="text-sm text-gray-500">
                Beautiful frosted glass effects. No other React Native library has this.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Install / CTA */}
      <section className="py-24 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Start building today</h2>
          <p className="text-gray-500 mb-8">
            Install with a single command and start building.
          </p>

          {/* Install command */}
          <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-between mb-8">
            <code className="text-sm font-mono text-gray-800">
              npm install @hyena-studio/react-native
            </code>
            <button
              onClick={handleCopy}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
              aria-label={copied ? 'Copied' : 'Copy command'}
            >
              {copied ? (
                <CheckIcon className="w-4 h-4 text-green-500" />
              ) : (
                <CopyIcon className="w-4 h-4" />
              )}
            </button>
          </div>

          <Link
            href="/docs/installation"
            className="inline-flex items-center px-8 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors"
          >
            Read the docs
          </Link>
        </div>
      </section>

      {/* SECTION 6: Footer */}
      <footer className="py-12 px-6 border-t border-gray-100 bg-gray-50/30">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="font-pixelify text-lg text-gray-900">hyena</div>

            {/* Links */}
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="/docs" className="hover:text-gray-900 transition-colors">
                Docs
              </Link>
              <Link href="/docs/components" className="hover:text-gray-900 transition-colors">
                Components
              </Link>
              <a
                href="https://github.com/ruidssimoes-rdss/hyena"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 transition-colors"
              >
                GitHub
              </a>
            </div>

            {/* Credit */}
            <p className="text-sm text-gray-400">
              Built by Rui Simoes
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
