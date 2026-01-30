import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/shared/theme/use-theme';

export function ModeSwitch() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const toggle = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      type='button'
      onClick={toggle}
      aria-label='Toggle theme'
      className={cn(
        'relative flex h-8 w-14 items-center rounded-full border bg-background p-1 transition-colors',
        'hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
      )}
    >
      <Sun className='absolute left-1.5 h-4 w-4 text-foreground/70' />
      <Moon className='absolute right-1.5 h-4 w-4 text-foreground/70' />

      <span
        className={cn(
          'h-6 w-6 rounded-full bg-foreground transition-transform',
          isDark ? 'translate-x-6' : 'translate-x-0'
        )}
      />
    </button>
  );
}
