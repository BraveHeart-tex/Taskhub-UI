import { createFileRoute, redirect } from '@tanstack/react-router';
import { getMe } from '@/features/auth/auth.api';

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    const result = await getMe();
    if (!result.ok) {
      throw redirect({ to: '/login', search: { redirect: location.pathname } });
    }

    if (result.value === null) {
      throw redirect({ to: '/login', search: { redirect: location.pathname } });
    }

    throw redirect({ to: '/workspaces' });
  },
});
