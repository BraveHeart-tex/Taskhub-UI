import { z } from 'zod';
import { MAX_USER_NAME_LENGTH, MIN_USER_NAME_LENGTH } from './user.constants';

export const userSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  createdAt: z.iso.datetime(),
  fullName: z.string().min(MIN_USER_NAME_LENGTH).max(MAX_USER_NAME_LENGTH),
});

export type User = z.infer<typeof userSchema>;
