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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useSignup } from '../mutations';
import { signupInputSchema } from '../schemas';

export const SignupForm = () => {
  const signupMutate = useSignup();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
    },
    validators: {
      onChange: signupInputSchema,
      onSubmitAsync: async ({ value }) => {
        const result = await signupMutate.mutateAsync(value);
        if (result.ok) {
          // TODO: show success toast here
          await router.navigate({
            to: '/',
          });
          return;
        }

        if (result.error.type === 'EmailAlreadyExists') {
          return {
            fields: {
              email: 'Email already exists',
            },
          };
        }
      },
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
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id='signup-form' onSubmit={onSubmit}>
          <FieldGroup>
            <form.Field name='fullName'>
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type='text'
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder='John Doe'
                      autoComplete='name'
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
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
                      placeholder='Create a password'
                      autoComplete='new-password'
                    />
                    <FieldDescription>
                      Must be at least 8 characters with uppercase, lowercase,
                      and numbers.
                    </FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className='flex flex-col gap-4'>
        <Button
          type='submit'
          form='signup-form'
          className='w-full'
          disabled={signupMutate.isPending}
        >
          {signupMutate.isPending && <Loader2 className='animate-spin' />}
          {signupMutate.isPending ? 'Creating account...' : 'Create account'}
        </Button>
        <p className='text-center text-sm text-muted-foreground'>
          {'Already have an account? '}
          <Link
            to='/login'
            className='underline underline-offset-4 hover:text-foreground'
            disabled={signupMutate.isPending}
          >
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
