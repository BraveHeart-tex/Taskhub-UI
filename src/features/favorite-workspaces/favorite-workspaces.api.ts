import type {
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
  UnexpectedError,
  ValidationFailedError,
} from '@/lib/api-error/common-api-errors';
import { endpoints } from '@/lib/endpoints';
import { httpClient } from '@/lib/http/http-client';
import { HttpStatus } from '@/lib/http/http-status';
import { Err, Ok, type Result } from '@/lib/result';
import { parseWithSchema } from '@/lib/validation/parse-with-schema';
import {
  type GetFavoriteWorkspacesResponse,
  getFavoriteWorkspacesResponseSchema,
} from './favorite-workspaces.schema';

type GetFavoriteWorkspacesError =
  | UnauthenticatedError
  | NotFoundError
  | UnexpectedError
  | UnauthorizedError
  | ValidationFailedError;

export async function getFavoriteWorkspaces(): Promise<
  Result<GetFavoriteWorkspacesResponse, GetFavoriteWorkspacesError>
> {
  const res = await httpClient.get<GetFavoriteWorkspacesResponse>(
    endpoints.me.favoriteWorkspaces.list
  );

  if (!res.ok) {
    if (res.error.type === 'HttpError') {
      if (res.error.status === HttpStatus.UNAUTHORIZED) {
        return Err({ type: 'Unauthorized' });
      }
    }

    return Err({ type: 'Unexpected' });
  }

  const parsed = parseWithSchema(
    getFavoriteWorkspacesResponseSchema,
    res.value,
    () => ({ type: 'ValidationFailed' }) as const
  );

  if (!parsed.ok) {
    return parsed;
  }

  return Ok(parsed.value);
}
