'use client';

import React, { useState } from 'react';

// ============================================================================
// Sample Data
// ============================================================================

const sampleImages = [
  { id: 1, height: 160, color: 'bg-blue-500' },
  { id: 2, height: 200, color: 'bg-green-500' },
  { id: 3, height: 120, color: 'bg-purple-500' },
  { id: 4, height: 180, color: 'bg-amber-500' },
  { id: 5, height: 140, color: 'bg-red-500' },
  { id: 6, height: 220, color: 'bg-teal-500' },
  { id: 7, height: 100, color: 'bg-pink-500' },
  { id: 8, height: 160, color: 'bg-indigo-500' },
  { id: 9, height: 190, color: 'bg-orange-500' },
];

const sampleCards = [
  { id: 1, title: 'Project Alpha', desc: 'A comprehensive design system for modern applications.', height: 140 },
  { id: 2, title: 'Dashboard UI', desc: 'Analytics and reporting dashboard with real-time data visualization.', height: 180 },
  { id: 3, title: 'Mobile App', desc: 'Cross-platform mobile application.', height: 100 },
  { id: 4, title: 'E-commerce', desc: 'Full-featured online store with cart, checkout, and payment processing capabilities.', height: 200 },
  { id: 5, title: 'Blog Platform', desc: 'Content management and blogging platform.', height: 120 },
  { id: 6, title: 'Social Network', desc: 'Community platform with messaging, posts, and user profiles.', height: 160 },
];

// ============================================================================
// Basic 3-Column Masonry Preview
// ============================================================================

export function MasonryBasicPreview() {
  return (
    <div className="w-full p-4">
      <div className="columns-3 gap-4">
        {sampleImages.map((item) => (
          <div
            key={item.id}
            className={`${item.color} rounded-lg mb-4 break-inside-avoid flex items-center justify-center text-white font-semibold`}
            style={{ height: item.height }}
          >
            {item.id}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Responsive Columns Preview
// ============================================================================

export function MasonryResponsivePreview() {
  return (
    <div className="w-full p-4">
      <p className="text-sm text-[var(--text-secondary)] mb-4">
        2 columns on mobile, 3 on tablet, 4 on desktop
      </p>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
        {sampleImages.map((item) => (
          <div
            key={item.id}
            className={`${item.color} rounded-lg mb-4 break-inside-avoid flex items-center justify-center text-white font-semibold`}
            style={{ height: item.height }}
          >
            {item.id}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Image Gallery Preview
// ============================================================================

export function MasonryImageGalleryPreview() {
  return (
    <div className="w-full p-4">
      <div className="columns-3 gap-3">
        {sampleImages.map((item) => (
          <div
            key={item.id}
            className="mb-3 break-inside-avoid rounded-lg overflow-hidden group cursor-pointer relative"
            style={{ height: item.height }}
          >
            <div className={`${item.color} w-full h-full`} />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Card Grid Preview
// ============================================================================

export function MasonryCardGridPreview() {
  return (
    <div className="w-full p-4">
      <div className="columns-2 lg:columns-3 gap-4">
        {sampleCards.map((card) => (
          <div
            key={card.id}
            className="mb-4 break-inside-avoid p-4 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg"
          >
            <div className={`h-16 rounded-md mb-3 bg-gradient-to-br from-blue-500 to-purple-600`} />
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">{card.title}</h3>
            <p className="text-xs text-[var(--text-secondary)]">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Load More Preview
// ============================================================================

export function MasonryLoadMorePreview() {
  const [items, setItems] = useState(sampleImages.slice(0, 6));
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setItems((prev) => [
        ...prev,
        ...sampleImages.slice(0, 3).map((item, idx) => ({
          ...item,
          id: prev.length + idx + 1,
        })),
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full p-4">
      <div className="columns-3 gap-4 mb-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={`${item.color} rounded-lg mb-4 break-inside-avoid flex items-center justify-center text-white font-semibold`}
            style={{ height: item.height }}
          >
            {item.id}
          </div>
        ))}
      </div>
      <div className="text-center">
        <button
          onClick={loadMore}
          disabled={loading}
          className="px-4 py-2 bg-[var(--accent-blue)] text-white rounded-lg text-sm font-medium disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </div>
  );
}
