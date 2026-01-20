'use client';

import { Star, Users } from 'lucide-react';
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
import { cn } from '@/lib/utils';

export interface WorkspaceMember {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  role: 'owner' | 'admin' | 'member';
}

export interface WorkspaceCardData {
  id: string;
  name: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  members: WorkspaceMember[];
  isFavorite?: boolean;
}

interface WorkspaceCardProps {
  workspace: WorkspaceCardData;
  onOpen?: (workspace: WorkspaceCardData) => void;
  onEdit?: (workspace: WorkspaceCardData) => void;
  onDelete?: (workspace: WorkspaceCardData) => void;
  onToggleFavorite?: (workspace: WorkspaceCardData) => void;
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
  onToggleFavorite,
  className,
}: WorkspaceCardProps) {
  const displayMembers = workspace.members.slice(0, 4);
  const remainingMembers = workspace.members.length - displayMembers.length;

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
                Created {formatDate(workspace.createdAt)}
              </CardDescription>
            </div>
          </div>

          <div className='flex items-center gap-1'>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => onToggleFavorite?.(workspace)}
            >
              <Star
                className={cn('size-4', workspace.isFavorite && 'fill-current')}
              />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className='space-y-3 pb-4'>
        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
          <Users className='size-4' />
          <span>
            {workspace.members.length}{' '}
            {workspace.members.length === 1 ? 'member' : 'members'}
          </span>
        </div>

        <div className='flex -space-x-2'>
          {displayMembers.map((member) => (
            <Avatar key={member.id} className='size-8'>
              {member.avatarUrl && <AvatarImage src={member.avatarUrl} />}
              <AvatarFallback>{getInitials(member.fullName)}</AvatarFallback>
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
        <Button className='w-full' onClick={() => onOpen?.(workspace)}>
          Open Workspace
        </Button>
      </CardFooter>
    </Card>
  );
}
