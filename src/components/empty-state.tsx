import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { H4, Muted } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon: Icon,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex min-h-50 flex-col items-center justify-center rounded-lg border border-dashed bg-muted/30 text-center p-6',
        className
      )}
    >
      {Icon && <Icon className='size-12 text-muted-foreground mb-4' />}
      <H4>{title}</H4>
      {description && <Muted className='mt-2'>{description}</Muted>}
      {action && <div className='mt-4'>{action}</div>}
    </div>
  );
}
