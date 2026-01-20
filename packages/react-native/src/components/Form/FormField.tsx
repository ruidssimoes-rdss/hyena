import React, { useState, useCallback, useEffect, useMemo, useId } from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { FormFieldContext, useForm } from './FormContext';

// ============================================================================
// Types
// ============================================================================

export interface FormFieldProps {
  /** Unique field name */
  name: string;
  /** Field content (label, control, message) */
  children: React.ReactNode;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** @deprecated Use required instead */
  isRequired?: boolean;
  /** @deprecated Use disabled instead */
  isDisabled?: boolean;
  /** Error message to display */
  error?: string;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Component
// ============================================================================

export function FormField({
  name,
  children,
  required,
  disabled,
  isRequired,
  isDisabled,
  error,
  style,
}: FormFieldProps) {
  const form = useForm();
  const generatedId = useId();
  const id = `field-${name}-${generatedId}`;

  // Deprecation warnings
  if (__DEV__) {
    if (isDisabled !== undefined) {
      console.warn('FormField: isDisabled is deprecated. Use disabled instead.');
    }
    if (isRequired !== undefined) {
      console.warn('FormField: isRequired is deprecated. Use required instead.');
    }
  }

  // Support both new and deprecated props
  const resolvedRequired = required ?? isRequired ?? false;
  const resolvedDisabled = disabled ?? isDisabled ?? false;

  const [internalError, setInternalError] = useState<string | undefined>(error);

  // Sync external error prop
  useEffect(() => {
    setInternalError(error);
  }, [error]);

  // Form-level disabled overrides field-level
  const fieldDisabled = form?.disabled || resolvedDisabled;
  const hasError = !!internalError;

  // Register with form context if available
  useEffect(() => {
    if (form) {
      form.registerField(name, {
        id,
        hasError,
        errorMessage: internalError,
        isRequired: resolvedRequired,
        isDisabled: fieldDisabled,
      });
      return () => form.unregisterField(name);
    }
  }, [form, name, id, hasError, internalError, resolvedRequired, fieldDisabled]);

  const setError = useCallback((message?: string) => {
    setInternalError(message);
    if (form) {
      form.setFieldError(name, message);
    }
  }, [form, name]);

  const contextValue = useMemo(() => ({
    name,
    id,
    hasError,
    errorMessage: internalError,
    // Provide both new and deprecated props for backward compatibility
    required: resolvedRequired,
    disabled: fieldDisabled,
    isRequired: resolvedRequired,
    isDisabled: fieldDisabled,
    setError,
  }), [name, id, hasError, internalError, resolvedRequired, fieldDisabled, setError]);

  return (
    <FormFieldContext.Provider value={contextValue}>
      <View style={[styles.field, style]}>
        {children}
      </View>
    </FormFieldContext.Provider>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  field: {
    width: '100%',
  },
});
