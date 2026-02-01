import { Link } from '@tanstack/react-router';
import { CogIcon, SquareKanbanIcon, UserIcon } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button.variants';
import { H4 } from '@/components/ui/typography';
import { cn } from '@/lib/utils';
import type { Dashboard } from '../dashboard.schema';

interface WorkspaceHeaderProps {
  workspace: Dashboard['workspaces'][number];
}

export function WorkspaceHeader({ workspace }: WorkspaceHeaderProps) {
  return (
    <div className='flex items-center justify-between flex-wrap gap-4'>
      <div className='flex items-center gap-2'>
        <div className='size-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-semibold uppercase shrink-0'>
          {workspace.name[0]}
        </div>
        <H4>{workspace.name}</H4>
      </div>

      <div className='flex items-center gap-2'>
        <Link
          to='/workspaces/$workspaceId/boards'
          params={{ workspaceId: workspace.id }}
          className={cn(
            buttonVariants({ variant: 'secondary', className: 'gap-2' })
          )}
        >
          <SquareKanbanIcon />
          Boards
        </Link>

        <Link
          to='/workspaces/$workspaceId/members'
          params={{ workspaceId: workspace.id }}
          className={cn(
            buttonVariants({ variant: 'secondary', className: 'gap-2' })
          )}
        >
          <UserIcon />
          Members
        </Link>

        <Link
          to='/workspaces/$workspaceId/settings'
          params={{ workspaceId: workspace.id }}
          className={cn(
            buttonVariants({ variant: 'secondary', className: 'gap-2' })
          )}
        >
          <CogIcon />
          Settings
        </Link>
      </div>
    </div>
  );
}
