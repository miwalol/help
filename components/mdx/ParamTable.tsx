import React from 'react';
import { twMerge } from 'tailwind-merge';

const typeBadgeClasses: Record<string, string> = {
  string: 'bg-blue-500/20 text-blue-400',
  number: 'bg-orange-500/20 text-orange-400',
  boolean: 'bg-purple-500/20 text-purple-400',
  array: 'bg-green-500/20 text-green-400',
  object: 'bg-yellow-500/20 text-yellow-400',
  null: 'bg-gray-500/20 text-gray-400',
};

function TypeBadge({ type }: { type: string }) {
  return (
    <span className={twMerge('rounded px-1.5 py-0.5 font-mono text-xs font-medium', typeBadgeClasses[type] ?? 'bg-gray-500/20 text-gray-400')}>
      {type}
    </span>
  );
}

export function Param({ name, type, required, description }: Readonly<ParamProps>) {
  return (
    <div className="flex flex-col gap-1 border-t border-border px-4 py-3">
      <div className="flex flex-wrap items-center gap-2">
        <code className="text-sm">{name}</code>
        {required && (
          <span className="rounded bg-red-500/20 px-1.5 py-0.5 text-xs font-medium text-red-400">
            required
          </span>
        )}
        {type.split('|').map((t) => (
          <TypeBadge key={t} type={t.trim()} />
        ))}
      </div>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}

export default function ParamTable({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="my-3 overflow-hidden rounded-xl border border-border">
      {children}
    </div>
  );
}

interface ParamProps {
  name: string;
  type: string;
  required?: boolean;
  description: string;
}
