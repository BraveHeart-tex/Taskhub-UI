import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { unwrapResult } from '@/lib/result';
import { getFavoriteWorkspaces } from './favorite-workspaces.api';

export function useFavoriteWorkspaces() {
  return useQuery({
    queryKey: queryKeys.me.favoriteWorkspaces(),
    queryFn: async () => {
      const result = await getFavoriteWorkspaces();
      return unwrapResult(result);
    },
  });
}
