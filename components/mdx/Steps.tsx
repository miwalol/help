import React from 'react';

export default function Steps({ children }: { children: React.ReactNode }) {
  // @ts-ignore
  const steps = (children! as React.ReactElement).props!.children as React.ReactElement[];

  return (
    <ol className="mt-3 space-y-2">
      {steps.filter(s => s.props).map((step, i) => {
        // @ts-ignore
        const p = (step.props!.children as React.ReactElement[]).find(c => c.props);
        if (!p) return null;

        return (
          <li key={i} className="flex items-start gap-2">
            <span className="block w-3 select-none">{i + 1}.</span>

            <div>
              {/*@ts-ignore*/}
              {p.props!.children}
            </div>
          </li>
        );
      })}
    </ol>
  );
}