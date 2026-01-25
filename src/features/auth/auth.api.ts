import type {
  UnauthenticatedError,
  UnexpectedError,
  ValidationFailedError,
} from '@/lib/api-error/common-api-errors';
import { isApiErrorPayload } from '@/lib/api-error/is-api-error-payload';
import { endpoints } from '@/lib/endpoints';
import { httpClient } from '@/lib/http/http-client';
import { HttpStatus } from '@/lib/http/http-status';
import { Err, Ok, type Result } from '@/lib/result';
import { parseWithSchema } from '@/lib/validation/parse-with-schema';
import { type SignupInput, type UserDto, userSchema } from './auth.schemas';

type AuthError =
  | UnauthenticatedError
  | ValidationFailedError
  | UnexpectedError
  | { type: 'InvalidCredentials' }
  | { type: 'AlreadyLoggedIn' }
  | { type: 'EmailAlreadyExists' };

export async function login(input: {
  email: string;
  password: string;
}): Promise<Result<void, AuthError>> {
  const res = await httpClient.post<void>(endpoints.auth.login, input);

  if (!res.ok) {
    if (res.error.type === 'HttpError') {
      switch (res.error.status) {
        case HttpStatus.BAD_REQUEST:
          return Err({ type: 'ValidationFailed' });
        case HttpStatus.UNAUTHORIZED:
          return Err({ type: 'InvalidCredentials' });
        case HttpStatus.CONFLICT:
          return Err({ type: 'AlreadyLoggedIn' });
      }
    }

    return Err({ type: 'Unexpected' });
  }

  return Ok(undefined);
}

export async function signup(
  input: SignupInput
): Promise<Result<UserDto, AuthError>> {
  const res = await httpClient.post<unknown>(endpoints.auth.signup, input);

  if (!res.ok) {
    if (res.error.type === 'HttpError') {
      if (
        res.error.status === HttpStatus.CONFLICT &&
        isApiErrorPayload(res.error.body)
      ) {
        switch (res.error.body.error.code) {
          case 'ALREADY_AUTHENTICATED':
            return Err({ type: 'AlreadyLoggedIn' });

          case 'EMAIL_ALREADY_EXISTS':
            return Err({ type: 'EmailAlreadyExists' });

          default:
            return Err({ type: 'Unexpected' });
        }
      }
    }
    return Err({ type: 'Unexpected' });
  }

  const parsed = parseWithSchema(
    userSchema,
    res.value,
    () =>
      ({
        type: 'ValidationFailed',
      }) as const
  );

  if (!parsed.ok) {
    return parsed;
  }

  return Ok(parsed.value);
}

export async function logout(): Promise<Result<void, AuthError>> {
  const res = await httpClient.delete<void>(endpoints.auth.logout);

  if (!res.ok) {
    if (res.error.type === 'HttpError') {
      if (res.error.status === HttpStatus.UNAUTHORIZED) {
        return Err({ type: 'Unauthenticated' });
      }
    }

    return Err({ type: 'Unexpected' });
  }

  return Ok(undefined);
}

export async function getMe(): Promise<Result<UserDto | null, AuthError>> {
  const res = await httpClient.get<unknown>(endpoints.auth.me);

  if (!res.ok) {
    if (res.error.type === 'HttpError') {
      if (res.error.status === HttpStatus.UNAUTHORIZED) {
        return Ok(null);
      }
    }

    return Err({ type: 'Unexpected' });
  }

  if (!res.value) {
    return Ok(null);
  }

  const parsed = parseWithSchema(
    userSchema,
    res.value,
    () => ({ type: 'ValidationFailed' }) as const
  );

  if (!parsed.ok) {
    return parsed;
  }

  return Ok(parsed.value);
}
