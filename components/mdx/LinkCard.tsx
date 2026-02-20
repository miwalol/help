import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export default function LinkCard({ href, title, description, icon: Icon = null }: LinkCardProps) {
  return (
    <Link href={href} className="relative mt-4 block rounded-xl border border-border bg-secondary px-4 py-3 backdrop-blur">
      <div className="flex items-center gap-1.5">
        {Icon && <Icon />}
        <span className="truncate font-bold" title={title}>{title}</span>

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