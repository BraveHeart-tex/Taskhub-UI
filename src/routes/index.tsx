import { createFileRoute, redirect } from '@tanstack/react-router';
import { getMe } from '@/features/auth/api';

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    const user = await getMe();

    if (user) {
      throw redirect({ to: '/boards' });
    }
    throw redirect({ to: '/login' });
  },
});
