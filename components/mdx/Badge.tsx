import React from 'react';

export default function Badge({ text }: BadgeProps) {
  return (
    <div className="ml-1 inline-block rounded-lg bg-gray-600 p-1 text-sm">
      <span>{text}</span>
    </div>
  );
}

interface BadgeProps {
  text: string;
}