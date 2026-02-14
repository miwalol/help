import React from 'react';

export default function CardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
      {children}
    </div>
  );
}