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
import { type CardDto, cardDtoSchema } from './card.schema';

interface CreateCardInput {
  workspaceId: string;
  boardId: string;
  listId: string;
  title: string;
  description?: string;
}

type CreateCardError =
  | UnauthenticatedError
  | NotFoundError
  | UnexpectedError
  | UnauthorizedError
  | ValidationFailedError
  | { type: 'ListNotFound' }
  | { type: 'BoardMemberNotFound' };

export async function createCard({
  workspaceId,
  boardId,
  listId,
  title,
  description,
}: CreateCardInput): Promise<Result<CardDto, CreateCardError>> {
  const res = await httpClient.post<CardDto>(
    endpoints.workspaces.lists.cards.create({
      boardId,
      listId,
      workspaceId,
    }),
    {
      title,
      description,
    }
  );

  if (!res.ok) {
    if (res.error.type === 'HttpError') {
      if (res.error.status === HttpStatus.UNAUTHORIZED) {
        return Err({ type: 'Unauthorized' });
      }
      if (
        res.error.status === HttpStatus.NOT_FOUND &&
        isApiErrorPayload(res.error.body)
      ) {
        switch (res.error.body.error.code) {
          case API_ERROR_CODES.BOARD_MEMBER.BOARD_MEMBER_NOT_FOUND:
            return Err({ type: 'BoardMemberNotFound' });
          case API_ERROR_CODES.LIST.LIST_NOT_FOUND:
            return Err({ type: 'ListNotFound' });
          default:
            return Err({ type: 'Unexpected' });
        }
      }
    }

    return Err({ type: 'Unexpected' });
  }

  const parsed = parseWithSchema(
    cardDtoSchema,
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
