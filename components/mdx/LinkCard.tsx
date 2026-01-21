import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export default function LinkCard({ href, title, description, icon: Icon = null }: LinkCardProps) {
  return (
    <Link href={href} className="rounded-xl border border-border bg-secondary py-3 px-4 mt-4 block backdrop-blur relative">
      <div className="flex items-center gap-1.5">
        {Icon && <Icon />}
        <span className="font-bold truncate" title={title}>{title}</span>

        <div className="grow"></div>

        <ArrowRight />
      </div>

      {description && <p>{description}</p>}
    </Link>
  );
}

interface LinkCardProps {
  href: string;
  title: string;
  description?: React.ReactNode|string;
  icon?: LucideIcon|null;
}