import { z } from 'zod';
import {
  MAX_BOARD_NAME_LENGTH,
  MIN_BOARD_NAME_LENGTH,
} from './boards.constants';

export const workspaceBoardPreviewSchema = z.object({
  id: z.uuid(),
  title: z.string().min(MIN_BOARD_NAME_LENGTH).max(MAX_BOARD_NAME_LENGTH),
  workspaceId: z.uuid(),
  isCurrentUserOwner: z.boolean(),
  memberCount: z.number().min(0),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type WorkspaceBoardPreview = z.infer<typeof workspaceBoardPreviewSchema>;

export const workspaceBoardPreviewResponseSchema = z.array(
  workspaceBoardPreviewSchema
);
