'use client';

import { useState, useRef, useCallback } from 'react';

interface ImageUploadProps {
  onAnalyze: (file: File) => Promise<void>;
  isLoading: boolean;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const VALID_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

function LoadingSpinner({ className }: { className?: string }) {
  return (
    <svg className={`animate-spin ${className}`} viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

function UploadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
      />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export function ImageUpload({ onAnalyze, isLoading }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (!VALID_TYPES.includes(file.type)) {
      return 'Please upload a JPEG, PNG, WebP, or GIF image.';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'Image too large. Maximum size is 5MB.';
    }
    return null;
  };

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);

      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Analyze
      try {
        await onAnalyze(file);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to analyze image.');
      }
    },
    [onAnalyze]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const clearPreview = () => {
    setPreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-[#6B7280]">
        Or upload a reference image
      </label>

      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Upload preview"
            className="w-full h-40 object-cover rounded-lg border border-[#E5E7EB]"
          />
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <LoadingSpinner className="w-8 h-8 mx-auto mb-2 text-[#18181B]" />
                <p className="text-sm text-[#6B7280]">Analyzing design...</p>
              </div>
            </div>
          )}
          {!isLoading && (
            <button
              onClick={clearPreview}
              className="absolute top-2 right-2 p-1 bg-white/90 rounded-full hover:bg-white transition-colors border border-[#E5E7EB]"
            >
              <XIcon className="w-4 h-4 text-[#6B7280]" />
            </button>
          )}
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            w-full h-40 border-2 border-dashed rounded-lg
            flex flex-col items-center justify-center gap-2
            cursor-pointer transition-colors
            ${
              isDragging
                ? 'border-[#18181B] bg-[#F9FAFB]'
                : 'border-[#E5E7EB] hover:border-[#D1D5DB] hover:bg-[#F9FAFB]'
            }
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <UploadIcon className="w-8 h-8 text-[#9CA3AF]" />
          <p className="text-sm text-[#6B7280]">
            Drag & drop an image, or click to browse
          </p>
          <p className="text-xs text-[#9CA3AF]">
            Screenshot, Dribbble shot, logo - anything
          </p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleInputChange}
        className="hidden"
        disabled={isLoading}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
