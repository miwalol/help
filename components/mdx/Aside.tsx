import React, { ForwardRefExoticComponent, RefAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { Info, LucideProps, Rocket, TriangleAlert } from 'lucide-react';

export default function Aside({ children, type, title }: AsideProps) {
  const classes: Record<AsideType, string> = {
    info: 'bg-blue-500/30',
    tip: 'bg-purple-500/30',
    warning: 'bg-yellow-500/30',
    danger: 'bg-red-500/30',
  };
  const icons: Record<AsideType, ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>> = {
    info: Info,
    tip: Rocket,
    warning: TriangleAlert,
    danger: TriangleAlert,
  };
  const Icon = icons[type];

  return (
    <aside className={twMerge('rounded-xl border border-border p-4 my-3', classes[type])}>
      <div className="flex items-center gap-2 mb-2">
        <Icon />
        <span className="font-semibold uppercase">{title || type}</span>
      </div>

      {children}
    </aside>
  );
}

interface AsideProps {
  type: AsideType;
  children: React.ReactNode;
  title?: string;
}

type AsideType = 'info' | 'tip' | 'warning' | 'danger';