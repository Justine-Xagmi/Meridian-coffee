import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'focus-ring inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-bg hover:bg-ink/85',
  secondary: 'bg-accent text-accent-ink hover:bg-accent/90',
  outline: 'border border-line bg-transparent text-ink hover:bg-surface-2',
  ghost: 'bg-transparent text-ink hover:bg-surface-2',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-[3.25rem] px-8 text-base',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => (
    <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props} />
  )
);
Button.displayName = 'Button';

interface ButtonLinkProps {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

export function ButtonLink({ href, variant = 'primary', size = 'md', className, children, ariaLabel }: ButtonLinkProps) {
  return (
    <Link href={href} aria-label={ariaLabel} className={cn(base, variants[variant], sizes[size], className)}>
      {children}
    </Link>
  );
}
