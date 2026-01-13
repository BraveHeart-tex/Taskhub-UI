import { ThemeProvider } from '@/shared/theme/theme-provider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
