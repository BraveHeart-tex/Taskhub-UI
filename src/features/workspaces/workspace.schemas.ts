import { z } from 'zod';

export const workspaceSummarySchema = z.object({
  id: z.uuid(),
  name: z.string(),
  ownerId: z.uuid(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  isCurrentUserOwner: z.boolean(),
  memberCount: z.number().min(1),
  membersPreview: z.array(
    z.object({
      id: z.uuid(),
      name: z.string().min(2).max(100),
    })
  ),
});

export const workspaceListSchema = z.array(workspaceSummarySchema);

export const createWorkspaceInputSchema = z.object({
  name: z.string().min(2).max(100),
});

export type CreateWorkspaceDto = z.infer<typeof createWorkspaceInputSchema>;
export type WorkspaceSummaryDto = z.infer<typeof workspaceSummarySchema>;
