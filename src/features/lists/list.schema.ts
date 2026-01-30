import { z } from 'zod';

export const createListFormSchema = z.object({
  title: z
    .string()
    .min(2, 'Title must be at least 2 characters long')
    .max(100, 'Title must be at most 100 characters long'),
});
