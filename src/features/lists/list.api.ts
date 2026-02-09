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
import { type ListDto, listSchema } from './list.schema';
import type { ListRouteParams } from './list.types';

type CreateListError =
  | UnauthenticatedError
  | NotFoundError
  | UnexpectedError
  | UnauthorizedError
  | ValidationFailedError;

export async function createList({
  title,
  workspaceId,
  boardId,
}: {
  title: string;
  workspaceId: string;
  boardId: string;
}): Promise<Result<ListDto, CreateListError>> {
  const res = await httpClient.post<ListDto>(
    endpoints.workspaces.lists.create({ workspaceId, boardId }),
    { title }
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
    listSchema,
    res.value,
    () => ({ type: 'ValidationFailed' }) as const
  );

  if (!parsed.ok) {
    return parsed;
  }

  return Ok(parsed.value);
}

export type UpdateListTitleError =
  | UnauthenticatedError
  | NotFoundError
  | UnexpectedError
  | UnauthorizedError
  | ValidationFailedError;

export async function updateListTitle({
  title,
  listId,
  boardId,
  workspaceId,
}: ListRouteParams & { title: string }): Promise<
  Result<void, UpdateListTitleError>
> {
  const res = await httpClient.patch(
    endpoints.workspaces.lists.update({
      workspaceId,
      boardId,
      listId,
    }),
    { title }
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
