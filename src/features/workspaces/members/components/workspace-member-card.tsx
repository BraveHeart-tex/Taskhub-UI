import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { WorkspaceMember } from '../workspace-member.schema';

interface WorkspaceMemberCardProps {
  member: WorkspaceMember;
}

const roleLabel: Record<WorkspaceMember['role'], string> = {
  owner: 'Owner',
  admin: 'Admin',
  member: 'Member',
};

const roleVariant: Record<
  WorkspaceMember['role'],
  'default' | 'secondary' | 'outline'
> = {
  owner: 'default',
  admin: 'secondary',
  member: 'outline',
};

export function WorkspaceMemberCard({ member }: WorkspaceMemberCardProps) {
  const initials = member.user.fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card className='flex h-full flex-col items-center gap-3 p-4 text-center'>
      <Avatar className='h-12 w-12'>
        <AvatarFallback className='text-sm'>{initials}</AvatarFallback>
      </Avatar>

      <div className='space-y-0.5'>
        <div className='text-sm font-medium leading-tight'>
          {member.user.fullName}
        </div>
        <div className='text-xs text-muted-foreground truncate max-w-45'>
          {member.user.email}
        </div>
      </div>

      <Badge variant={roleVariant[member.role]}>{roleLabel[member.role]}</Badge>

      <div className='mt-auto text-xs text-muted-foreground'>
        Joined {new Date(member.joinedAt).toLocaleDateString()}
      </div>
    </Card>
  );
}
