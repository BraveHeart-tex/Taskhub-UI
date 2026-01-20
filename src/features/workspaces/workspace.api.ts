import { endpoints } from '@/lib/endpoints';
import { httpClient } from '@/lib/http/http-client';
import { Err, Ok, type Result } from '@/lib/result';
import { parseWithSchema } from '@/lib/validation/parse-with-schema';
import {
  type CreateWorkspaceDto,
  type WorkspaceSummaryDto,
  workspaceListSchema,
} from './workspace.schemas';

type ListWorkspacesError =
  | { type: 'Unauthenticated' }
  | { type: 'ValidationFailed' }
  | { type: 'Unexpected' };

export async function listWorkspaces(): Promise<
  Result<WorkspaceSummaryDto[], ListWorkspacesError>
> {
  const res = await httpClient.get<unknown>(endpoints.workspaces.list);

  if (!res.ok) {
    if (res.error.type === 'HttpError') {
      if (res.error.status === 401) {
        return Err({ type: 'Unauthenticated' });
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
