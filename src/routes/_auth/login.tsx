import { createFileRoute } from '@tanstack/react-router';
import { LoginForm } from '@/features/auth/forms/LoginForm';

export const Route = createFileRoute('/_auth/login')({
  component: LoginComponent,
});

function LoginComponent() {
  return (
    <div className='min-h-screen grid place-items-center'>
      <LoginForm />
    </div>
  );
}
