import { createFileRoute } from '@tanstack/react-router';
import { SignupForm } from '@/features/auth/components/signup-form';

export const Route = createFileRoute('/_auth/signup')({
  component: SignUpPage,
});

function SignUpPage() {
  return (
    <div className='min-h-screen grid place-items-center'>
      <SignupForm />
    </div>
  );
}
