import { z } from 'zod';
import {
  MAX_BOARD_NAME_LENGTH,
  MIN_BOARD_NAME_LENGTH,
} from './boards.constants';

export const boardSchema = z.object({
  id: z.uuid(),
  workspaceId: z.uuid(),
  title: z.string().min(MIN_BOARD_NAME_LENGTH).max(MAX_BOARD_NAME_LENGTH),
  createdBy: z.uuid(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type Board = z.infer<typeof boardSchema>;

export const createBoardInputSchema = z.object({
  title: z.string().min(MIN_BOARD_NAME_LENGTH).max(MAX_BOARD_NAME_LENGTH),
});

export const boardPreviewSchema = z.object({
  id: z.uuid(),
  title: z.string().min(MIN_BOARD_NAME_LENGTH).max(MAX_BOARD_NAME_LENGTH),
  workspaceId: z.uuid(),
  isCurrentUserOwner: z.boolean(),
  memberCount: z.number().min(0),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type BoardPreview = z.infer<typeof boardPreviewSchema>;

export const workspaceBoardPreviewResponseSchema = z.array(boardPreviewSchema);

export const boardContextSchema = z.object({
  id: z.uuid(),
  title: z.string().min(MIN_BOARD_NAME_LENGTH).max(MAX_BOARD_NAME_LENGTH),
  workspaceId: z.uuid(),
  myRole: z.enum(['owner', 'member']),
  permissions: z.object({
    canEditBoard: z.boolean(),
    canDeleteBoard: z.boolean(),
    canManageMembers: z.boolean(),
  }),
});

export type BoardContext = z.infer<typeof boardContextSchema>;
