import { z } from 'zod';

export const createListFormSchema = z.object({
  title: z
    .string()
    .min(2, 'Title must be at least 2 characters long')
    .max(100, 'Title must be at most 100 characters long'),
});

export const listSchema = z.object({
  id: z.uuid(),
  boardId: z.uuid(),
  title: z.string().min(2).max(100),
  position: z.string(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export type ListDto = z.infer<typeof listSchema>;
