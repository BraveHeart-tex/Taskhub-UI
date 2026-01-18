import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { getMe } from '@/features/auth/auth.api';

export const Route = createFileRoute('/_app')({
  beforeLoad: async () => {
    const result = await getMe();
    if (!result.ok) {
      throw redirect({ to: '/login' });
    }

    if (result.value === null) {
      throw redirect({ to: '/login' });
    }

    return { user: result.value };
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
