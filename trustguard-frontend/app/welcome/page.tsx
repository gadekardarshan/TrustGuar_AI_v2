'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  ScanFace,
  Zap,
  Globe,
  ArrowRight
} from 'lucide-react';

export default function Welcome() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleGetStarted = () => {
    router.push('/analyze');
  };

  return (
    <main className="min-h-screen bg-transparent text-white overflow-hidden relative selection:bg-emerald-500/30">

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-emerald-500" />
          <span className="text-xl font-medium tracking-wide font-serif">TrustGuard</span>
        </div>
        <button className="px-6 py-2 border border-emerald-500/20 rounded-full text-sm font-medium text-emerald-100 hover:bg-emerald-500/10 transition-colors backdrop-blur-sm">
          About System
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center pt-24 pb-32 text-center px-4">
        <div className={`transition-all duration-1000 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

          <h1 className="text-6xl md:text-8xl mb-8 leading-tight tracking-tight font-serif text-white/90 drop-shadow-2xl">
            Personal <span className="text-emerald-500 italic">search</span> <br />
            <span className="text-4xl md:text-6xl block mt-2 text-white/60">Professional Security</span>
          </h1>

          <p className="text-emerald-100/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light tracking-wide leading-relaxed drop-shadow-lg">
            The new standard in fraud detection. Analyze job offers and digital entities with military-grade precision.
          </p>

          <button
            onClick={handleGetStarted}
            className="group relative inline-flex items-center justify-center px-10 py-4 bg-emerald-600/90 hover:bg-emerald-700 text-white rounded-full transition-all duration-500 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] backdrop-blur-sm border border-emerald-500/30"
          >
            <span className="mr-3 tracking-widest text-sm font-bold uppercase">Begin Analysis</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Minimal Feature Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md">

          {/* Card 1 */}
          <div className="group p-10 bg-[#030704]/40 hover:bg-[#050f08]/60 transition-colors duration-500 relative">
            <ScanFace className="w-10 h-10 text-emerald-500 mb-6 stroke-1" />
            <h3 className="text-2xl font-serif mb-3 text-white/90">Identity Verification</h3>
            <p className="text-white/60 text-sm font-light leading-relaxed">
              Cross-references digital footprints against known legitimate entity databases.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group p-10 bg-[#030704]/40 hover:bg-[#050f08]/60 transition-colors duration-500 relative">
            <Zap className="w-10 h-10 text-emerald-500 mb-6 stroke-1" />
            <h3 className="text-2xl font-serif mb-3 text-white/90">Rapid Inference</h3>
            <p className="text-white/60 text-sm font-light leading-relaxed">
              Real-time heuristic analysis provides immediate risk assessment scores.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group p-10 bg-[#030704]/40 hover:bg-[#050f08]/60 transition-colors duration-500 relative">
            <Globe className="w-10 h-10 text-emerald-500 mb-6 stroke-1" />
            <h3 className="text-2xl font-serif mb-3 text-white/90">Global Surveillance</h3>
            <p className="text-white/60 text-sm font-light leading-relaxed">
              Monitors patterns across multiple platforms and international domains.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 text-center text-white/30 text-xs uppercase tracking-widest">
        <p>TrustGuard AI • Security Protocols Active</p>
      </footer>
    </main>
  );
}
