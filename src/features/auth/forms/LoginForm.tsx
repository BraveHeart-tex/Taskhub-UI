import { useForm } from '@tanstack/react-form';
import { Link } from '@tanstack/react-router';
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
import { loginInputSchema } from '../schemas';

export const LoginForm = () => {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: loginInputSchema,
    },
    onSubmit: async ({ value }) => {
      alert(JSON.stringify(value, null, 2));
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
      </CardContent>
      <CardFooter className='flex flex-col gap-4'>
        <Button type='submit' form='login-form' className='w-full'>
          Login
        </Button>
        <p className='text-center text-sm text-muted-foreground'>
          {"Don't have an account? "}
          <Link
            to='/signup'
            className='underline underline-offset-4 hover:text-foreground'
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
