'use client';

import { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from 'react';

/**
 * OTPInput Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * Replicates the React Native OTPInput behavior for the docs.
 */

const slotBaseStyles = `
  w-12 h-14 text-center text-2xl font-semibold rounded-lg border-2
  bg-white text-gray-900
  transition-all duration-200
  focus:outline-none focus:border-gray-900 focus:ring-0
`;

interface OTPInputWebProps {
  length?: number;
  disabled?: boolean;
  error?: boolean;
  masked?: boolean;
  defaultValue?: string;
  onComplete?: (code: string) => void;
}

function OTPInputWeb({
  length = 6,
  disabled = false,
  error = false,
  masked = false,
  defaultValue = '',
  onComplete,
}: OTPInputWebProps) {
  const [values, setValues] = useState<string[]>(() => {
    const initial = defaultValue.split('').slice(0, length);
    while (initial.length < length) initial.push('');
    return initial;
  });
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const focusInput = (index: number) => {
    if (index >= 0 && index < length) {
      inputRefs.current[index]?.focus();
    }
  };

  const handleChange = (index: number, value: string) => {
    if (disabled) return;

    // Handle paste (multiple characters)
    if (value.length > 1) {
      const chars = value.replace(/\D/g, '').slice(0, length).split('');
      const newValues = [...values];
      chars.forEach((char, i) => {
        if (index + i < length) {
          newValues[index + i] = char;
        }
      });
      setValues(newValues);
      const nextIndex = Math.min(index + chars.length, length - 1);
      focusInput(nextIndex);

      const code = newValues.join('');
      if (code.length === length && !newValues.includes('')) {
        onComplete?.(code);
      }
      return;
    }

    // Handle single character - only digits
    const digit = value.replace(/\D/g, '');
    if (value && !digit) return;

    const newValues = [...values];
    newValues[index] = digit;
    setValues(newValues);

    if (digit && index < length - 1) {
      focusInput(index + 1);
    }

    const code = newValues.join('');
    if (code.length === length && !newValues.includes('')) {
      onComplete?.(code);
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === 'Backspace') {
      if (values[index] === '' && index > 0) {
        const newValues = [...values];
        newValues[index - 1] = '';
        setValues(newValues);
        focusInput(index - 1);
      } else {
        const newValues = [...values];
        newValues[index] = '';
        setValues(newValues);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      focusInput(index - 1);
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
    if (pastedData) {
      handleChange(index, pastedData);
    }
  };

  const getBorderClass = (index: number) => {
    if (error) return 'border-red-500';
    if (focusedIndex === index) return 'border-gray-900';
    if (values[index]) return 'border-gray-400';
    return 'border-gray-200';
  };

  return (
    <div className="flex items-center gap-2">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={length}
          value={masked && values[index] ? '•' : values[index]}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={(e) => handlePaste(e, index)}
          onFocus={() => setFocusedIndex(index)}
          onBlur={() => setFocusedIndex(-1)}
          disabled={disabled}
          className={`
            ${slotBaseStyles}
            ${getBorderClass(index)}
            ${disabled ? 'bg-gray-100 opacity-50 cursor-not-allowed' : ''}
          `}
          aria-label={`Digit ${index + 1} of ${length}`}
        />
      ))}
    </div>
  );
}

// Preview Components

export function OTPInputBasicPreview() {
  const [code, setCode] = useState('');

  return (
    <div className="flex flex-col items-center gap-4">
      <OTPInputWeb
        length={6}
        onComplete={(c) => setCode(c)}
      />
      <p className="text-sm text-gray-500">
        {code ? `Entered: ${code}` : 'Enter verification code'}
      </p>
    </div>
  );
}

export function OTPInputWithSeparatorPreview() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <input
            key={i}
            type="text"
            inputMode="numeric"
            maxLength={1}
            defaultValue={String(i + 1)}
            className={`${slotBaseStyles} border-gray-400`}
            readOnly
          />
        ))}
      </div>
      <span className="text-2xl text-gray-400 mx-1">-</span>
      <div className="flex gap-2">
        {[3, 4, 5].map((i) => (
          <input
            key={i}
            type="text"
            inputMode="numeric"
            maxLength={1}
            defaultValue={String(i + 1)}
            className={`${slotBaseStyles} border-gray-400`}
            readOnly
          />
        ))}
      </div>
    </div>
  );
}

export function OTPInputFourDigitsPreview() {
  return <OTPInputWeb length={4} />;
}

export function OTPInputMaskedPreview() {
  return (
    <div className="flex flex-col items-center gap-2">
      <OTPInputWeb length={6} masked defaultValue="420690" />
      <p className="text-xs text-gray-400">Masked input</p>
    </div>
  );
}

export function OTPInputErrorPreview() {
  return (
    <div className="flex flex-col items-center gap-2">
      <OTPInputWeb length={6} error defaultValue="123456" />
      <p className="text-xs text-red-500">Invalid code. Please try again.</p>
    </div>
  );
}

export function OTPInputDisabledPreview() {
  return <OTPInputWeb length={6} disabled defaultValue="123456" />;
}

export function OTPInputPrefilledPreview() {
  return (
    <div className="flex flex-col items-center gap-2">
      <OTPInputWeb length={6} defaultValue="420690" />
      <p className="text-xs text-gray-400">Auto-filled from SMS</p>
    </div>
  );
}
