'use client';

import {
  ArrowRight,
  MoreHorizontal,
  Settings,
  Trash2,
  Users,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { WorkspaceSummaryDto } from '@/features/workspaces/workspace.schemas';
import { cn, mockAvatarUrl } from '@/lib/utils';
import { useTheme } from '@/shared/theme/use-theme';

interface WorkspaceCardProps {
  workspace: WorkspaceSummaryDto;
  onOpen?: (workspace: WorkspaceSummaryDto) => void;
  onEdit?: (workspace: WorkspaceSummaryDto) => void;
  onDelete?: (workspace: WorkspaceSummaryDto) => void;
  className?: string;
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function WorkspaceCard({
  workspace,
  onOpen,
  className,
}: WorkspaceCardProps) {
  const { theme } = useTheme();
  const displayMembers = workspace.membersPreview.slice(0, 4);
  const remainingMembers = workspace.memberCount - displayMembers.length;

  return (
    <Card className={cn('border', className)}>
      <CardHeader className='pb-3'>
        <div className='flex items-start justify-between gap-4'>
          <div className='flex items-center gap-3'>
            <div className='flex size-10 items-center justify-center rounded-md bg-muted'>
              <span className='font-semibold'>
                {workspace.name.charAt(0).toUpperCase()}
              </span>
            </div>

            <div>
              <CardTitle className='text-base'>{workspace.name}</CardTitle>
              <CardDescription className='text-xs'>
                Created {formatDate(new Date(workspace.createdAt))}
              </CardDescription>
            </div>
          </div>

          <div className='flex items-center gap-1'>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant='ghost'
                    size='icon'
                    className='size-8 text-muted-foreground hover:text-foreground'
                  >
                    <MoreHorizontal className='size-4' />
                    <span className='sr-only'>Open menu</span>
                  </Button>
                }
              />
              <DropdownMenuContent align='end' className='w-48'>
                <DropdownMenuItem onClick={() => onOpen?.(workspace)}>
                  <ArrowRight className='mr-2 size-4' />
                  Open workspace
                </DropdownMenuItem>
                {workspace.isCurrentUserOwner && (
                  <>
                    <DropdownMenuItem>
                      <Settings className='mr-2 size-4' />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant='destructive'>
                      <Trash2 className='mr-2 size-4' />
                      Delete
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className='space-y-3 pb-4'>
        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
          <Users className='size-4' />
          <span>
            {workspace.memberCount}{' '}
            {workspace.memberCount === 1 ? 'member' : 'members'}
          </span>
        </div>

        <div className='flex -space-x-2'>
          {displayMembers.map((member) => (
            <Avatar key={member.id} className='size-8'>
              {/* TODO: use the users own avatar once its implemented */}
              <AvatarImage src={mockAvatarUrl(member.id)} />
              <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
            </Avatar>
          ))}

          {remainingMembers > 0 && (
            <div className='flex size-8 items-center justify-center rounded-full bg-muted text-xs'>
              +{remainingMembers}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className='border-t pt-4'>
        <Button
          className='w-full'
          onClick={() => onOpen?.(workspace)}
          variant={theme === 'dark' ? 'secondary' : 'outline'}
        >
          Open Workspace
        </Button>
      </CardFooter>
    </Card>
  );
}
