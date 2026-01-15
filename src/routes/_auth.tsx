import {
  createFileRoute,
  isRedirect,
  Outlet,
  redirect,
} from '@tanstack/react-router';
import { getMe } from '@/features/auth/api';

export const Route = createFileRoute('/_auth')({
  beforeLoad: async () => {
    try {
      const user = await getMe();
      if (user) {
        throw redirect({ to: '/boards' });
      }
    } catch (error) {
      if (isRedirect(error)) {
        throw error;
      }
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
