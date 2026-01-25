import { Link, type LinkProps } from '@tanstack/react-router';
import { cn } from '@/lib/utils';

export function SidebarLink({
  className,
  ...props
}: LinkProps & { className?: string }) {
  return (
    <Link
      {...props}
      className={cn('flex items-center gap-2', className)}
      activeProps={{
        className: 'text-sidebar-accent-foreground bg-sidebar-accent',
      }}
    />
  );
}
