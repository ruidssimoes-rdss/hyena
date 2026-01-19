'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Breadcrumbs } from './Breadcrumbs';
import { TableOfContents } from './TableOfContents';

interface DocsLayoutProps {
  children: React.ReactNode;
}

/**
 * DocsLayout Component
 *
 * Minimal, clean layout with white canvas.
 * Component pages use the new playground layout (full-width, no sidebar).
 * Guide pages use the traditional three-column layout.
 */
export function DocsLayout({ children }: DocsLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHomepage = pathname === '/';
  const isComponentPage = pathname.startsWith('/docs/components/');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Homepage gets simple full-screen layout
  if (isHomepage) {
    return (
      <div className="min-h-screen bg-white">
        <Header onMobileMenuToggle={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />
        <main className="w-full">
          {children}
        </main>
      </div>
    );
  }

  // Component pages use playground layout (full-width, no sidebars)
  if (isComponentPage) {
    return (
      <div className="min-h-screen bg-white">
        <Header onMobileMenuToggle={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />
        <main className="w-full">
          {children}
        </main>
        {/* Mobile sidebar overlay */}
        <Sidebar isMobileMenuOpen={isMobileMenuOpen} onCloseMobileMenu={closeMobileMenu} />
      </div>
    );
  }

  // Guide pages - traditional three-column layout
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header onMobileMenuToggle={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />

      {/* Three-column layout */}
      <div className="w-full px-6 lg:px-48">
        <div className="flex pt-6 pb-8 gap-12">
          {/* Left Sidebar */}
          <Sidebar isMobileMenuOpen={isMobileMenuOpen} onCloseMobileMenu={closeMobileMenu} />

          {/* Main content */}
          <main className="flex-1 min-w-0 py-6">
            {/* Breadcrumbs - only for non-introduction pages */}
            {pathname !== '/docs' && <Breadcrumbs />}
            {children}
          </main>

          {/* Right Table of Contents */}
          <TableOfContents />
        </div>
      </div>
    </div>
  );
}
