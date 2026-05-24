'use client';

import { useState, useEffect } from 'react';

export default function ScarcityCounter() {
  const [count, setCount] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev > 3 ? prev - 1 : prev));
    }, 15000); // Reduce count every 15 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2 mt-4 inline-flex items-center gap-2 animate-pulse">
      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
      <p className="text-red-400 text-sm font-medium">
        Only {count} Founding Member spots remaining at $49/mo
      </p>
    </div>
  );
}
