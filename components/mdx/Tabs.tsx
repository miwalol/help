'use client';

import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

export function Tab({ children }: Readonly<TabProps>) {
  return <>{children}</>;
}

export default function Tabs({ children }: Readonly<TabsProps>) {
  const tabs = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<TabProps> => React.isValidElement(child),
  );
  const [active, setActive] = useState<number>(0);

  return (
    <div className="my-3 overflow-hidden rounded-xl border border-border">
      <div className="flex border-b border-border">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={twMerge(
              'px-4 py-2 text-sm font-medium transition-colors text-gray-400 hover:bg-gray-700/50 hover:text-white',
              i === active && 'bg-gray-700 text-white',
            )}
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      
      <div className="[&>pre]:m-0 [&>pre]:rounded-none [&>pre]:border-none">
        {tabs[active]}
      </div>
    </div>
  );
}

interface TabProps {
  label: string;
  children: React.ReactNode;
}

interface TabsProps {
  children: React.ReactNode;
}
