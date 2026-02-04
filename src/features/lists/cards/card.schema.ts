import { z } from 'zod';
import {
  MAX_CARD_DESCRIPTION_LENGTH,
  MAX_CARD_TITLE_LENGTH,
  MIN_CARD_TITLE_LENGTH,
} from './card.constants';

export const createCardFormSchema = z.object({
  title: z
    .string()
    .min(2, 'Title must be at least 2 characters long')
    .max(100, 'Title must be at most 100 characters long'),
});

export const cardDtoSchema = z.object({
  id: z.uuid(),
  title: z
    .string()
    .trim()
    .min(MIN_CARD_TITLE_LENGTH)
    .max(MAX_CARD_TITLE_LENGTH),
  description: z.string().trim().max(MAX_CARD_DESCRIPTION_LENGTH).nullable(),
  listId: z.uuid(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  position: z.string(),
});

export type CardDto = z.infer<typeof cardDtoSchema>;
