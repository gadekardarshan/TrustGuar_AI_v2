'use client';
import { useState } from 'react';
import { analyzeEnhanced, type EnhancedAnalyzeResponse } from '../utils/api';
import TrustScore from '@/components/TrustScore';
import { ShieldCheck, AlertTriangle, ArrowRight, Building2, Terminal } from 'lucide-react';
import clsx from 'clsx';

export default function Analyze() {
  const [jobUrl, setJobUrl] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [companyUrl, setCompanyUrl] = useState('');
  const [result, setResult] = useState<EnhancedAnalyzeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!jobUrl && !jobDescription) {
      setError("Please provide input data.");
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await analyzeEnhanced(jobUrl, jobDescription, companyUrl);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Analysis failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020604] text-white font-sans selection:bg-emerald-500/30 overflow-x-hidden relative">

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px bg-emerald-500/50 w-12"></div>
            <span className="text-emerald-500 text-xs tracking-[0.2em] uppercase font-bold">System Interface</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif text-white/90 mb-4">
            Intelligence <br /> <span className="text-emerald-500 italic">Console</span>
          </h1>
        </header>

        {/* Console Input Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">

          {/* Main Input - Minimalist */}
          <div className="space-y-8">
            <div className="group relative">
              <label className="text-xs tracking-widest text-emerald-500/60 mb-3 block uppercase">Target Source</label>
              <input
                type="text"
                placeholder="Paste URL (LinkedIn/Indeed)..."
                className="w-full bg-transparent border-b border-white/10 py-4 text-xl text-white placeholder-white/20 outline-none focus:border-emerald-500 transition-colors font-light"
                value={jobUrl}
                onChange={(e) => setJobUrl(e.target.value)}
              />
            </div>

            <div className="group relative">
              <label className="text-xs tracking-widest text-emerald-500/60 mb-3 block uppercase">Raw Content Data</label>
              <textarea
                rows={4}
                placeholder="Paste text description..."
                className="w-full bg-transparent border-b border-white/10 py-4 text-xl text-white placeholder-white/20 outline-none focus:border-emerald-500 transition-colors font-light resize-none"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            <div className="group relative">
              <label className="text-xs tracking-widest text-white/40 mb-3 block uppercase flex items-center gap-2">
                <Building2 className="w-3 h-3" />
                Entity Domain (Optional)
              </label>
              <input
                type="text"
                placeholder="company.com"
                className="w-full bg-transparent border-b border-white/10 py-4 text-lg text-white placeholder-white/20 outline-none focus:border-emerald-500 transition-colors font-light"
                value={companyUrl}
                onChange={(e) => setCompanyUrl(e.target.value)}
              />
            </div>
          </div>

          {/* Action / Status */}
          <div className="flex flex-col justify-end">
            {error && (
              <div className="flex items-center gap-3 text-red-400 text-sm mb-6 bg-red-500/5 p-4 border-l-2 border-red-500">
                <AlertTriangle className="w-4 h-4" />
                {error}
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className={clsx(
                "w-full py-6 bg-emerald-900/20 hover:bg-emerald-900/30 border border-emerald-500/20 text-emerald-400 font-medium tracking-widest uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group hover:border-emerald-500/50",
                loading ? "cursor-wait" : ""
              )}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                  Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-3">
                  Execute Analysis
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Results Injection */}
        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000 border-t border-white/10 pt-16">
            <TrustScore result={result} />
          </div>
        )}
      </div>
    </main>
  );
}
