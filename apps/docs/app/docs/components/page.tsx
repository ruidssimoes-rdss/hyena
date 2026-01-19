'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { navigation } from '../../../lib/navigation';

// ========================================
// Icons
// ========================================

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

// ========================================
// Types
// ========================================

interface ComponentItem {
  name: string;
  href: string;
  description?: string;
}

interface ComponentCategory {
  title: string;
  items: ComponentItem[];
}

// ========================================
// Component Card
// ========================================

function ComponentCard({ name, href, description }: ComponentItem) {
  return (
    <Link
      href={href}
      className="group block px-4 py-3 rounded-lg border border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm transition-all"
    >
      <div className="font-medium text-gray-900 group-hover:text-gray-700">
        {name}
      </div>
      {description && (
        <div className="mt-0.5 text-sm text-gray-500 line-clamp-1">
          {description}
        </div>
      )}
    </Link>
  );
}

// ========================================
// Category Section
// ========================================

function CategorySection({ title, items }: ComponentCategory) {
  if (items.length === 0) return null;

  return (
    <div className="mb-10">
      <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-4">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((item) => (
          <ComponentCard key={item.href} {...item} />
        ))}
      </div>
    </div>
  );
}

// ========================================
// Main Component
// ========================================

export default function ComponentsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Get only component categories (exclude Guides)
  const componentCategories = useMemo(() => {
    return navigation.filter((section) => section.title !== 'Guides');
  }, []);

  // Filter components based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return componentCategories;
    }

    const query = searchQuery.toLowerCase();
    return componentCategories
      .map((category) => ({
        ...category,
        items: category.items.filter(
          (item) =>
            item.name.toLowerCase().includes(query) ||
            item.description?.toLowerCase().includes(query)
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [componentCategories, searchQuery]);

  // Count total components
  const totalComponents = useMemo(() => {
    return componentCategories.reduce(
      (acc, category) => acc + category.items.length,
      0
    );
  }, [componentCategories]);

  return (
    <div className="min-h-[calc(100vh-3.5rem)] px-6 lg:px-48 py-12">
      {/* Hero Section */}
      <div className="max-w-2xl mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Components</h1>
        <p className="text-lg text-gray-600">
          {totalComponents} production-ready components for React Native. Copy,
          paste, and customize.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md mb-10">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search components..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-300 focus:ring-2 focus:ring-gray-100 transition-all"
        />
      </div>

      {/* Categories */}
      {filteredCategories.length > 0 ? (
        filteredCategories.map((category) => (
          <CategorySection
            key={category.title}
            title={category.title}
            items={category.items}
          />
        ))
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No components found matching "{searchQuery}"
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-2 text-sm text-gray-600 hover:text-gray-900 underline"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
