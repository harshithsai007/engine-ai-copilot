'use client';

import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="bg-black text-white min-h-screen font-[family-name:var(--font-geist-sans)] flex flex-col items-center justify-center text-center px-6">
      <main className="max-w-2xl mx-auto">
        <div className="inline-block px-4 py-1.5 mb-8 text-sm font-medium tracking-wider uppercase border border-white/10 rounded-full bg-white/5 backdrop-blur-sm text-zinc-400">
          Checkout Incomplete
        </div>
        
        <h1 className="text-5xl md:text-6xl font-extrabold mb-8 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent leading-tight">
          Subscription Cancelled.
        </h1>
        
        <p className="text-xl text-zinc-400 mb-12">
          No worries. If this was a mistake, you can try again anytime. 
          Need help? <Link href="mailto:support@engineai.co" className="text-white underline underline-offset-4">Contact us</Link>.
        </p>

        <div className="flex flex-col items-center gap-6">
          <Link
            href="/"
            className="bg-white text-black font-bold py-4 px-10 rounded-full hover:bg-zinc-200 transition-all text-lg shadow-[0_0_30px_rgba(255,255,255,0.15)]"
          >
            Return to Home
          </Link>
        </div>
      </main>

      <footer className="absolute bottom-12 text-zinc-600 text-sm">
        © 2026 EngineAI Co-Pilot. Built for elite engineers.
      </footer>
    </div>
  );
}
