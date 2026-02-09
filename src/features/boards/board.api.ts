import { API_ERROR_CODES, isApiErrorPayload } from '@/lib/api-error';
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
  type Board,
  type BoardContent,
  type BoardContext,
  type BoardPreview,
  boardContentSchema,
  boardContextSchema,
  boardSchema,
  workspaceBoardPreviewResponseSchema,
} from './board.schema';
import type { BoardRouteParams } from './board.types';

type ListBoardsForWorkspaceError =
  | UnauthenticatedError
  | NotFoundError
  | UnexpectedError
  | UnauthorizedError
  | ValidationFailedError;

export async function listBoardsForWorkspace(
  workspaceId: string
): Promise<Result<BoardPreview[], ListBoardsForWorkspaceError>> {
  const res = await httpClient.get<BoardPreview[]>(
    endpoints.workspaces.boards.list(workspaceId)
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
    workspaceBoardPreviewResponseSchema,
    res.value,
    () => ({ type: 'ValidationFailed' }) as const
  );

  if (!parsed.ok) {
    return parsed;
  }

  return Ok(parsed.value);
}

type CreateBoardError =
  | UnauthenticatedError
  | NotFoundError
  | UnexpectedError
  | UnauthorizedError
  | ValidationFailedError
  | { type: 'DuplicateTitle' };

export async function createBoard(values: {
  workspaceId: string;
  title: string;
}): Promise<Result<Board, CreateBoardError>> {
  const res = await httpClient.post<Board>(
    endpoints.workspaces.boards.create(values.workspaceId),
    { title: values.title }
  );

  if (!res.ok) {
    if (res.error.type === 'HttpError') {
      if (
        res.error.status === HttpStatus.CONFLICT &&
        isApiErrorPayload(res.error.body) &&
        res.error.body.error.code ===
          API_ERROR_CODES.BOARD.BOARD_TITLE_ALREADY_EXISTS
      ) {
        return Err({ type: 'DuplicateTitle' });
      }
      if (res.error.status === HttpStatus.UNAUTHORIZED) {
        return Err({ type: 'Unauthorized' });
      }
    }

    return Err({ type: 'Unexpected' });
  }

  const parsed = parseWithSchema(
    boardSchema,
    res.value,
    () => ({ type: 'ValidationFailed' }) as const
  );

  if (!parsed.ok) {
    return parsed;
  }

  return Ok(res.value);
}

type GetBoardContextError =
  | UnauthenticatedError
  | { type: 'BoardMemberNotFound' }
  | UnexpectedError
  | UnauthorizedError
  | ValidationFailedError;

export async function getBoardContext({
  workspaceId,
  boardId,
}: BoardRouteParams): Promise<Result<BoardContext, GetBoardContextError>> {
  const res = await httpClient.get<BoardContext>(
    endpoints.workspaces.boards.get({ boardId, workspaceId })
  );

  if (!res.ok) {
    if (res.error.type === 'HttpError') {
      if (res.error.status === HttpStatus.UNAUTHORIZED) {
        return Err({ type: 'Unauthorized' });
      }
      if (res.error.status === HttpStatus.NOT_FOUND) {
        return Err({ type: 'BoardMemberNotFound' });
      }
    }
    return Err({ type: 'Unexpected' });
  }

  const parsed = parseWithSchema(
    boardContextSchema,
    res.value,
    () => ({ type: 'ValidationFailed' }) as const
  );

  if (!parsed.ok) {
    return parsed;
  }

  return Ok(res.value);
}

type GetBoardContentError =
  | UnauthenticatedError
  | { type: 'BoardMemberNotFound' }
  | UnexpectedError
  | UnauthorizedError
  | ValidationFailedError;

export async function getBoardContent({
  workspaceId,
  boardId,
}: BoardRouteParams): Promise<Result<BoardContent, GetBoardContentError>> {
  const res = await httpClient.get<BoardContent>(
    endpoints.workspaces.boards.content({ boardId, workspaceId })
  );

  if (!res.ok) {
    if (res.error.type === 'HttpError') {
      if (res.error.status === HttpStatus.UNAUTHORIZED) {
        return Err({ type: 'Unauthorized' });
      }
      if (res.error.status === HttpStatus.NOT_FOUND) {
        return Err({ type: 'BoardMemberNotFound' });
      }
    }
    return Err({ type: 'Unexpected' });
  }

  const parsed = parseWithSchema(
    boardContentSchema,
    res.value,
    () => ({ type: 'ValidationFailed' }) as const
  );

  if (!parsed.ok) {
    return parsed;
  }

  return Ok(res.value);
}

export type UpdateBoardTitleError =
  | UnauthenticatedError
  | { type: 'BoardTitleAlreadyExists' }
  | UnexpectedError
  | UnauthorizedError
  | ValidationFailedError;

export async function updateBoardTitle({
  title,
  boardId,
  workspaceId,
}: {
  title: string;
  boardId: string;
  workspaceId: string;
}): Promise<Result<void, UpdateBoardTitleError>> {
  const res = await httpClient.patch(
    endpoints.workspaces.boards.update({ workspaceId, boardId }),
    {
      title,
    }
  );

  if (!res.ok) {
    if (res.error.type === 'HttpError') {
      if (res.error.status === HttpStatus.UNAUTHORIZED) {
        return Err({ type: 'Unauthorized' });
      }
      if (res.error.status === HttpStatus.CONFLICT) {
        return Err({ type: 'BoardTitleAlreadyExists' });
      }
    }
    return Err({ type: 'Unexpected' });
  }

  return Ok(undefined);
}
