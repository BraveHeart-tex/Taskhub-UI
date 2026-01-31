import { z } from 'zod';
import {
  MAX_BOARD_NAME_LENGTH,
  MIN_BOARD_NAME_LENGTH,
} from '../boards/boards.constants';
import {
  MAX_USER_NAME_LENGTH,
  MIN_USER_NAME_LENGTH,
} from '../users/user.constants';
import {
  MAX_WORKSPACE_NAME_LENGTH,
  MIN_WORKSPACE_NAME_LENGTH,
} from './workspace.constants';

const workspaceSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  ownerId: z.uuid(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const workspaceSummarySchema = workspaceSchema.extend({
  isCurrentUserOwner: z.boolean(),
  memberCount: z.number().min(1),
  membersPreview: z.array(
    z.object({
      id: z.uuid(),
      name: z.string().min(MIN_USER_NAME_LENGTH).max(MAX_USER_NAME_LENGTH),
    })
  ),
});

export const workspaceListSchema = z.array(workspaceSummarySchema);

export const createWorkspaceInputSchema = z.object({
  name: z
    .string()
    .min(MIN_WORKSPACE_NAME_LENGTH)
    .max(MAX_WORKSPACE_NAME_LENGTH),
});

export type CreateWorkspaceDto = z.infer<typeof createWorkspaceInputSchema>;
export type WorkspaceSummaryDto = z.infer<typeof workspaceSummarySchema>;

export const workspaceContextResponseSchema = workspaceSchema.extend({
  role: z.enum(['owner', 'member']),
  isCurrentUserOwner: z.boolean(),
});

export type WorkspaceContextDto = z.infer<
  typeof workspaceContextResponseSchema
>;

export const workspaceSummaryWithRecentBoardsSchema = workspaceSchema.extend({
  recentBoards: z.array(
    z.object({
      id: z.uuid(),
      title: z.string().min(MIN_BOARD_NAME_LENGTH).max(MAX_BOARD_NAME_LENGTH),
      updatedAt: z.iso.datetime(),
    })
  ),
  membersPreview: z.array(
    z.object({
      id: z.uuid(),
      name: z.string().min(MIN_USER_NAME_LENGTH).max(MAX_USER_NAME_LENGTH),
      avatarUrl: z.url().nullable().optional(),
    })
  ),
  isCurrentUserOwner: z.boolean(),
  memberCount: z.number().min(1),
});

export type WorkspaceSummaryWithRecentBoardsDto = z.infer<
  typeof workspaceSummaryWithRecentBoardsSchema
>;
