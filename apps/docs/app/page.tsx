'use client';

import { useState } from 'react';
import Link from 'next/link';

/**
 * Homepage v7 - Clean Light Mode (async.app inspired)
 *
 * Monochromatic design (black, white, grays only).
 * Product window pattern with macOS-style traffic lights.
 * Opacity-based text hierarchy. Massive whitespace.
 * Centered layouts. Tab switchers for interactive content.
 */

// Icons
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
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

// Product Window Component (macOS-style)
function ProductWindow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white border border-neutral-200 rounded-xl shadow-2xl shadow-black/5 overflow-hidden ${className}`}>
      {/* Window header with traffic lights */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-100">
        <div className="w-3 h-3 rounded-full bg-neutral-300" />
        <div className="w-3 h-3 rounded-full bg-neutral-300" />
        <div className="w-3 h-3 rounded-full bg-neutral-300" />
      </div>
      {/* Window content */}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

// Tab Switcher Component
function TabSwitcher({
  tabs,
  activeTab,
  onTabChange
}: {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}) {
  return (
    <div className="inline-flex bg-neutral-100 rounded-full p-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
            activeTab === tab
              ? 'bg-white shadow-sm text-neutral-900'
              : 'text-neutral-500 hover:text-neutral-700'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default function HomePage() {
  const [copied, setCopied] = useState(false);
  const [featureTab, setFeatureTab] = useState('Universal');
  const [componentTab, setComponentTab] = useState('Inputs');

  const handleCopy = async () => {
    await navigator.clipboard.writeText('npm install @hyena-studio/react-native');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white">
      {/* SECTION 1: Hero */}
      <section className="pt-16 pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 rounded-full text-xs text-neutral-500 mb-8">
            <span>Works with React Native</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl font-semibold text-neutral-900 leading-tight tracking-tight">
            Build once, ship everywhere.
          </h1>

          {/* Subtext */}
          <p className="mt-6 text-lg text-neutral-500 max-w-md mx-auto">
            Universal React Native components for iOS, Android and Web. Copy, paste, ship.
          </p>

          {/* CTA */}
          <div className="mt-10">
            <Link
              href="/docs/installation"
              className="inline-flex items-center px-8 py-3 bg-neutral-900 text-white rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Product Window - Hero Preview */}
          <div className="mt-16 max-w-2xl mx-auto">
            <ProductWindow>
              <div className="space-y-4">
                {/* Button row */}
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-neutral-900 text-white text-sm rounded-lg">
                    Primary
                  </button>
                  <button className="px-4 py-2 border border-neutral-200 text-neutral-900 text-sm rounded-lg">
                    Secondary
                  </button>
                  <button className="px-4 py-2 text-neutral-500 text-sm">
                    Ghost
                  </button>
                </div>

                {/* Card preview */}
                <div className="border border-neutral-200 rounded-lg p-4">
                  <div className="font-medium text-neutral-900 text-sm">Card Component</div>
                  <div className="text-xs text-neutral-500 mt-1">With title and description</div>
                </div>

                {/* Switch row */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-700">Enable notifications</span>
                  <div className="w-11 h-6 bg-neutral-900 rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
              </div>
            </ProductWindow>
          </div>
        </div>
      </section>

      {/* SECTION 2: Social Proof */}
      <section className="py-16 px-6 border-y border-neutral-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs text-neutral-400 uppercase tracking-widest mb-8">
            Trusted by developers from
          </p>
          <div className="flex items-center justify-center gap-12 flex-wrap">
            <span className="text-neutral-300 text-lg font-medium">Vercel</span>
            <span className="text-neutral-300 text-lg font-medium">Linear</span>
            <span className="text-neutral-300 text-lg font-medium">Raycast</span>
            <span className="text-neutral-300 text-lg font-medium">Notion</span>
            <span className="text-neutral-300 text-lg font-medium">Figma</span>
          </div>
        </div>
      </section>

      {/* SECTION 3: Features - Why Hyena */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section header */}
          <p className="text-xs text-neutral-400 uppercase tracking-widest mb-4">
            Why Hyena
          </p>
          <h2 className="text-4xl font-semibold text-neutral-900 mb-4">
            Built for real apps
          </h2>
          <p className="text-neutral-500 mb-12 max-w-md mx-auto">
            Everything you need to build production-ready applications across all platforms.
          </p>

          {/* Tab Switcher */}
          <TabSwitcher
            tabs={['Universal', 'Themeable', 'Accessible']}
            activeTab={featureTab}
            onTabChange={setFeatureTab}
          />

          {/* Tab Content */}
          <div className="mt-12 max-w-2xl mx-auto">
            <ProductWindow>
              {featureTab === 'Universal' && (
                <div className="space-y-4">
                  <div className="flex gap-4 justify-center">
                    {/* iOS Frame */}
                    <div className="text-center">
                      <div className="w-24 h-40 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-center">
                        <div className="w-16 h-8 bg-neutral-900 rounded text-white text-xs flex items-center justify-center">
                          Button
                        </div>
                      </div>
                      <p className="text-xs text-neutral-400 mt-2">iOS</p>
                    </div>
                    {/* Android Frame */}
                    <div className="text-center">
                      <div className="w-24 h-40 bg-neutral-50 rounded-lg border border-neutral-200 flex items-center justify-center">
                        <div className="w-16 h-8 bg-neutral-900 rounded text-white text-xs flex items-center justify-center">
                          Button
                        </div>
                      </div>
                      <p className="text-xs text-neutral-400 mt-2">Android</p>
                    </div>
                    {/* Web Frame */}
                    <div className="text-center">
                      <div className="w-32 h-40 bg-neutral-50 rounded border border-neutral-200 flex items-center justify-center">
                        <div className="w-20 h-8 bg-neutral-900 rounded text-white text-xs flex items-center justify-center">
                          Button
                        </div>
                      </div>
                      <p className="text-xs text-neutral-400 mt-2">Web</p>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-500 text-center pt-4">
                    Same component, native experience on every platform.
                  </p>
                </div>
              )}

              {featureTab === 'Themeable' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Light theme */}
                    <div className="p-4 bg-white border border-neutral-200 rounded-lg">
                      <div className="w-full h-8 bg-neutral-900 rounded text-white text-xs flex items-center justify-center mb-2">
                        Button
                      </div>
                      <p className="text-xs text-neutral-400">Light</p>
                    </div>
                    {/* Dark theme */}
                    <div className="p-4 bg-neutral-900 border border-neutral-700 rounded-lg">
                      <div className="w-full h-8 bg-white rounded text-neutral-900 text-xs flex items-center justify-center mb-2">
                        Button
                      </div>
                      <p className="text-xs text-neutral-400">Dark</p>
                    </div>
                    {/* Oatmeal theme */}
                    <div className="p-4 bg-[#f5f0e8] border border-[#e0d9cb] rounded-lg">
                      <div className="w-full h-8 bg-[#3d3a34] rounded text-white text-xs flex items-center justify-center mb-2">
                        Button
                      </div>
                      <p className="text-xs text-[#9a9488]">Oatmeal</p>
                    </div>
                    {/* Glass theme */}
                    <div className="p-4 bg-gradient-to-br from-neutral-100 to-neutral-200 border border-neutral-300 rounded-lg">
                      <div className="w-full h-8 bg-white/80 backdrop-blur border border-neutral-200 rounded text-neutral-900 text-xs flex items-center justify-center mb-2">
                        Button
                      </div>
                      <p className="text-xs text-neutral-400">Glass</p>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-500 text-center pt-2">
                    4 built-in themes. Switch instantly.
                  </p>
                </div>
              )}

              {featureTab === 'Accessible' && (
                <div className="space-y-4">
                  <div className="border border-neutral-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-neutral-900">Screen Reader</div>
                        <div className="text-xs text-neutral-500">Fully tested with VoiceOver & TalkBack</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-neutral-900">WCAG 2.1 AA</div>
                        <div className="text-xs text-neutral-500">Color contrast & focus indicators</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-neutral-900">Keyboard Navigation</div>
                        <div className="text-xs text-neutral-500">Full keyboard support on web</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </ProductWindow>
          </div>
        </div>
      </section>

      {/* SECTION 4: Component Showcase */}
      <section className="py-32 px-6 bg-neutral-50">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section header */}
          <h2 className="text-4xl font-semibold text-neutral-900 mb-4">
            73+ production-ready components
          </h2>
          <p className="text-neutral-500 mb-12">
            Built for React Native, works on Web.
          </p>

          {/* Tab Switcher */}
          <TabSwitcher
            tabs={['Inputs', 'Feedback', 'Layout', 'Navigation']}
            activeTab={componentTab}
            onTabChange={setComponentTab}
          />

          {/* Tab Content */}
          <div className="mt-12 max-w-2xl mx-auto">
            <ProductWindow>
              {componentTab === 'Inputs' && (
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-neutral-900 text-white text-sm rounded-lg">Button</button>
                    <button className="px-4 py-2 border border-neutral-200 text-sm rounded-lg">Outline</button>
                  </div>
                  <input
                    type="text"
                    placeholder="Text Input"
                    className="w-full px-4 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    readOnly
                  />
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-neutral-900 rounded flex items-center justify-center">
                      <CheckIcon className="w-3 h-3 text-neutral-900" />
                    </div>
                    <span className="text-sm text-neutral-700">Checkbox</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-700">Switch</span>
                    <div className="w-11 h-6 bg-neutral-200 rounded-full relative">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow" />
                    </div>
                  </div>
                </div>
              )}

              {componentTab === 'Feedback' && (
                <div className="space-y-4">
                  {/* Toast */}
                  <div className="flex items-center gap-3 p-3 bg-neutral-100 rounded-lg">
                    <div className="w-5 h-5 bg-neutral-900 rounded-full flex items-center justify-center">
                      <CheckIcon className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-neutral-700">Changes saved successfully</span>
                  </div>
                  {/* Alert */}
                  <div className="p-4 border border-neutral-200 rounded-lg">
                    <div className="font-medium text-sm text-neutral-900">Alert Title</div>
                    <div className="text-xs text-neutral-500 mt-1">This is an alert description.</div>
                  </div>
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-xs text-neutral-500 mb-1">
                      <span>Progress</span>
                      <span>75%</span>
                    </div>
                    <div className="h-2 bg-neutral-200 rounded-full">
                      <div className="h-2 bg-neutral-900 rounded-full w-3/4" />
                    </div>
                  </div>
                  {/* Spinner */}
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-neutral-200 border-t-neutral-900 rounded-full animate-spin" />
                    <span className="text-sm text-neutral-500">Loading...</span>
                  </div>
                </div>
              )}

              {componentTab === 'Layout' && (
                <div className="space-y-4">
                  {/* Card */}
                  <div className="border border-neutral-200 rounded-lg p-4">
                    <div className="font-medium text-sm text-neutral-900">Card</div>
                    <div className="text-xs text-neutral-500 mt-1">A flexible container component</div>
                  </div>
                  {/* Divider */}
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-neutral-200" />
                    <span className="text-xs text-neutral-400">Divider</span>
                    <div className="flex-1 h-px bg-neutral-200" />
                  </div>
                  {/* Stack */}
                  <div className="flex gap-2">
                    <div className="flex-1 h-12 bg-neutral-100 rounded flex items-center justify-center text-xs text-neutral-500">1</div>
                    <div className="flex-1 h-12 bg-neutral-100 rounded flex items-center justify-center text-xs text-neutral-500">2</div>
                    <div className="flex-1 h-12 bg-neutral-100 rounded flex items-center justify-center text-xs text-neutral-500">3</div>
                  </div>
                </div>
              )}

              {componentTab === 'Navigation' && (
                <div className="space-y-4">
                  {/* Tabs */}
                  <div className="flex border-b border-neutral-200">
                    <button className="px-4 py-2 text-sm text-neutral-900 border-b-2 border-neutral-900">Tab 1</button>
                    <button className="px-4 py-2 text-sm text-neutral-400">Tab 2</button>
                    <button className="px-4 py-2 text-sm text-neutral-400">Tab 3</button>
                  </div>
                  {/* Breadcrumb */}
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-neutral-500">Home</span>
                    <span className="text-neutral-300">/</span>
                    <span className="text-neutral-500">Products</span>
                    <span className="text-neutral-300">/</span>
                    <span className="text-neutral-900">Details</span>
                  </div>
                  {/* Link */}
                  <div className="space-y-2">
                    <div className="text-sm text-neutral-900 underline">Text Link</div>
                    <div className="flex items-center gap-2 text-sm text-neutral-700">
                      <span>Link with arrow</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              )}
            </ProductWindow>

            {/* Component list */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {componentTab === 'Inputs' && (
                <>
                  <span className="px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs text-neutral-500">Button</span>
                  <span className="px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs text-neutral-500">Input</span>
                  <span className="px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs text-neutral-500">Checkbox</span>
                  <span className="px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs text-neutral-500">Switch</span>
                  <span className="px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs text-neutral-500">Select</span>
                  <span className="px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs text-neutral-500">Slider</span>
                  <span className="px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs text-neutral-500">+12 more</span>
                </>
              )}
              {componentTab === 'Feedback' && (
                <>
                  <span className="px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs text-neutral-500">Toast</span>
                  <span className="px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs text-neutral-500">Alert</span>
                  <span className="px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs text-neutral-500">Progress</span>
                  <span className="px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs text-neutral-500">Spinner</span>
                  <span className="px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs text-neutral-500">Skeleton</span>
                  <span className="px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs text-neutral-500">+8 more</span>
                </>
              )}
              {componentTab === 'Layout' && (
                <>
                  <span className="px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs text-neutral-500">Card</span>
                  <span className="px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs text-neutral-500">Divider</span>
                  <span className="px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs text-neutral-500">Stack</span>
                  <span className="px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs text-neutral-500">Grid</span>
                  <span className="px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs text-neutral-500">Container</span>
                  <span className="px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs text-neutral-500">+6 more</span>
                </>
              )}
              {componentTab === 'Navigation' && (
                <>
                  <span className="px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs text-neutral-500">Tabs</span>
                  <span className="px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs text-neutral-500">Breadcrumb</span>
                  <span className="px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs text-neutral-500">Link</span>
                  <span className="px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs text-neutral-500">Menu</span>
                  <span className="px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs text-neutral-500">Drawer</span>
                  <span className="px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs text-neutral-500">+7 more</span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: CTA / Install */}
      <section className="py-32 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-neutral-900 mb-8">
            Start building today.
          </h2>

          {/* Code block */}
          <div className="bg-neutral-100 rounded-lg px-4 py-3 inline-flex items-center gap-4">
            <code className="text-sm font-mono text-neutral-700">
              npm install @hyena-studio/react-native
            </code>
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-neutral-200 rounded transition-colors"
              aria-label={copied ? 'Copied' : 'Copy command'}
            >
              {copied ? (
                <CheckIcon className="w-4 h-4 text-neutral-900" />
              ) : (
                <CopyIcon className="w-4 h-4 text-neutral-400" />
              )}
            </button>
          </div>

          <div className="mt-8">
            <Link
              href="/docs/installation"
              className="inline-flex items-center px-8 py-3 bg-neutral-900 text-white rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors"
            >
              Read the docs
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6: Footer */}
      <footer className="py-16 px-6 border-t border-neutral-200">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-lg font-medium text-neutral-900">hyena</div>

          <div className="flex items-center gap-8 text-sm text-neutral-500">
            <Link href="/docs" className="hover:text-neutral-900 transition-colors">
              Docs
            </Link>
            <Link href="/docs/components" className="hover:text-neutral-900 transition-colors">
              Components
            </Link>
            <a
              href="https://github.com/ruidssimoes-rdss/hyena"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-900 transition-colors"
            >
              GitHub
            </a>
          </div>

          <p className="text-sm text-neutral-500">
            Built by{' '}
            <a
              href="https://github.com/ruidssimoes-rdss"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-900 transition-colors"
            >
              Rui Simões
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
