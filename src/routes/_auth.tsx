import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { getMe } from '@/features/auth/auth.api';

export const Route = createFileRoute('/_auth')({
  beforeLoad: async () => {
    const result = await getMe();

    if (result.ok && result.value !== null) {
      throw redirect({ to: '/workspaces' });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
