import { z } from 'zod';

export const workspaceSummarySchema = z.object({
  id: z.uuid(),
  name: z.string(),
  ownerId: z.uuid(),
  isCurrentUserOwner: z.boolean(),
});

export const workspaceListSchema = z.array(workspaceSummarySchema);

export type WorkspaceSummaryDto = z.infer<typeof workspaceSummarySchema>;
