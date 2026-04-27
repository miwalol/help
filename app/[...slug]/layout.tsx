import React from 'react';
import Sidebar from '@/components/sidebar/Sidebar';

export default async function Layout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ slug: string[] }> }>) {
  const { slug } = await params;

  return (
    <div className="flex gap-4">
      <Sidebar sidebar={slug[0] === 'developers' ? 'dev' : 'main'} />
      {children}
    </div>
  );
}
