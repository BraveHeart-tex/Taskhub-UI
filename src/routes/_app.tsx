import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from '@tanstack/react-router';
import { SquareKanbanIcon } from 'lucide-react';
import { ModeSwitch } from '@/components/mode-switch';
import { Large } from '@/components/ui/typography';
import { UserMenu } from '@/components/user-menu';
import { getMe } from '@/features/auth/auth.api';

export const Route = createFileRoute('/_app')({
  beforeLoad: async () => {
    const result = await getMe();
    if (!result.ok) {
      throw redirect({ to: '/login', search: { redirect: location.pathname } });
    }

    if (result.value === null) {
      throw redirect({ to: '/login', search: { redirect: location.pathname } });
    }

    return { user: result.value };
  },
  loader: ({ context }) => {
    return { user: context.user };
  },
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className='h-screen flex flex-col overflow-hidden'>
      <header className='flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4'>
        <Link to='/' className='flex items-center gap-2 select-none'>
          <SquareKanbanIcon className='size-5' />
          <Large className='tracking-tight leading-none'>Taskhub</Large>
        </Link>
        <div className='ml-auto flex items-center gap-2'>
          <UserMenu />
          <ModeSwitch />
        </div>
      </header>

      <div className='flex flex-1 min-h-0'>
        <main className='h-full overflow-y-auto p-4 flex-1 min-h-0'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
