import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/shared/theme/theme-provider';
import { queryClient } from './query-client';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>
  );
}
