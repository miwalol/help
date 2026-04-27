'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={twMerge('mt-3 border-t border-border pt-3 transition-opacity duration-300', visible ? 'opacity-100' : 'opacity-0')}>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-gray-200"
      >
        <ArrowUp size={14} />Back to top
      </button>
    </div>
  );
}
