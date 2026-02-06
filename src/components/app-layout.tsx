import { Link, Outlet } from '@tanstack/react-router';
import { SquareKanbanIcon } from 'lucide-react';
import { ModeSwitch } from '@/components/mode-switch';
import { Large } from '@/components/ui/typography';
import { UserMenu } from '@/components/user-menu';

export function AppLayout() {
  return (
    <div className='fixed inset-0 flex flex-col overflow-hidden'>
      <header className='flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4'>
        <Link to='/boards' className='flex items-center gap-2 select-none'>
          <SquareKanbanIcon className='size-5' />
          <Large className='tracking-tight leading-none'>Taskhub</Large>
        </Link>
        <div className='ml-auto flex items-center gap-2'>
          <UserMenu />
          <ModeSwitch />
        </div>
      </header>
      <main className='flex-1 min-h-0 p-4'>
        <Outlet />
      </main>
    </div>
  );
}
