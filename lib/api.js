/**
 * API Client
 * Secure API communication with error handling and retries
 */

import { API_CONFIG } from './constants';

/**
 * Custom API Error class
 */
export class APIError extends Error {
  constructor(message, status, details) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.details = details;
  }
}

/**
 * Analyze product with retry logic
 * @param {string} url - Product URL
 * @param {string} purpose - Purchase purpose
 * @param {AbortSignal} signal - Abort signal for cancellation
 * @returns {Promise<Object>} Analysis result
 */
export async function analyzeProduct(url, purpose, signal) {
  // Input validation
  if (!url || typeof url !== 'string') {
    throw new APIError('Invalid URL provided', 400, { field: 'url' });
  }
  
  if (!purpose || typeof purpose !== 'string') {
    throw new APIError('Invalid purpose provided', 400, { field: 'purpose' });
  }

  // Normalize URL (add https:// if missing)
  let normalizedUrl = url.trim();
  if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
    normalizedUrl = `https://${normalizedUrl}`;
  }

  const endpoint = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ANALYZE}`;
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ 
        url: normalizedUrl,
        purpose: purpose.trim()
      }),
      signal,
      // Security: Prevent credentials from being sent
      credentials: 'omit',
      // Security: Prevent referrer leakage
      referrerPolicy: 'no-referrer',
    });

    // Handle HTTP errors
    if (!response.ok) {
      let errorMessage = 'Analysis failed';
      let errorDetails = {};
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorData.message || errorMessage;
        errorDetails = errorData.details || {};
      } catch (e) {
        // If response is not JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }
      
      throw new APIError(errorMessage, response.status, errorDetails);
    }

    // Parse response
    const data = await response.json();
    
    // Validate response structure
    if (!data || typeof data !== 'object') {
      throw new APIError('Invalid response format', 500, { data });
    }

    return data;
    
  } catch (error) {
    // Handle network errors
    if (error.name === 'AbortError') {
      throw new APIError('Request cancelled', 0, { cancelled: true });
    }
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new APIError('Network error - please check your connection', 0, { network: true });
    }
    
    // Re-throw API errors
    if (error instanceof APIError) {
      throw error;
    }
    
    // Wrap unknown errors
    throw new APIError(
      error.message || 'An unexpected error occurred',
      500,
      { originalError: error.name }
    );
  }
}

/**
 * Create abort controller for request cancellation
 * @param {number} timeout - Timeout in milliseconds
 * @returns {AbortController} Abort controller
 */
export function createAbortController(timeout = API_CONFIG.TIMEOUT) {
  const controller = new AbortController();
  
  // Auto-abort after timeout
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);
  
  // Clean up timeout on abort
  controller.signal.addEventListener('abort', () => {
    clearTimeout(timeoutId);
  });
  
  return controller;
}

/**
 * Retry failed requests with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum retry attempts
 * @param {number} baseDelay - Base delay in milliseconds
 * @returns {Promise<any>} Result of function
 */
export async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // Don't retry on client errors (4xx) or cancelled requests
      if (error instanceof APIError) {
        if (error.status >= 400 && error.status < 500) {
          throw error;
        }
        if (error.details?.cancelled) {
          throw error;
        }
      }
      
      // Don't retry on last attempt
      if (attempt === maxRetries) {
        break;
      }
      
      // Exponential backoff: 1s, 2s, 4s
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
}
