import React, { ButtonHTMLAttributes, cloneElement, isValidElement } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Button({ children, className, variant = 'primary', asChild, ...props }: ButtonProps) {
  const defaultClass = 'py-2 px-4 rounded-xl text-white my-2 block';
  const classes: Record<ButtonVariant, string> = {
    primary: 'bg-primary',
  };

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ...props,
      // @ts-ignore
      className: twMerge(defaultClass, classes[variant], className),
      children: <>
        {(children.props as { children: React.ReactNode }).children}
      </>,
    });
  }

  return <button className={twMerge(defaultClass, classes[variant], className)}>{children}</button>;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: ButtonVariant;
}

export type ButtonVariant = 'primary';