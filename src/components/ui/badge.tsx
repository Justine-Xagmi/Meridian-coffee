import { cn } from '@/lib/utils';

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: React.ReactNode;
  tone?: 'neutral' | 'accent' | 'danger' | 'success';
  className?: string;
}) {
  const tones = {
    neutral: 'bg-surface-2 text-muted',
    accent: 'bg-accent text-accent-ink',
    danger: 'bg-danger/10 text-danger',
    success: 'bg-success/10 text-success',
  } as const;

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
