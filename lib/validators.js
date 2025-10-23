/**
 * URL Validation Utilities
 * Secure and robust URL validation for product links
 */

import { SUPPORTED_DOMAINS, INVALID_URL_PATTERNS, INVALID_PATHS } from './constants';

/**
 * Sanitize user input to prevent XSS
 * @param {string} input - User input string
 * @returns {string} Sanitized string
 */
export function sanitizeInput(input) {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 2048); // Limit length to prevent DoS
}

/**
 * Normalize URL by adding protocol if missing
 * @param {string} url - URL to normalize
 * @returns {string} Normalized URL with protocol
 */
export function normalizeUrl(url) {
  if (!url || typeof url !== 'string') return '';
  
  const trimmed = url.trim();
  
  // Already has protocol
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  
  // Add https:// by default
  return `https://${trimmed}`;
}

/**
 * Validate if URL is a valid product URL
 * @param {string} urlString - URL to validate
 * @returns {boolean} True if valid
 */
export function isValidUrl(urlString) {
  if (!urlString || typeof urlString !== 'string') return false;
  
  const sanitized = sanitizeInput(urlString);
  const normalized = normalizeUrl(sanitized);
  
  // Remove common prefixes for basic check
  const cleanUrl = normalized.replace(/^(https?:\/\/)?(www\.)?/, '');
  
  // Basic format validation
  if (cleanUrl.length < 5 || !cleanUrl.includes('.')) {
    return false;
  }

  try {
    // Construct URL object (already has protocol from normalizeUrl)
    const urlObj = new URL(normalized);
    
    // Protocol validation - only allow http/https
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      return false;
    }

    // Hostname validation
    if (!urlObj.hostname || urlObj.hostname.length === 0) {
      return false;
    }

    // Check for valid TLD
    if (!urlObj.hostname.includes('.')) {
      return false;
    }

    // Check against invalid patterns
    for (const { pattern } of INVALID_URL_PATTERNS) {
      if (pattern.test(urlObj.hostname)) {
        return false;
      }
    }

    // Check if domain is supported
    const hostname = urlObj.hostname.toLowerCase();
    const isSupported = SUPPORTED_DOMAINS.some(domain => {
      const domainLower = domain.toLowerCase();
      return hostname === domainLower || 
             hostname === `www.${domainLower}` ||
             hostname.endsWith(`.${domainLower}`);
    });

    if (!isSupported) {
      return false;
    }

    // Path validation - product URLs should have meaningful paths
    if (!urlObj.pathname || urlObj.pathname === '/' || urlObj.pathname === '') {
      return false;
    }

    // Check for invalid paths
    const pathname = urlObj.pathname.toLowerCase();
    for (const { path } of INVALID_PATHS) {
      if (pathname.startsWith(path)) {
        return false;
      }
    }

    // Require minimum path length
    if (pathname.length < 3) {
      return false;
    }

    return true;
    
  } catch (err) {
    return false;
  }
}

/**
 * Get detailed validation error message
 * @param {string} urlString - URL to validate
 * @returns {string} Error message or empty string if valid
 */
export function getValidationError(urlString) {
  if (!urlString || typeof urlString !== 'string') return '';
  
  const sanitized = sanitizeInput(urlString);
  const normalized = normalizeUrl(sanitized);

  if (sanitized.length < 5) {
    return 'URL is too short';
  }

  if (!sanitized.includes('.')) {
    return 'Please enter a valid domain (e.g., amazon.com)';
  }

  try {
    // Construct URL object (already has protocol from normalizeUrl)
    const urlObj = new URL(normalized);

    // Check protocol
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      return 'URL must use http:// or https://';
    }

    // Check hostname validity
    if (!urlObj.hostname || urlObj.hostname.length === 0) {
      return 'Invalid domain name';
    }

    if (!urlObj.hostname.includes('.')) {
      return 'Please enter a valid domain (e.g., amazon.com)';
    }

    // Check for invalid patterns
    for (const { pattern, message } of INVALID_URL_PATTERNS) {
      if (pattern.test(urlObj.hostname)) {
        return message;
      }
    }

    // Check supported marketplaces
    const hostname = urlObj.hostname.toLowerCase();
    const isSupported = SUPPORTED_DOMAINS.some(domain => {
      const domainLower = domain.toLowerCase();
      return hostname === domainLower || 
             hostname === `www.${domainLower}` ||
             hostname.endsWith(`.${domainLower}`);
    });

    if (!isSupported) {
      // Provide specific suggestions
      if (hostname.includes('amazon')) {
        return 'Use amazon.com, amazon.in, or other supported Amazon domains';
      } else if (hostname.includes('flipkart')) {
        return 'Use flipkart.com (Indian e-commerce)';
      } else if (hostname.includes('ebay')) {
        return 'Use ebay.com for eBay products';
      } else {
        return 'Supported: Amazon, Flipkart, Best Buy, Walmart, Target, Newegg, Croma, and more';
      }
    }

    // Check for valid product path
    if (!urlObj.pathname || urlObj.pathname === '/' || urlObj.pathname === '') {
      return 'Please enter a complete product URL, not the homepage';
    }

    // Check for invalid paths
    const pathname = urlObj.pathname.toLowerCase();
    for (const { path, message } of INVALID_PATHS) {
      if (pathname.startsWith(path)) {
        return message;
      }
    }

    if (pathname.length < 3) {
      return 'URL path too short - please use a complete product URL';
    }

    return '';
    
  } catch (err) {
    if (err.message.includes('Invalid URL')) {
      return 'Invalid URL format. Example: https://www.amazon.com/product-name/dp/B123456789';
    }
    return 'Please enter a valid URL (e.g., https://www.amazon.com/product)';
  }
}

/**
 * Validate purpose selection
 * @param {string} purpose - Selected purpose
 * @returns {boolean} True if valid
 */
export function isValidPurpose(purpose) {
  if (!purpose || typeof purpose !== 'string') return false;
  
  const validPurposes = [
    'gaming', 'work-office', 'programming', 'content-creation',
    'student', 'business', 'casual', 'data-science',
    'engineering', 'media-consumption', 'travel', 'budget'
  ];
  
  return validPurposes.includes(purpose);
}
