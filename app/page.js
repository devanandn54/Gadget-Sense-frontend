'use client'
import React, { useState } from 'react';
import { Search, AlertCircle, CheckCircle, XCircle, Loader2, Cpu, HardDrive, MemoryStick, Monitor, TrendingUp, TrendingDown, Minus, X, Plus, Sparkles, MessageSquare, Goal, CircleCheckBig, MessageCircleWarning, ChartColumnStacked, UserRoundCheck, CircleDollarSign, Lightbulb, Gamepad2, Briefcase, Code, Palette, GraduationCap, Building2, Globe, BarChart3, Settings, Play, Plane, Wallet, ChevronDown, Trophy, HelpCircle, User } from 'lucide-react';

const GadgetSense = () => {
  const [url, setUrl] = useState('');
  const [purpose, setPurpose] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [lastAnalyzedUrl, setLastAnalyzedUrl] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const laptopPurposes = [
    { value: '', label: 'Select your primary use case...', icon: null },
    { value: 'gaming', label: 'Gaming & Entertainment', icon: Gamepad2, description: 'High-end gaming, streaming, VR' },
    { value: 'work-office', label: 'Office Work & Productivity', icon: Briefcase, description: 'Documents, spreadsheets, presentations, video calls' },
    { value: 'programming', label: 'Programming & Development', icon: Code, description: 'Coding, software development, web development' },
    { value: 'content-creation', label: 'Content Creation', icon: Palette, description: 'Video editing, photo editing, graphic design' },
    { value: 'student', label: 'Student Use', icon: GraduationCap, description: 'Research, assignments, online classes, note-taking' },
    { value: 'business', label: 'Business & Professional', icon: Building2, description: 'Meetings, presentations, business applications' },
    { value: 'casual', label: 'Casual Use', icon: Globe, description: 'Web browsing, social media, streaming videos' },
    { value: 'data-science', label: 'Data Science & Analytics', icon: BarChart3, description: 'Machine learning, data analysis, statistical computing' },
    { value: 'engineering', label: 'Engineering & CAD', icon: Settings, description: 'CAD software, 3D modeling, engineering simulations' },
    { value: 'media-consumption', label: 'Media & Entertainment', icon: Play, description: 'Movies, music, reading, light gaming' },
    { value: 'travel', label: 'Travel & Portability', icon: Plane, description: 'Lightweight, long battery life, mobile work' },
    { value: 'budget', label: 'Budget-Conscious', icon: Wallet, description: 'Best value for money, basic computing needs' }
  ];

  const isSameUrl = url.trim() === lastAnalyzedUrl;

  const clearUrl = () => {
    setUrl('');
    setError('');
  };

  const resetAnalysis = () => {
    setResult(null);
    setUrl('');
    setPurpose('');
    setError('');
    setLastAnalyzedUrl('');
    setDropdownOpen(false);
  };

  const handleUrlChange = (e) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    if (dropdownOpen) setDropdownOpen(false);
    if (error) setError('');
  };

  const analyzeProduct = async () => {
    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
      setError('Please enter a product URL');
      return;
    }

    if (!purpose) {
      setError('Please select your primary use case for this laptop');
      return;
    }

    if (trimmedUrl === lastAnalyzedUrl) {
      setError('This URL has already been analyzed. Enter a different URL or click "Analyze New Product" to start fresh.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);
    setDropdownOpen(false);

    try {
      const response = await fetch('https://gadget-sense-backend-production.up.railway.app/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          url: trimmedUrl,
          purpose: purpose
        })
      }); 
      
      const data = await response.json();
      
      // Check if it's an unsupported retailer (Walmart/Target)
      if (response.status === 422 && data.error === 'Unsupported retailer') {
        setError({
          type: 'unsupported',
          retailer: data.retailer,
          message: data.message,
          supportedRetailers: data.supportedRetailers
        });
        setLoading(false);
        return;
      }
      
      if (!response.ok) {
        throw new Error(data.details || data.error || 'Analysis failed');
      }
      
      setResult(data);
      setLastAnalyzedUrl(trimmedUrl);
    } catch (err) {
      if (typeof err === 'object' && err.type === 'unsupported') {
        setError(err);
      } else {
        setError({ type: 'error', message: err.message || 'Failed to analyze product. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const getVerdictConfig = (verdict) => {
    switch (verdict?.toLowerCase()) {
      case 'consider':
        return { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10', label: 'WORTH CONSIDERING' };
      case 'skip':
        return { icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10', label: 'SKIP THIS' };
      case 'caution':
        return { icon: AlertCircle, color: 'text-yellow-500', bg: 'bg-yellow-500/10', label: 'PROCEED WITH CAUTION' };
      default:
        return { icon: Minus, color: 'text-gray-500', bg: 'bg-gray-500/10', label: 'NEUTRAL' };
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 p-0.5 relative overflow-hidden">
                <svg viewBox="0 0 512 512" className="w-full h-full">
                  <rect width="512" height="512" fill="#ffffff"/>
                  <g transform="translate(256, 280) scale(1.4)">
                    <g opacity="0.35">
                      <rect x="-120" y="-90" width="240" height="160" rx="12" fill="none" stroke="#000000" strokeWidth="14"/>
                      <rect x="-135" y="70" width="270" height="14" rx="7" fill="#000000"/>
                    </g>
                    <g opacity="0.55">
                      <rect x="-80" y="-70" width="160" height="220" rx="16" fill="none" stroke="#000000" strokeWidth="14"/>
                      <circle cx="0" cy="130" r="14" fill="#000000"/>
                    </g>
                    <g>
                      <rect x="-50" y="-40" width="100" height="170" rx="14" fill="#000000"/>
                      <rect x="-42" y="-28" width="84" height="140" rx="6" fill="#ffffff"/>
                      <circle cx="0" cy="120" r="10" fill="#000000"/>
                    </g>
                    <g transform="translate(95, -70)">
                      <circle cx="0" cy="0" r="32" fill="none" stroke="#000000" strokeWidth="14"/>
                      <line x1="22" y1="22" x2="46" y2="46" stroke="#000000" strokeWidth="14" strokeLinecap="round"/>
                    </g>
                  </g>
                </svg>
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold tracking-tight">Gadget Sense</h1>
                <p className="text-[9px] sm:text-xs text-gray-400 uppercase tracking-wider font-medium">
                  Know Before You Buy
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-0.5">
              <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider font-medium">Built by</div>
              <div className="text-sm sm:text-base font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Devanand
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {showDisclaimer && (
          <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-xl sm:rounded-2xl relative">
            <button
              onClick={() => setShowDisclaimer(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-white transition-colors text-2xl sm:text-xl leading-none"
            >
              ×
            </button>
            <div className="flex gap-3 sm:gap-4 pr-8">
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 flex-shrink-0 mt-0.5 sm:mt-1" />
              <div>
                <h3 className="font-semibold text-yellow-500 mb-2 text-sm sm:text-base">Disclaimer</h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  The suggestions and recommendations provided by Gadget Sense are based on technical specifications and user reviews. 
                  Gadget Sense is not responsible for any purchasing decisions, product defects, warranty issues, or any other liability 
                  that may arise from using this service. Always verify specifications with the seller and read return policies before purchasing.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-8 sm:mb-12">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent px-4">
              Analyze Any Tech Product
            </h2>
            <p className="text-gray-400 text-sm sm:text-lg px-4">Paste a product URL to get instant AI-powered insights</p>
          </div>

          <div className="relative max-w-3xl mx-auto space-y-4">
            <div className="relative">
              <input
                type="text"
                value={url}
                onChange={handleUrlChange}
                onKeyDown={(e) => e.key === 'Enter' && !loading && !isSameUrl && url.trim() && purpose && analyzeProduct()}
                placeholder="https://www.amazon.com/product or amazon.in or flipkart.com or bestbuy.com..."
                className="w-full px-4 sm:px-6 py-4 sm:py-5 bg-white/5 border border-gray-800 rounded-xl sm:rounded-2xl text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all pr-12 sm:pr-14"
                disabled={loading}
              />
              {url && !loading && (
                <button
                  onClick={clearUrl}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all"
                  title="Clear URL"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => !loading && !result && setDropdownOpen(!dropdownOpen)}
                className={`w-full px-4 sm:px-6 py-4 sm:py-5 bg-white/5 border ${
                  !purpose && url.trim() ? 'border-yellow-500/50' : 'border-gray-800'
                } rounded-xl sm:rounded-2xl text-white text-sm sm:text-base focus:outline-none focus:border-white/30 transition-all flex items-center justify-between ${
                  (loading || result) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-white/20'
                }`}
                disabled={loading || result}
              >
                <div className="flex items-center gap-3">
                  {purpose && laptopPurposes.find(p => p.value === purpose)?.icon ? 
                    React.createElement(laptopPurposes.find(p => p.value === purpose).icon, {
                      className: "w-5 h-5 text-gray-400 flex-shrink-0"
                    }) :
                    <Goal className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  }
                  <span className="text-left">
                    {purpose ? laptopPurposes.find(p => p.value === purpose)?.label : 'Select your primary use case...'}
                    {result && <span className="ml-2 text-xs text-gray-500">(locked)</span>}
                  </span>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && !loading && !result && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-50 max-h-80 overflow-y-auto">
                  {laptopPurposes.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setPurpose(option.value);
                        setDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-white/10 transition-colors flex items-center gap-3 ${
                        purpose === option.value ? 'bg-white/5 text-white' : 'text-gray-300'
                      } ${option.value === '' ? 'border-b border-gray-700' : ''}`}
                      disabled={loading}
                    >
                      {option.icon ? 
                        React.createElement(option.icon, {
                          className: "w-4 h-4 flex-shrink-0"
                        }) :
                        <div className="w-4 h-4 flex-shrink-0" />
                      }
                      <span className="text-sm">{option.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {dropdownOpen && (
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setDropdownOpen(false)}
                />
              )}
            </div>

            {purpose && (
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {laptopPurposes.find(p => p.value === purpose)?.icon && 
                    React.createElement(laptopPurposes.find(p => p.value === purpose).icon, {
                      className: "w-4 h-4 text-white"
                    })
                  }
                  <span className="text-sm font-medium text-white">
                    {laptopPurposes.find(p => p.value === purpose)?.label}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-400">
                  {laptopPurposes.find(p => p.value === purpose)?.description}
                </p>
              </div>
            )}

            <div className="flex justify-center">
              <button
                onClick={analyzeProduct}
                disabled={loading || !url.trim() || !purpose || isSameUrl}
                className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-white text-black rounded-xl sm:rounded-2xl font-semibold hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap text-sm sm:text-base"
                title={
                  isSameUrl ? 'This URL has already been analyzed' : 
                  !purpose ? 'Please select your use case' : ''
                }
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing for {laptopPurposes.find(p => p.value === purpose)?.label}
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Analyze for {purpose ? laptopPurposes.find(p => p.value === purpose)?.label : 'Your Use Case'}
                  </>
                )}
              </button>
            </div>
          </div>

          {error && error.type === 'unsupported' && (
            <div className="mt-6 max-w-3xl mx-auto">
              <div className="bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-red-500/10 border border-yellow-500/30 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
                {/* Apologetic Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      We're Sorry! 😔
                    </h3>
                    <p className="text-yellow-400 font-semibold text-lg">
                      {error.retailer?.charAt(0).toUpperCase() + error.retailer?.slice(1)} is not supported yet
                    </p>
                  </div>
                </div>

                {/* Explanation */}
                <div className="bg-black/40 rounded-xl p-5 mb-6 border border-gray-700/50">
                  <p className="text-gray-300 leading-relaxed mb-3">
                    As an <span className="text-white font-semibold">open-source student project</span>, we currently don't have access to the expensive proxy services ($75-500/month) needed to scrape {error.retailer?.charAt(0).toUpperCase() + error.retailer?.slice(1)}.
                  </p>
                  <p className="text-gray-400 text-sm">
                    These retailers have advanced bot detection that blocks cloud servers. We'd love to support them in the future! 🙏
                  </p>
                </div>

                {/* What to do instead */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="w-5 h-5 text-blue-400" />
                    <h4 className="text-white font-semibold text-lg">Here's what you can do:</h4>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-4">
                    <p className="text-blue-300 text-sm leading-relaxed">
                      <span className="font-semibold">💡 Quick Fix:</span> Search for the same product on Amazon or Best Buy and paste that link instead. Most products are available on multiple retailers!
                    </p>
                  </div>
                </div>

                {/* Supported Retailers */}
                <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl p-5 border border-green-500/30">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <h4 className="text-white font-semibold">Retailers We Support:</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {error.supportedRetailers?.map((retailer, idx) => (
                      <a
                        key={idx}
                        href={retailer.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 bg-black/40 hover:bg-black/60 rounded-lg p-3 border border-gray-700 hover:border-green-500/50 transition-all duration-200"
                      >
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/30 transition-colors">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        </div>
                        <div className="flex-1">
                          <span className="text-white font-medium text-sm group-hover:text-green-400 transition-colors">
                            {retailer.name}
                          </span>
                        </div>
                        <Globe className="w-4 h-4 text-gray-500 group-hover:text-green-400 transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Footer note */}
                <div className="mt-6 pt-5 border-t border-gray-700/50">
                  <p className="text-gray-400 text-xs text-center">
                    Thank you for understanding! We're working hard to make GadgetSense better every day. ❤️
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && error.type === 'error' && (
            <div className="mt-4 max-w-3xl mx-auto p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 flex items-center gap-3 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error.message}</span>
            </div>
          )}
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-12 sm:py-20">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-gray-800 rounded-full"></div>
              <div className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-white border-t-transparent rounded-full animate-spin absolute top-0"></div>
              <Cpu className="w-8 h-8 sm:w-10 sm:h-10 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="mt-6 sm:mt-8 text-center px-4">
              <p className="text-lg sm:text-xl font-semibold mb-2">Analyzing Product</p>
              <p className="text-gray-400 text-xs sm:text-sm">Scraping specs, extracting data, and generating insights...</p>
            </div>
          </div>
        )}

        {result && !loading && (
          <div className="space-y-4 sm:space-y-6 animate-fade-in">
            <div className="flex justify-end">
              <button
                onClick={resetAnalysis}
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white/5 hover:bg-white/10 border border-gray-800 rounded-lg sm:rounded-xl font-semibold transition-all flex items-center gap-2 text-sm sm:text-base"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                Analyze New Product
              </button>
            </div>

            <div className="bg-white/5 border border-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start justify-between mb-4 sm:mb-6 gap-4">
                <div className="flex-1 w-full">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 leading-tight">{result.product?.title}</h3>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
                    <span className="capitalize">{result.product?.marketplace}</span>
                    {result.product?.brand && <span>•</span>}
                    {result.product?.brand && <span>{result.product.brand}</span>}
                  </div>
                </div>
                {result.product?.price && (
                  <div className="text-left sm:text-right w-full sm:w-auto">
                    <div className="text-2xl sm:text-3xl font-bold">
                      {result.product?.currency === 'INR' ? '₹' : '$'}{result.product.price.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">{result.product?.currency || 'USD'}</div>
                  </div>
                )}
              </div>

              <div className={`${getVerdictConfig(result.analysis?.verdict).bg} border border-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6`}>
                <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">
                  {React.createElement(getVerdictConfig(result.analysis?.verdict).icon, {
                    className: `w-6 h-6 sm:w-8 sm:h-8 ${getVerdictConfig(result.analysis?.verdict).color} flex-shrink-0`
                  })}
                  <div className="flex-1">
                    <div className={`text-base sm:text-lg font-bold ${getVerdictConfig(result.analysis?.verdict).color}`}>
                      {getVerdictConfig(result.analysis?.verdict).label}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400">
                      Confidence: {result.analysis?.confidence}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {result.extractedSpecs?.processor?.model && (
                <div className="bg-white/5 border border-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs sm:text-sm text-gray-400">Processor</div>
                      <div className="font-semibold text-sm sm:text-base truncate">{result.extractedSpecs.processor.model}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 space-y-1">
                    {result.extractedSpecs.processor.series && (
                      <div>Series: {result.extractedSpecs.processor.series}</div>
                    )}
                    {result.extractedSpecs.processor.generation && (
                      <div>Generation: {result.extractedSpecs.processor.generation}</div>
                    )}
                  </div>
                </div>
              )}

              {result.extractedSpecs?.ram?.amount && (
                <div className="bg-white/5 border border-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MemoryStick className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs sm:text-sm text-gray-400">Memory</div>
                      <div className="font-semibold text-sm sm:text-base">{result.extractedSpecs.ram.amount}GB RAM</div>
                    </div>
                  </div>
                  {result.extractedSpecs.ram.type && (
                    <div className="text-xs text-gray-400">Type: {result.extractedSpecs.ram.type}</div>
                  )}
                </div>
              )}

              {result.extractedSpecs?.storage?.size && (
                <div className="bg-white/5 border border-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <HardDrive className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs sm:text-sm text-gray-400">Storage</div>
                      <div className="font-semibold text-sm sm:text-base">
                        {result.extractedSpecs.storage.size}GB {result.extractedSpecs.storage.type}
                      </div>
                    </div>
                  </div>
                  {result.extractedSpecs.storage.interface && (
                    <div className="text-xs text-gray-400">Interface: {result.extractedSpecs.storage.interface}</div>
                  )}
                </div>
              )}

              {result.extractedSpecs?.display?.size && (
                <div className="bg-white/5 border border-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Monitor className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs sm:text-sm text-gray-400">Display</div>
                      <div className="font-semibold text-sm sm:text-base">{result.extractedSpecs.display.size}" Display</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 space-y-1">
                    {result.extractedSpecs.display.resolution && (
                      <div>Resolution: {result.extractedSpecs.display.resolution}</div>
                    )}
                    {result.extractedSpecs.display.refresh_rate && (
                      <div>Refresh Rate: {result.extractedSpecs.display.refresh_rate}Hz</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {result.analysis?.redFlags?.length > 0 && (
                <div className="bg-red-500/5 border border-red-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0" />
                    <h4 className="font-semibold text-red-500 text-sm sm:text-base">Critical Issues</h4>
                  </div>
                  <ul className="space-y-2 sm:space-y-3">
                    {result.analysis.redFlags.map((flag, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-gray-300 flex gap-2 items-start">
                        <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>{flag.message}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.analysis?.warnings?.length > 0 && (
                <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0" />
                    <h4 className="font-semibold text-yellow-500 text-sm sm:text-base">Warnings</h4>
                  </div>
                  <ul className="space-y-2 sm:space-y-3">
                    {result.analysis.warnings.map((warning, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-gray-300 flex gap-2 items-start">
                        <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <span>{warning.message}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.analysis?.goodIndicators?.length > 0 && (
                <div className="bg-green-500/5 border border-green-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <h4 className="font-semibold text-green-500 text-sm sm:text-base">Strengths</h4>
                  </div>
                  <ul className="space-y-2 sm:space-y-3">
                    {result.analysis.goodIndicators.map((indicator, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-gray-300 flex gap-2 items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{indicator.message}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {result.reviewSummary && result.reviewSummary.summary && (
              <div className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <h4 className="font-semibold flex items-center gap-2 text-sm sm:text-base">
                    <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    Customer Reviews Summary
                  </h4>
                  <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                    {result.reviewSummary.rating && (
                      <div className="flex items-center gap-1 bg-yellow-500/10 px-2 sm:px-3 py-1 rounded-lg">
                        <span className="text-yellow-500 font-bold">{result.reviewSummary.rating}</span>
                        <span className="text-yellow-500">⭐</span>
                      </div>
                    )}
                    {result.reviewSummary.totalReviews > 0 && (
                      <div className="text-gray-400">
                        {result.reviewSummary.totalReviews.toLocaleString()} reviews
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4 text-xs sm:text-sm">
                  {result.reviewSummary.summary.split('\n\n').map((section, idx) => {
                    if (section.startsWith('**') && section.includes(':**')) {
                      const heading = section.match(/\*\*(.*?):\*\*/)?.[1];
                      const content = section.replace(/\*\*(.*?):\*\*/, '').trim();
                      
                      return (
                        <div key={idx} className="space-y-2">
                          <h5 className="font-semibold text-white text-sm sm:text-base">{heading}:</h5>
                          {content && (
                            <div className="text-gray-300 leading-relaxed pl-0">
                              {content.split('\n').map((line, lineIdx) => {
                                if (line.trim().startsWith('-')) {
                                  return (
                                    <div key={lineIdx} className="flex gap-2 mb-1">
                                      <span className="text-blue-400 flex-shrink-0">•</span>
                                      <span>{line.trim().substring(1).trim()}</span>
                                    </div>
                                  );
                                }
                                return line.trim() ? <p key={lineIdx} className="mb-1">{line}</p> : null;
                              })}
                            </div>
                          )}
                        </div>
                      );
                    }
                    
                    return section.trim() ? (
                      <p key={idx} className="text-gray-300 leading-relaxed">{section}</p>
                    ) : null;
                  })}
                </div>
                
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-gray-500">
                  <span>AI-Summarized from {result.reviewSummary.reviewsAnalyzed} customer reviews</span>
                  <span className={`px-2 py-1 rounded ${
                    result.reviewSummary.sentiment === 'positive' ? 'bg-green-500/10 text-green-400' :
                    result.reviewSummary.sentiment === 'negative' ? 'bg-red-500/10 text-red-400' :
                    'bg-yellow-500/10 text-yellow-400'
                  }`}>
                    {result.reviewSummary.sentiment.charAt(0).toUpperCase() + result.reviewSummary.sentiment.slice(1)} Sentiment
                  </span>
                </div>
              </div>
            )}

            {result.aiRecommendation?.text && (
              <div className="bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-transparent border border-purple-500/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-2xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
                  <h4 className="font-bold text-lg sm:text-xl flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    AI Expert Analysis
                  </h4>
                  {purpose && (
                    <div className="px-3 py-1.5 bg-white/10 rounded-lg text-sm text-gray-300 flex items-center gap-2">
                      {laptopPurposes.find(p => p.value === purpose)?.icon && 
                        React.createElement(laptopPurposes.find(p => p.value === purpose).icon, {
                          className: "w-4 h-4"
                        })
                      }
                      <span>Analyzed for: {laptopPurposes.find(p => p.value === purpose)?.label || purpose}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  {result.aiRecommendation.text.split('\n\n').map((section, idx) => {
                    const headingMatch = section.match(/^##\s*([^\n]+)/);
                    if (headingMatch) {
                      let title = headingMatch[1].trim();
                      const content = section.replace(/^##\s*[^\n]+\n?/, '').trim();
                      
                      let icon = <Lightbulb />;
                      let colorClass = 'from-blue-500/20 to-purple-500/20 border-blue-500/30';
                      
                      if (title.includes('[TARGET]')) {
                        icon = <Goal />;
                        colorClass = 'from-green-500/20 to-emerald-500/20 border-green-500/30';
                        title = title.replace('[TARGET]', '').trim();
                      } else if (title.includes('[LIGHTBULB]')) {
                        icon = <Lightbulb />;
                        colorClass = 'from-blue-500/20 to-cyan-500/20 border-blue-500/30';
                        title = title.replace('[LIGHTBULB]', '').trim();
                      } else if (title.includes('[CHECK]')) {
                        icon = <CircleCheckBig />;
                        colorClass = 'from-green-500/20 to-teal-500/20 border-green-500/30';
                        title = title.replace('[CHECK]', '').trim();
                      } else if (title.includes('[ALERT]')) {
                        icon = <MessageCircleWarning />;
                        colorClass = 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
                        title = title.replace('[ALERT]', '').trim();
                      } else if (title.includes('[MESSAGE]')) {
                        icon = <MessageSquare />;
                        colorClass = 'from-purple-500/20 to-pink-500/20 border-purple-500/30';
                        title = title.replace('[MESSAGE]', '').trim();
                      } else if (title.includes('[CHART]')) {
                        icon = <ChartColumnStacked />;
                        colorClass = 'from-purple-500/20 to-pink-500/20 border-purple-500/30';
                        title = title.replace('[CHART]', '').trim();
                      } else if (title.includes('[USER]')) {
                        icon = <User />;
                        colorClass = 'from-indigo-500/20 to-blue-500/20 border-indigo-500/30';
                        title = title.replace('[USER]', '').trim();
                      } else if (title.includes('[DOLLAR]')) {
                        icon = <CircleDollarSign />;
                        colorClass = 'from-amber-500/20 to-yellow-500/20 border-amber-500/30';
                        title = title.replace('[DOLLAR]', '').trim();
                      } else if (title.includes('[X]')) {
                        icon = <XCircle />;
                        colorClass = 'from-red-500/20 to-red-600/20 border-red-500/30';
                        title = title.replace('[X]', '').trim();
                      } else if (title.includes('[QUESTION]')) {
                        icon = <HelpCircle />;
                        colorClass = 'from-gray-500/20 to-gray-600/20 border-gray-500/30';
                        title = title.replace('[QUESTION]', '').trim();
                      } else if (title.includes('[TROPHY]')) {
                        icon = <Trophy />;
                        colorClass = 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30';
                        title = title.replace('[TROPHY]', '').trim();
                      } else if (title.includes('Should You Buy')) {
                        icon = <Goal />;
                        colorClass = 'from-green-500/20 to-emerald-500/20 border-green-500/30';
                      } else if (title.includes('Why')) {
                        icon = <Lightbulb />;
                        colorClass = 'from-blue-500/20 to-cyan-500/20 border-blue-500/30';
                      } else if (title.includes('Good')) {
                        icon = <CircleCheckBig />;
                        colorClass = 'from-green-500/20 to-teal-500/20 border-green-500/30';
                      } else if (title.includes('Watch Out')) {
                        icon = <MessageCircleWarning />;
                        colorClass = 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
                      } else if (title.includes('Customers Say')) {
                        icon = <MessageSquare />;
                        colorClass = 'from-purple-500/20 to-pink-500/20 border-purple-500/30';
                      } else if (title.includes('Compares')) {
                        icon = <ChartColumnStacked />;
                        colorClass = 'from-purple-500/20 to-pink-500/20 border-purple-500/30';
                      } else if (title.includes('Who Should')) {
                        icon = <UserRoundCheck />;
                        colorClass = 'from-indigo-500/20 to-blue-500/20 border-indigo-500/30';
                      } else if (title.includes('Bottom Line')) {
                        icon = <CircleDollarSign />;
                        colorClass = 'from-amber-500/20 to-yellow-500/20 border-amber-500/30';
                      }
                      
                      return (
                        <div key={idx} className={`bg-gradient-to-br ${colorClass} border rounded-xl p-4 sm:p-6`}>
                          <h5 className="font-bold text-base sm:text-lg mb-3 flex items-center gap-3">
                            <span className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0">{icon}</span>
                            <span>{title}</span>
                          </h5>
                          <div className="space-y-2 text-sm sm:text-base text-gray-200 leading-relaxed">
                            {content.split('\n').map((line, lineIdx) => {
                              let cleanLine = line
                                .replace(/\[CHECK\]/g, '✓')
                                .replace(/\[X\]/g, '✗')
                                .replace(/\[ALERT\]/g, '⚠')
                                .replace(/\[TARGET\]/g, '→')
                                .replace(/\[LIGHTBULB\]/g, '💡')
                                .replace(/\[MESSAGE\]/g, '💬')
                                .replace(/\[CHART\]/g, '📊')
                                .replace(/\[USER\]/g, '👤')
                                .replace(/\[DOLLAR\]/g, '💰')
                                .replace(/\[QUESTION\]/g, '?')
                                .replace(/\[TROPHY\]/g, '🏆');
                              
                              if (cleanLine.trim().startsWith('-')) {
                                return (
                                  <div key={lineIdx} className="flex gap-3 items-start">
                                    <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                                    <span className="flex-1">{cleanLine.trim().substring(1).trim()}</span>
                                  </div>
                                );
                              }
                              const boldText = cleanLine.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
                              return cleanLine.trim() ? (
                                <p key={lineIdx} dangerouslySetInnerHTML={{ __html: boldText }} />
                              ) : null;
                            })}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>

                {result.aiRecommendation.similarProducts && result.aiRecommendation.similarProducts.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <h5 className="font-semibold text-sm mb-4 flex items-center gap-2 text-gray-300">
                      <Search className="w-4 h-4" />
                      Similar Products Found
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {result.aiRecommendation.similarProducts.map((product, idx) => (
                        <div key={idx} className="bg-white/5 border border-gray-700 rounded-lg p-3">
                          <div className="text-xs text-gray-400 mb-1">Match: {(parseFloat(product.similarity) * 100).toFixed(0)}%</div>
                          <div className="font-medium text-sm mb-1 line-clamp-2">{product.title}</div>
                          <div className="text-xs text-gray-400">${product.price} • {product.processor}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-gray-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-gray-300">With thoughts of <span className="font-semibold text-white">Devanand</span></span>
                  </span>
                  {result.metadata?.processingTime && (
                    <span>Analyzed in {(result.metadata.processingTime / 1000).toFixed(2)}s</span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {!result && !loading && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="bg-gradient-to-br from-white/5 to-white/0 border border-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-12">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                <Cpu className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-3">
                  <span>Hi, I'm Devanand</span>
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
                </h3>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed">
                  <p>
                    I'm a tech-savvy enthusiast who's been passionate about gadgets and tech reviews for over <strong className="text-white">8 years</strong>. 
                    Throughout my journey in the tech world, I've helped countless friends and family members make informed decisions about their tech purchases.
                  </p>
                  <p>
                    My mission has always been simple: <strong className="text-white">help people choose gadgets wisely</strong>, not just follow the hype created by OEMs and brands. 
                    Too often, consumers fall into the trap of paying premium prices for devices with low hardware configurations, simply because of clever marketing.
                  </p>
                  <p>
                    As an ardent follower of genuine tech reviewers from <strong className="text-white">MKBHD to Geeky Ranjit</strong> and many others, 
                    I've successfully guided people toward gadgets that are truly worth every penny—devices that don't just work for a year or two before 
                    experiencing lag and performance issues, but ones that provide lasting value.
                  </p>
                  <p className="pt-3 sm:pt-4 border-t border-gray-800">
                    <strong className="text-white">Gadget Sense</strong> is my way of combining years of tech knowledge with the power of AI to help even more people make smart buying decisions. 
                    Whether you're looking for a laptop, smartphone, or tablet, this tool analyzes specs, reviews, and real-world performance to give you 
                    honest recommendations—no marketing fluff, just facts.
                  </p>
                </div>
                <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div className="px-3 sm:px-4 py-2 bg-white/5 rounded-lg border border-gray-800">
                    <div className="text-gray-400 text-xs">Experience</div>
                    <div className="font-semibold">8+ Years</div>
                  </div>
                  <div className="px-3 sm:px-4 py-2 bg-white/5 rounded-lg border border-gray-800">
                    <div className="text-gray-400 text-xs">Products Analyzed</div>
                    <div className="font-semibold">1000+</div>
                  </div>
                  <div className="px-3 sm:px-4 py-2 bg-white/5 rounded-lg border border-gray-800">
                    <div className="text-gray-400 text-xs">Happy Recommendations</div>
                    <div className="font-semibold">500+</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="border-t border-gray-800 mt-12 sm:mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 text-center text-xs sm:text-sm text-gray-500">
          <p>Gadget Sense • AI-Powered Tech Analysis • Built by Devanand</p>
          <p className="mt-2">Always verify specifications with the seller before purchasing</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default GadgetSense;
