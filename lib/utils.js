/**
 * Utility Functions
 * Helper functions for UI and data processing
 */

import { VERDICT_CONFIG, TEXT_ICON_REPLACEMENTS } from './constants';

/**
 * Get verdict configuration
 * @param {string} verdict - Verdict type
 * @returns {Object} Verdict configuration
 */
export function getVerdictConfig(verdict) {
  const verdictLower = verdict?.toLowerCase();
  return VERDICT_CONFIG[verdictLower] || VERDICT_CONFIG.neutral;
}

/**
 * Clean icon placeholders from text
 * @param {string} text - Text with icon placeholders
 * @returns {string} Cleaned text
 */
export function cleanIconPlaceholders(text) {
  if (!text || typeof text !== 'string') return '';
  
  let cleanText = text;
  
  for (const [placeholder, replacement] of Object.entries(TEXT_ICON_REPLACEMENTS)) {
    cleanText = cleanText.replace(new RegExp(placeholder, 'g'), replacement);
  }
  
  return cleanText;
}

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount, currency = 'USD') {
  if (typeof amount !== 'number' || isNaN(amount)) return 'N/A';
  
  const symbols = {
    'USD': '$',
    'INR': '₹',
    'GBP': '£',
    'EUR': '€',
    'CAD': 'C$',
    'AUD': 'A$',
    'JPY': '¥',
    'BRL': 'R$'
  };
  
  const symbol = symbols[currency] || currency;
  
  try {
    return `${symbol}${amount.toLocaleString()}`;
  } catch (e) {
    return `${symbol}${amount}`;
  }
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export function truncateText(text, maxLength = 100) {
  if (!text || typeof text !== 'string') return '';
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait = 300) {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Check if code is running in browser
 * @returns {boolean} True if in browser
 */
export function isBrowser() {
  return typeof window !== 'undefined';
}

/**
 * Safe JSON parse
 * @param {string} json - JSON string
 * @param {any} fallback - Fallback value
 * @returns {any} Parsed JSON or fallback
 */
export function safeJSONParse(json, fallback = null) {
  try {
    return JSON.parse(json);
  } catch (e) {
    return fallback;
  }
}

/**
 * Get error message from error object
 * @param {Error|string} error - Error object or message
 * @returns {string} Error message
 */
export function getErrorMessage(error) {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  return 'An unexpected error occurred';
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Sleep for specified duration
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise<void>}
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Clamp number between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Check if object is empty
 * @param {Object} obj - Object to check
 * @returns {boolean} True if empty
 */
export function isEmptyObject(obj) {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}

/**
 * Format URL for display (show user-friendly version)
 * @param {string} url - URL to format
 * @returns {string} Formatted URL
 */
export function formatUrlForDisplay(url) {
  if (!url || typeof url !== 'string') return '';
  
  try {
    const urlObj = new URL(url);
    // Remove protocol for cleaner display
    return url.replace(/^https?:\/\//, '');
  } catch (e) {
    return url;
  }
}

/**
 * Get URL example for marketplace
 * @param {string} marketplace - Marketplace name
 * @returns {string} Example URL
 */
export function getUrlExample(marketplace) {
  const examples = {
    'amazon': 'amazon.com/product-name/dp/B123456789',
    'flipkart': 'flipkart.com/product-name/p/itm123456789',
    'bestbuy': 'bestbuy.com/site/product-name/1234567.p',
    'walmart': 'walmart.com/ip/product-name/123456789',
    'target': 'target.com/p/product-name/-/A-12345678',
  };
  
  return examples[marketplace?.toLowerCase()] || 'amazon.com/product-name/dp/B123456789';
}
