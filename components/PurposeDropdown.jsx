/**
 * Purpose Dropdown Component
 * Custom dropdown for selecting laptop purchase purpose
 */

'use client';

import React from 'react';
import { ChevronDown, Goal } from 'lucide-react';
import { LAPTOP_PURPOSES } from '@/lib/constants';
import { getPurposeIcon } from '@/lib/iconMapping';

export default function PurposeDropdown({ 
  value, 
  onChange, 
  disabled = false,
  locked = false,
  error = false 
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const selectedPurpose = LAPTOP_PURPOSES.find(p => p.value === value);
  const PurposeIcon = selectedPurpose?.value ? getPurposeIcon(selectedPurpose.value) : Goal;

  const handleSelect = (purposeValue) => {
    onChange(purposeValue);
    setIsOpen(false);
  };

  const handleToggle = () => {
    if (!disabled && !locked) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="relative">
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={handleToggle}
        className={`w-full px-4 sm:px-6 py-4 sm:py-5 bg-white/5 border ${
          error ? 'border-yellow-500/50' : 'border-gray-800'
        } rounded-xl sm:rounded-2xl text-white text-sm sm:text-base focus:outline-none focus:border-white/30 transition-all flex items-center justify-between ${
          (disabled || locked) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-white/20'
        }`}
        disabled={disabled || locked}
        aria-label="Select laptop purpose"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="flex items-center gap-3">
          {/* Purpose Icon */}
          <PurposeIcon className="w-5 h-5 text-gray-400 flex-shrink-0" aria-hidden="true" />
          
          {/* Purpose Label */}
          <span className="text-left">
            {selectedPurpose?.label || 'Select your primary use case...'}
            {locked && <span className="ml-2 text-xs text-gray-500">(locked)</span>}
          </span>
        </div>
        
        {/* Dropdown Arrow */}
        <ChevronDown 
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && !disabled && !locked && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          <div 
            className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-50 max-h-80 overflow-y-auto"
            role="listbox"
            aria-label="Laptop purposes"
          >
            {LAPTOP_PURPOSES.map((option) => {
              const OptionIcon = option.value ? getPurposeIcon(option.value) : null;
              
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`w-full px-4 py-3 text-left hover:bg-white/10 transition-colors flex items-center gap-3 ${
                    value === option.value ? 'bg-white/5 text-white' : 'text-gray-300'
                  } ${option.value === '' ? 'border-b border-gray-700' : ''}`}
                  role="option"
                  aria-selected={value === option.value}
                >
                  {/* Option Icon */}
                  {OptionIcon ? (
                    <OptionIcon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  ) : (
                    <div className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  )}
                  
                  {/* Option Label */}
                  <span className="text-sm">{option.label}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
