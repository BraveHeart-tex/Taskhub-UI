import { z } from 'zod';
import {
  MAX_FULL_NAME_LENGTH,
  MIN_FULL_NAME_LENGTH,
} from './workspace-member.constants';

export const workspaceMemberSchema = z.object({
  workspaceId: z.uuid(),
  user: z.object({
    id: z.uuid(),
    email: z.email(),
    fullName: z
      .string()
      .trim()
      .min(MIN_FULL_NAME_LENGTH)
      .max(MAX_FULL_NAME_LENGTH),
  }),
  role: z.literal('owner').or(z.literal('admin')).or(z.literal('member')),
  joinedAt: z.iso.datetime(),
});

export const listWorkspaceMembersResponseSchema = z.array(
  workspaceMemberSchema
);

export type WorkspaceMember = z.infer<typeof workspaceMemberSchema>;
