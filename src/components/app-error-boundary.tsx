import { useRouter } from '@tanstack/react-router';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type AppErrorBoundaryProps = {
  error: unknown;
};

export function AppErrorBoundary({ error }: AppErrorBoundaryProps) {
  const router = useRouter();

  return (
    <div className='flex min-h-[60vh] items-center justify-center p-6'>
      <Card className='w-full max-w-md'>
        <CardHeader className='flex flex-row items-center gap-3'>
          <AlertCircle className='h-6 w-6 text-destructive' />
          <CardTitle>Something went wrong</CardTitle>
        </CardHeader>

        <CardContent className='space-y-3'>
          <p className='text-sm text-muted-foreground'>
            An unexpected error occurred. Please try again.
          </p>

          {import.meta.env.DEV && (
            <pre className='max-h-40 overflow-auto rounded bg-muted p-2 text-xs'>
              {JSON.stringify(error, null, 2)}
            </pre>
          )}
        </CardContent>

        <CardFooter className='flex justify-end gap-2'>
          <Button variant='secondary' onClick={() => router.invalidate()}>
            Retry
          </Button>

          <Button
            variant='default'
            onClick={() => router.navigate({ to: '/workspaces' })}
          >
            Go to workspaces
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
