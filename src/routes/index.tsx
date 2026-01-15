import { createFileRoute, isRedirect, redirect } from '@tanstack/react-router';
import { getMe } from '@/features/auth/api';

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    try {
      const user = await getMe();

      if (user) {
        throw redirect({ to: '/boards' });
      }
      throw redirect({ to: '/login' });
    } catch (error) {
      if (isRedirect(error)) {
        throw error;
      }

      throw redirect({ to: '/login', search: { redirect: location.href } });
    }
  },
});
