import { createFileRoute } from '@tanstack/react-router';
import { SignupForm } from '@/features/auth/forms/SignupForm';

export const Route = createFileRoute('/_auth/signup')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='min-h-screen grid place-items-center'>
      <SignupForm />
    </div>
  );
}
