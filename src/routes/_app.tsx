import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { getMe } from '@/features/auth/api';

export const Route = createFileRoute('/_app')({
  beforeLoad: async () => {
    const user = await getMe();
    if (!user) {
      throw redirect({ to: '/login' });
    }

    return { user };
  },
  component: AppLayout,
});

function AppLayout() {
  return (
    <div>
      <nav>App Navigation</nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
