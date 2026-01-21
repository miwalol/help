'use client';

import { useState } from 'react';
import { usePlausible } from 'next-plausible';
import { usePathname } from 'next/navigation';
import { ThumbsDown, ThumbsUp } from 'lucide-react';

export default function UsefulFeedback() {
  const plausible = usePlausible();
  const [voted, setVoted] = useState<boolean>(false);
  const pathname = usePathname();

  const handleFeedback = (useful: boolean) => {
    if (voted) return;
    plausible(`${useful ? 'Page Useful' : 'Page Not Useful'}`, { props: { url: pathname } });
    setVoted(true);
  };

  return (
    <div className="flex items-center gap-4">
      <span>Was this page useful?</span>
      <button onClick={() => handleFeedback(true)} disabled={voted} className="flex items-center gap-2"><ThumbsUp/>Yes</button>
      <button onClick={() => handleFeedback(false)} disabled={voted} className="flex items-center gap-2"><ThumbsDown/>No</button>
      {voted && <span>Thanks for feedback!</span>}
    </div>
  );
}