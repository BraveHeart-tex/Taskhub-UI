import { z } from 'zod';

export const getFavoriteWorkspacesResponseSchema = z.array(z.uuid());

export type GetFavoriteWorkspacesResponse = z.infer<
  typeof getFavoriteWorkspacesResponseSchema
>;
