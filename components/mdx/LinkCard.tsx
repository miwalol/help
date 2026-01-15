import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function LinkCard({ href, title, description }: LinkCardProps) {
  return (
    <Link href={href} className="rounded-xl border border-border bg-secondary py-3 px-4 mt-4 block backdrop-blur relative">
      <span className="font-bold" title={title}>{title}</span>
      {description && <p>{description}</p>}
      
      <div className="absolute right-4 top-4">
        <ArrowRight />
      </div>
    </Link>
  );
}

interface LinkCardProps {
  href: string;
  title: string;
  description?: React.ReactNode|string;
}