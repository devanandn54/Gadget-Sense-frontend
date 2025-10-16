'use client'
import React, { useState } from 'react';
import { Search, AlertCircle, CheckCircle, XCircle, Loader2, Cpu, HardDrive, MemoryStick, Monitor, DollarSign, TrendingUp, TrendingDown, Minus, X, Plus, Sparkles } from 'lucide-react';

const GadgetSense = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const clearUrl = () => {
    setUrl('');
    setError('');
  };

  const resetAnalysis = () => {
    setResult(null);
    setUrl('');
    setError('');
  };

  const analyzeProduct = async () => {
    if (!url.trim()) {
      setError('Please enter a product URL');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Replace with your actual API endpoint
      const response = await fetch('gadget-sense-backend-production.up.railway.app/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      if (!response.ok) throw new Error('Analysis failed');
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to analyze product. Please try again.');
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
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Cpu className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Gadget Sense</h1>
                <p className="text-xs text-gray-400">AI-Powered Tech Analysis</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">Built by</div>
              <div className="text-sm font-semibold">Devanand</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Disclaimer */}
        {showDisclaimer && (
          <div className="mb-8 p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl relative">
            <button
              onClick={() => setShowDisclaimer(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              ×
            </button>
            <div className="flex gap-4">
              <AlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-yellow-500 mb-2">Disclaimer</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  The suggestions and recommendations provided by Gadget Sense are based on technical specifications and user reviews. 
                  Gadget Sense is not responsible for any purchasing decisions, product defects, warranty issues, or any other liability 
                  that may arise from using this service. Always verify specifications with the seller and read return policies before purchasing.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Search Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Analyze Any Tech Product
            </h2>
            <p className="text-gray-400 text-lg">Paste a product URL to get instant AI-powered insights</p>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <div className="relative flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !loading && url.trim() && analyzeProduct()}
                  placeholder="https://www.amazon.com/laptop-xyz or any product URL..."
                  className="w-full px-6 py-5 bg-white/5 border border-gray-800 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all pr-14"
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
              <button
                onClick={analyzeProduct}
                disabled={loading || !url.trim()}
                className="px-8 py-5 bg-white text-black rounded-2xl font-semibold hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Analyze
                  </>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 max-w-3xl mx-auto p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Loading Animation */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-gray-800 rounded-full"></div>
              <div className="w-24 h-24 border-4 border-white border-t-transparent rounded-full animate-spin absolute top-0"></div>
              <Cpu className="w-10 h-10 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="mt-8 text-center">
              <p className="text-xl font-semibold mb-2">Analyzing Product</p>
              <p className="text-gray-400 text-sm">Scraping specs, extracting data, and generating insights...</p>
            </div>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <div className="space-y-6 animate-fade-in">
            {/* New URL Button */}
            <div className="flex justify-end">
              <button
                onClick={resetAnalysis}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-gray-800 rounded-xl font-semibold transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Analyze New Product
              </button>
            </div>

            {/* Product Info */}
            <div className="bg-white/5 border border-gray-800 rounded-2xl p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{result.product?.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="capitalize">{result.product?.marketplace}</span>
                    {result.product?.brand && <span>•</span>}
                    {result.product?.brand && <span>{result.product.brand}</span>}
                  </div>
                </div>
                {result.product?.price && (
                  <div className="text-right">
                    <div className="text-3xl font-bold">${result.product.price}</div>
                    <div className="text-xs text-gray-500">{result.product?.currency || 'USD'}</div>
                  </div>
                )}
              </div>

              {/* Verdict */}
              <div className={`${getVerdictConfig(result.analysis?.verdict).bg} border border-gray-800 rounded-xl p-6`}>
                <div className="flex items-center gap-4 mb-3">
                  {React.createElement(getVerdictConfig(result.analysis?.verdict).icon, {
                    className: `w-8 h-8 ${getVerdictConfig(result.analysis?.verdict).color}`
                  })}
                  <div>
                    <div className={`text-lg font-bold ${getVerdictConfig(result.analysis?.verdict).color}`}>
                      {getVerdictConfig(result.analysis?.verdict).label}
                    </div>
                    <div className="text-sm text-gray-400">
                      Confidence: {result.analysis?.confidence}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Specs Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Processor */}
              {result.extractedSpecs?.processor?.model && (
                <div className="bg-white/5 border border-gray-800 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Processor</div>
                      <div className="font-semibold">{result.extractedSpecs.processor.model}</div>
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

              {/* RAM */}
              {result.extractedSpecs?.ram?.amount && (
                <div className="bg-white/5 border border-gray-800 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                      <MemoryStick className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Memory</div>
                      <div className="font-semibold">{result.extractedSpecs.ram.amount}GB RAM</div>
                    </div>
                  </div>
                  {result.extractedSpecs.ram.type && (
                    <div className="text-xs text-gray-400">Type: {result.extractedSpecs.ram.type}</div>
                  )}
                </div>
              )}

              {/* Storage */}
              {result.extractedSpecs?.storage?.size && (
                <div className="bg-white/5 border border-gray-800 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                      <HardDrive className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Storage</div>
                      <div className="font-semibold">
                        {result.extractedSpecs.storage.size}GB {result.extractedSpecs.storage.type}
                      </div>
                    </div>
                  </div>
                  {result.extractedSpecs.storage.interface && (
                    <div className="text-xs text-gray-400">Interface: {result.extractedSpecs.storage.interface}</div>
                  )}
                </div>
              )}

              {/* Display */}
              {result.extractedSpecs?.display?.size && (
                <div className="bg-white/5 border border-gray-800 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                      <Monitor className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Display</div>
                      <div className="font-semibold">{result.extractedSpecs.display.size}" Display</div>
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

            {/* Analysis Details */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Red Flags */}
              {result.analysis?.redFlags?.length > 0 && (
                <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingDown className="w-5 h-5 text-red-500" />
                    <h4 className="font-semibold text-red-500">Critical Issues</h4>
                  </div>
                  <ul className="space-y-3">
                    {result.analysis.redFlags.map((flag, idx) => (
                      <li key={idx} className="text-sm text-gray-300 flex gap-2">
                        <span className="text-red-500">•</span>
                        <span>{flag.message}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Warnings */}
              {result.analysis?.warnings?.length > 0 && (
                <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                    <h4 className="font-semibold text-yellow-500">Warnings</h4>
                  </div>
                  <ul className="space-y-3">
                    {result.analysis.warnings.map((warning, idx) => (
                      <li key={idx} className="text-sm text-gray-300 flex gap-2">
                        <span className="text-yellow-500">•</span>
                        <span>{warning.message}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Good Indicators */}
              {result.analysis?.goodIndicators?.length > 0 && (
                <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <h4 className="font-semibold text-green-500">Strengths</h4>
                  </div>
                  <ul className="space-y-3">
                    {result.analysis.goodIndicators.map((indicator, idx) => (
                      <li key={idx} className="text-sm text-gray-300 flex gap-2">
                        <span className="text-green-500">•</span>
                        <span>{indicator.message}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* AI Recommendation */}
            {result.aiRecommendation?.text && (
              <div className="bg-white/5 border border-gray-800 rounded-2xl p-8">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  AI Expert Analysis
                </h4>
                <div className="prose prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap text-sm text-gray-300 leading-relaxed font-sans">
                    {result.aiRecommendation.text}
                  </pre>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-800 flex items-center justify-between text-xs text-gray-500">
                  <span>AI-Powered Analysis</span>
                  {result.metadata?.processingTime && (
                    <span>Analyzed in {(result.metadata.processingTime / 1000).toFixed(2)}s</span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* About Section */}
      {!result && !loading && (
        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="bg-gradient-to-br from-white/5 to-white/0 border border-gray-800 rounded-3xl p-12">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Cpu className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span>Hi, I'm Devanand</span>
                  <Sparkles className="w-6 h-6 text-yellow-500" />
                </h3>
                <div className="space-y-4 text-gray-300 leading-relaxed">
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
                  <p className="pt-4 border-t border-gray-800">
                    <strong className="text-white">Gadget Sense</strong> is my way of combining years of tech knowledge with the power of AI to help even more people make smart buying decisions. 
                    Whether you're looking for a laptop, smartphone, or tablet, this tool analyzes specs, reviews, and real-world performance to give you 
                    honest recommendations—no marketing fluff, just facts.
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-4 text-sm">
                  <div className="px-4 py-2 bg-white/5 rounded-lg border border-gray-800">
                    <div className="text-gray-400 text-xs">Experience</div>
                    <div className="font-semibold">8+ Years</div>
                  </div>
                  <div className="px-4 py-2 bg-white/5 rounded-lg border border-gray-800">
                    <div className="text-gray-400 text-xs">Products Analyzed</div>
                    <div className="font-semibold">1000+</div>
                  </div>
                  <div className="px-4 py-2 bg-white/5 rounded-lg border border-gray-800">
                    <div className="text-gray-400 text-xs">Happy Recommendations</div>
                    <div className="font-semibold">500+</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-sm text-gray-500">
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