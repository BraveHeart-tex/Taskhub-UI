import { useForm } from '@tanstack/react-form';
import { Link, useRouter } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { usePreviousLocation } from '@/lib/hooks/use-previous-location';
import { showErrorToast } from '@/shared/toast-helpers';
import { useLogin } from '../auth.mutations';
import { loginInputSchema } from '../auth.schemas';

interface LoginFormProps {
  redirectTo?: string;
}

export const LoginForm = ({ redirectTo }: LoginFormProps) => {
  const loginMutation = useLogin();
  const router = useRouter();
  const previousLocation = usePreviousLocation();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: loginInputSchema,
    },
    onSubmit: async ({ value }) => {
      const result = await loginMutation.mutateAsync(value);

      if (!result.ok) {
        if (result.error.type === 'AlreadyLoggedIn') {
          await router.navigate({ to: '/' });
        } else if (result.error.type === 'Unexpected') {
          showErrorToast('An unexpected error occurred');
        }

        return;
      }

      await router.navigate({ to: redirectTo ?? previousLocation });
    },
    onSubmitInvalid: () => {
      const InvalidInput = document.querySelector(
        '[aria-invalid="true"]'
      ) as HTMLInputElement;

      InvalidInput?.focus();
    },
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    void form.handleSubmit();
  };

  return (
    <Card className='w-full sm:max-w-md'>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id='login-form' onSubmit={onSubmit}>
          <FieldGroup>
            <form.Field name='email'>
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type='email'
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder='you@example.com'
                      autoComplete='email'
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name='password'>
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type='password'
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder='Enter your password'
                      autoComplete='current-password'
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>
        </form>
        {loginMutation.data?.ok === false &&
          loginMutation.data.error.type === 'InvalidCredentials' && (
            <p className='mt-2 text-destructive text-sm'>
              Invalid email or password
            </p>
          )}
      </CardContent>
      <CardFooter className='flex flex-col gap-4'>
        <Button
          type='submit'
          form='login-form'
          className='w-full'
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending && <Loader2 className='animate-spin' />}
          {loginMutation.isPending ? 'Logging in...' : 'Login'}
        </Button>
        <p className='text-center text-sm text-muted-foreground'>
          {"Don't have an account? "}
          <Link
            to='/signup'
            className='underline underline-offset-4 hover:text-foreground'
            disabled={loginMutation.isPending}
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
