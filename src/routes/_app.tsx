import { createFileRoute, redirect } from '@tanstack/react-router';
import { AppLayout } from '@/components/app-layout';
import { getMe } from '@/features/auth/auth.api';

export const Route = createFileRoute('/_app')({
  beforeLoad: async () => {
    const result = await getMe();
    if (!result.ok) {
      throw redirect({ to: '/login', search: { redirect: location.pathname } });
    }

    if (result.value === null) {
      throw redirect({ to: '/login', search: { redirect: location.pathname } });
    }

    return { user: result.value };
  },
  loader: ({ context }) => {
    return { user: context.user };
  },
  component: AppRoute,
});

function AppRoute() {
  return <AppLayout />;
}
