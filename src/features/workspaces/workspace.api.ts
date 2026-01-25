import type {
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
  type CreateWorkspaceDto,
  type WorkspaceContextDto,
  type WorkspaceSummaryDto,
  workspaceContextResponseSchema,
  workspaceListSchema,
} from './workspace.schemas';

type ListWorkspacesError =
  | UnauthorizedError
  | ValidationFailedError
  | UnexpectedError;

export async function listWorkspaces(): Promise<
  Result<WorkspaceSummaryDto[], ListWorkspacesError>
> {
  const res = await httpClient.get<WorkspaceSummaryDto[]>(
    endpoints.workspaces.list
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
    workspaceListSchema,
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

type CreateWorkspaceError =
  | { type: 'ValidationFailed' }
  | { type: 'Unexpected' };

export async function createWorkspace(
  input: CreateWorkspaceDto
): Promise<Result<WorkspaceSummaryDto, CreateWorkspaceError>> {
  const res = await httpClient.post<WorkspaceSummaryDto>(
    endpoints.workspaces.create,
    input
  );

  if (!res.ok) {
    return Err({ type: 'Unexpected' });
  }

  return Ok(res.value);
}

type GetWorkspaceError =
  | UnauthorizedError
  | NotFoundError
  | UnexpectedError
  | ValidationFailedError;

export async function getWorkspace(
  workspaceId: string
): Promise<Result<WorkspaceContextDto, GetWorkspaceError>> {
  const res = await httpClient.get<WorkspaceContextDto>(
    endpoints.workspaces.get(workspaceId)
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
    workspaceContextResponseSchema,
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
