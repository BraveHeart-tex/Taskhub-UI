import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { AppErrorBoundary } from '@/components/app-error-boundary';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootLayout,
  errorComponent: ({ error }) => <AppErrorBoundary error={error} />,
});

function RootLayout() {
  return (
    <>
      <Outlet />

      {import.meta.env.DEV && (
        <TanStackRouterDevtools position='bottom-right' />
      )}
    </>
  );
}
