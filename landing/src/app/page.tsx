'use client';

import ScarcityCounter from '@/components/ScarcityCounter';
import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', { method: 'POST' });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Checkout error: ' + data.error);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to initiate checkout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 pt-24 pb-32 flex flex-col items-center text-center">
        <div className="inline-block px-4 py-1.5 mb-8 text-sm font-medium tracking-wider uppercase border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
          The Future of Technical Hiring
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent leading-tight">
          The $1B Unicorn Platform <br />
          for Your Technical Career.
        </h1>
        
        <p className="text-xl text-zinc-400 max-w-2xl mb-12">
          EngineAI Co-Pilot provides real-time AI guidance for elite technical interviews. 
          Master high-level concepts and architectural design, not just syntax.
        </p>

        <div className="flex flex-col items-center gap-6">
          <ScarcityCounter />
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button 
              onClick={handleSubscribe}
              disabled={loading}
              className="bg-white text-black font-bold py-4 px-10 rounded-full hover:bg-zinc-200 transition-all text-lg shadow-[0_0_30px_rgba(255,255,255,0.15)] disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Subscribe Now'}
            </button>
            <a
              href="#enterprise"
              className="bg-transparent border border-white/20 text-white font-semibold py-4 px-10 rounded-full hover:bg-white/5 transition-all text-lg"
            >
              Enterprise Demo
            </a>
          </div>
        </div>
      </main>

      {/* Enterprise Section */}
      <section id="enterprise" className="bg-zinc-950 py-32 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">EngineAI for Teams</h2>
              <p className="text-xl text-zinc-400 mb-8">
                Empower your engineering organization with standardized AI mentorship. 
                Reduce onboarding time by 40% and scale technical excellence across every squad.
              </p>
              <ul className="space-y-4 text-zinc-300">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <span className="text-black text-xs font-bold">✓</span>
                  </div>
                  Dedicated Enterprise Support
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <span className="text-black text-xs font-bold">✓</span>
                  </div>
                  Customized Knowledge Bases
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <span className="text-black text-xs font-bold">✓</span>
                  </div>
                  SLA & Security Compliance
                </li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Request Enterprise Access</h3>
              <form className="space-y-4">
                <input type="text" placeholder="Work Email" className="w-full bg-black border border-white/10 rounded-lg p-3 focus:border-white/40 outline-none transition-all" />
                <input type="text" placeholder="Company Name" className="w-full bg-black border border-white/10 rounded-lg p-3 focus:border-white/40 outline-none transition-all" />
                <button type="button" className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-zinc-200 transition-all">
                  Contact Sales
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5 text-center text-zinc-500">
        <p>© 2026 EngineAI Unicorn. Built for elite engineers.</p>
      </footer>
    </div>
  );
}
