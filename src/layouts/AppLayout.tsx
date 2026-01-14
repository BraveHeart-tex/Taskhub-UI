import { Link, Outlet } from '@tanstack/react-router';
import { ModeToggle } from '@/components/mode-toggle';

export function AppLayout() {
  return (
    <>
      <header className='p-2 flex justify-between'>
        <Link to='/'>Home</Link>
        <ModeToggle />
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
