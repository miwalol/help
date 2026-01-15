import React from 'react';

export default function Badge({ text }: BadgeProps) {
  return (
    <div className="inline-block text-sm rounded-lg p-1 bg-gray-600 ml-1">
      <span>{text}</span>
    </div>
  );
}

interface BadgeProps {
  text: string;
}