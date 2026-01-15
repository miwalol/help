import Button, { ButtonVariant } from '@/components/ui/Button';
import Link from 'next/link';
import React from 'react';

export default function LinkButton({ href, children, variant, ...props }: LinkButtonProps) {
  return (
    <Button asChild variant={variant} className="inline-block">
      <Link href={href} {...props}>{children}</Link>
    </Button>
  );
}

interface LinkButtonProps extends React.HTMLProps<HTMLAnchorElement> {
  href: string;
  children?: React.ReactNode;
  variant?: ButtonVariant;
}