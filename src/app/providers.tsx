import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { ThemeProvider } from '@/shared/theme/theme-provider';
import { queryClient } from './query-client';
import { router } from './router';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} context={{ queryClient }} />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
