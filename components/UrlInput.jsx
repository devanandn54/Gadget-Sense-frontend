/**
 * URL Input Component
 * Enhanced input with automatic protocol handling and validation
 */

'use client';

import React from 'react';
import { X, AlertCircle, CheckCircle } from 'lucide-react';
import { isValidUrl, getValidationError, normalizeUrl } from '@/lib/validators';

export default function UrlInput({ 
  value, 
  onChange, 
  onClear,
  disabled = false,
  showValidation = true 
}) {
  const [touched, setTouched] = React.useState(false);
  const [displayValue, setDisplayValue] = React.useState(value);

  // Sync with parent value
  React.useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setDisplayValue(newValue);
    onChange(newValue);
    
    if (!touched && newValue.length > 0) {
      setTouched(true);
    }
  };

  const handleBlur = () => {
    // Auto-add https:// on blur if missing
    if (displayValue && !displayValue.startsWith('http://') && !displayValue.startsWith('https://')) {
      const normalized = normalizeUrl(displayValue);
      setDisplayValue(normalized);
      onChange(normalized);
    }
  };

  const handleClear = () => {
    setDisplayValue('');
    setTouched(false);
    onClear();
  };

  // Validation state
  const trimmedValue = displayValue?.trim() || '';
  const isValid = trimmedValue.length > 0 && isValidUrl(trimmedValue);
  const validationError = touched && trimmedValue.length > 0 ? getValidationError(trimmedValue) : '';
  const showError = showValidation && validationError && touched;
  const showSuccess = showValidation && isValid && touched;

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && isValid) {
              e.preventDefault();
              // Trigger form submission or analysis
            }
          }}
          placeholder="amazon.com/product or https://www.flipkart.com/product"
          className={`w-full px-4 sm:px-6 py-4 sm:py-5 bg-white/5 border ${
            showError ? 'border-red-500/50' : 
            showSuccess ? 'border-green-500/50' : 
            'border-gray-800'
          } rounded-xl sm:rounded-2xl text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all pr-24`}
          disabled={disabled}
          aria-label="Product URL"
          aria-invalid={showError}
          aria-describedby={showError ? 'url-error' : undefined}
        />
        
        {/* Status Icons */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {showSuccess && (
            <CheckCircle 
              className="w-5 h-5 text-green-500" 
              aria-label="Valid URL"
            />
          )}
          
          {showError && (
            <AlertCircle 
              className="w-5 h-5 text-red-500" 
              aria-label="Invalid URL"
            />
          )}
          
          {displayValue && !disabled && (
            <button
              onClick={handleClear}
              className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all"
              title="Clear URL"
              aria-label="Clear URL"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Validation Message */}
      {showError && (
        <div 
          id="url-error"
          className="mt-2 text-sm text-red-400 flex items-start gap-2"
          role="alert"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Helper Text */}
      {!touched && !displayValue && (
        <div className="mt-2 text-xs text-gray-500">
          Tip: You can paste URLs with or without "https://" - we'll add it automatically
        </div>
      )}
    </div>
  );
}
