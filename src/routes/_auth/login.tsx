import { createFileRoute } from '@tanstack/react-router';
import { LoginForm } from '@/features/auth/components/login-form';

export const Route = createFileRoute('/_auth/login')({
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className='min-h-screen grid place-items-center'>
      <LoginForm />
    </div>
  );
}
