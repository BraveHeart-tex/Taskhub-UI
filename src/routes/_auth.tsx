import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { getMe } from '@/features/auth/api';

export const Route = createFileRoute('/_auth')({
  beforeLoad: async () => {
    const user = await getMe();
    if (user) {
      throw redirect({ to: '/boards' });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div>
      <div>This is the auth container lol</div>
      <Outlet />
    </div>
  );
}
