import { useLoaderData, useRouter } from '@tanstack/react-router';
import { BadgeCheckIcon, LogOutIcon, SettingsIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLogout } from '@/features/auth/auth.mutations';
import { mockAvatarUrl } from '@/lib/utils';
import { Caption, Small } from './ui/typography';

export function UserMenu() {
  const user = useLoaderData({ from: '/_app' }).user;
  const logoutMutation = useLogout();
  const router = useRouter();

  const handleLogout = async () => {
    const result = await logoutMutation.mutateAsync();
    if (result.ok) {
      await router.invalidate();
    }
  };

  const avatarUrl = mockAvatarUrl(user.id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className='rounded-lg'>
          <AvatarImage src={avatarUrl} alt={user.fullName} />
          <AvatarFallback className='rounded-lg'>BK</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-64 rounded-xl p-2'
        align='end'
        sideOffset={8}
      >
        <div className='flex items-center gap-3 px-2 py-2'>
          <Avatar className='h-9 w-9 rounded-lg'>
            <AvatarImage src={avatarUrl} alt={user.fullName} />
            <AvatarFallback className='rounded-lg'>BK</AvatarFallback>
          </Avatar>

          <div className='flex-1 leading-tight'>
            <Small className='truncate'>{user.fullName}</Small>
            <Caption className='truncate text-muted-foreground'>
              {user.email}
            </Caption>
          </div>
        </div>

        <DropdownMenuSeparator className='my-2' />

        <div className='px-2 py-1'>
          <Caption className='uppercase tracking-wide text-muted-foreground'>
            Account
          </Caption>
        </div>

        <DropdownMenuItem className='gap-2'>
          <BadgeCheckIcon className='h-4 w-4' />
          <span>Account</span>
        </DropdownMenuItem>

        <DropdownMenuItem className='gap-2'>
          <SettingsIcon className='h-4 w-4' />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className='my-2' />

        <DropdownMenuItem onClick={handleLogout} className='gap-2'>
          <LogOutIcon className='h-4 w-4' />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
