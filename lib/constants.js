/**
 * Application Constants
 * Centralized configuration and constant values
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  ENDPOINTS: {
    ANALYZE: '/api/analyze',
  },
  TIMEOUT: 60000, // 60 seconds
};

// Laptop Purpose Options
export const LAPTOP_PURPOSES = [
  { value: '', label: 'Select your primary use case...', icon: null },
  { value: 'gaming', label: 'Gaming & Entertainment', description: 'High-end gaming, streaming, VR' },
  { value: 'work-office', label: 'Office Work & Productivity', description: 'Documents, spreadsheets, presentations, video calls' },
  { value: 'programming', label: 'Programming & Development', description: 'Coding, software development, web development' },
  { value: 'content-creation', label: 'Content Creation', description: 'Video editing, photo editing, graphic design' },
  { value: 'student', label: 'Student Use', description: 'Research, assignments, online classes, note-taking' },
  { value: 'business', label: 'Business & Professional', description: 'Meetings, presentations, business applications' },
  { value: 'casual', label: 'Casual Use', description: 'Web browsing, social media, streaming videos' },
  { value: 'data-science', label: 'Data Science & Analytics', description: 'Machine learning, data analysis, statistical computing' },
  { value: 'engineering', label: 'Engineering & CAD', description: 'CAD software, 3D modeling, engineering simulations' },
  { value: 'media-consumption', label: 'Media & Entertainment', description: 'Movies, music, reading, light gaming' },
  { value: 'travel', label: 'Travel & Portability', description: 'Lightweight, long battery life, mobile work' },
  { value: 'budget', label: 'Budget-Conscious', description: 'Best value for money, basic computing needs' }
];

// Supported Domains for URL Validation
export const SUPPORTED_DOMAINS = [
  // US E-commerce
  'amazon.com', 'bestbuy.com', 'walmart.com', 'target.com', 'newegg.com',
  'ebay.com', 'bhphotovideo.com', 'costco.com', 'microcenter.com',
  
  // Indian E-commerce
  'amazon.in', 'flipkart.com', 'myntra.com', 'croma.com', 
  'reliancedigital.in', 'vijaysales.com', 'tatacliq.com',
  'snapdeal.com', 'paytmmall.com', 'shopclues.com',
  
  // Global Amazon domains
  'amazon.co.uk', 'amazon.de', 'amazon.fr', 'amazon.ca', 'amazon.com.au',
  'amazon.it', 'amazon.es', 'amazon.co.jp', 'amazon.com.br',
  
  // Manufacturer sites
  'hp.com', 'dell.com', 'apple.com', 'lenovo.com', 'asus.com',
  'acer.com', 'msi.com', 'razer.com', 'microsoft.com', 'samsung.com',
  
  // Additional retailers
  'adorama.com', 'frys.com', 'tigerdirect.com', 'overstock.com'
];

// Invalid URL Patterns
export const INVALID_URL_PATTERNS = [
  { pattern: /^localhost$/i, message: 'Localhost URLs not supported' },
  { pattern: /^127\.0\.0\.1$/, message: 'IP addresses not supported' },
  { pattern: /^\d+\.\d+\.\d+\.\d+$/, message: 'IP addresses not supported' },
  { pattern: /\.(test|local|dev)$/i, message: 'Development domains not supported' },
  { pattern: /^[^.]+$/, message: 'Invalid domain format' }
];

// Invalid URL Paths
export const INVALID_PATHS = [
  { path: '/search', message: 'Please use a direct product URL, not search results' },
  { path: '/category', message: 'Please use a direct product URL, not category page' },
  { path: '/cart', message: 'Please use a product URL, not cart page' },
  { path: '/account', message: 'Please use a product URL, not account page' }
];

// Verdict Configuration
export const VERDICT_CONFIG = {
  consider: { 
    icon: 'CheckCircle', 
    color: 'text-green-500', 
    bg: 'bg-green-500/10', 
    label: 'WORTH CONSIDERING' 
  },
  skip: { 
    icon: 'XCircle', 
    color: 'text-red-500', 
    bg: 'bg-red-500/10', 
    label: 'SKIP THIS' 
  },
  caution: { 
    icon: 'AlertCircle', 
    color: 'text-yellow-500', 
    bg: 'bg-yellow-500/10', 
    label: 'PROCEED WITH CAUTION' 
  },
  neutral: { 
    icon: 'Minus', 
    color: 'text-gray-500', 
    bg: 'bg-gray-500/10', 
    label: 'NEUTRAL' 
  }
};

// Icon Mapping for Analysis Sections
export const ICON_MAPPING = {
  '[TARGET]': { component: 'Goal', color: 'from-green-500/20 to-emerald-500/20 border-green-500/30' },
  '[LIGHTBULB]': { component: 'Lightbulb', color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30' },
  '[CHECK]': { component: 'CircleCheckBig', color: 'from-green-500/20 to-teal-500/20 border-green-500/30' },
  '[ALERT]': { component: 'MessageCircleWarning', color: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30' },
  '[MESSAGE]': { component: 'MessageSquare', color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30' },
  '[CHART]': { component: 'ChartColumnStacked', color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30' },
  '[USER]': { component: 'User', color: 'from-indigo-500/20 to-blue-500/20 border-indigo-500/30' },
  '[DOLLAR]': { component: 'CircleDollarSign', color: 'from-amber-500/20 to-yellow-500/20 border-amber-500/30' },
  '[X]': { component: 'XCircle', color: 'from-red-500/20 to-red-600/20 border-red-500/30' },
  '[QUESTION]': { component: 'HelpCircle', color: 'from-gray-500/20 to-gray-600/20 border-gray-500/30' },
  '[TROPHY]': { component: 'Trophy', color: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30' }
};

// Text Replacements for Icon Placeholders
export const TEXT_ICON_REPLACEMENTS = {
  '[CHECK]': '✓',
  '[X]': '✗',
  '[ALERT]': '⚠',
  '[TARGET]': '→',
  '[LIGHTBULB]': '💡',
  '[MESSAGE]': '💬',
  '[CHART]': '📊',
  '[USER]': '👤',
  '[DOLLAR]': '$',
  '[QUESTION]': '?',
  '[TROPHY]': '🏆'
};
