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

type AddFavoriteBoardError =
  | UnauthenticatedError
  | NotFoundError
  | UnexpectedError
  | UnauthorizedError
  | ValidationFailedError;
export async function addFavoriteBoard(
  boardId: string
): Promise<Result<undefined, AddFavoriteBoardError>> {
  const res = await httpClient.post<void>(
    endpoints.me.favoriteBoards.add(boardId)
  );

  if (!res.ok) {
    if (res.error.type === 'HttpError') {
      if (res.error.status === HttpStatus.UNAUTHORIZED) {
        return Err({ type: 'Unauthorized' });
      }
    }

    return Err({ type: 'Unexpected' });
  }

  return Ok(undefined);
}

type RemoveFavoriteBoardError =
  | UnauthenticatedError
  | NotFoundError
  | UnexpectedError
  | UnauthorizedError
  | ValidationFailedError;
export async function removeFavoriteBoard(
  boardId: string
): Promise<Result<undefined, RemoveFavoriteBoardError>> {
  const res = await httpClient.delete<void>(
    endpoints.me.favoriteBoards.remove(boardId)
  );

  if (!res.ok) {
    if (res.error.type === 'HttpError') {
      if (res.error.status === HttpStatus.UNAUTHORIZED) {
        return Err({ type: 'Unauthorized' });
      }
    }

    return Err({ type: 'Unexpected' });
  }

  return Ok(undefined);
}
