import type {
  ForbiddenError,
  NotFoundError,
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
  listWorkspaceMembersResponseSchema,
  type WorkspaceMemberDto,
} from './workspace-member.schema';

type ListWorkspaceMembersError =
  | UnauthorizedError
  | ValidationFailedError
  | UnexpectedError
  | NotFoundError
  | ForbiddenError;

export async function listWorkspaceMembers(
  workspaceId: string
): Promise<Result<WorkspaceMemberDto[], ListWorkspaceMembersError>> {
  const res = await httpClient.get<WorkspaceMemberDto[]>(
    endpoints.workspaces.members.list(workspaceId)
  );

  if (!res.ok) {
    if (res.error.type === 'HttpError') {
      if (res.error.status === HttpStatus.UNAUTHORIZED) {
        return Err({ type: 'Unauthorized' });
      }
      if (res.error.status === HttpStatus.FORBIDDEN) {
        return Err({ type: 'Forbidden' });
      }
      if (res.error.status === HttpStatus.NOT_FOUND) {
        return Err({ type: 'NotFound' });
      }
    }

    return Err({ type: 'Unexpected' });
  }

  const parsed = parseWithSchema(
    listWorkspaceMembersResponseSchema,
    res.value,
    () => ({ type: 'ValidationFailed' }) as const
  );

  if (!parsed.ok) {
    return parsed;
  }

  return Ok(parsed.value);
}
