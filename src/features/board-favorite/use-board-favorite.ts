import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { optimisticallyUpdateFavorite } from './board-favorite.optimistic';

type MutationFn = (boardId: string) => Promise<unknown>;

export function createFavoriteMutation(
  mutationFn: MutationFn,
  action: 'add' | 'remove'
) {
  return function useBoardFavorite() {
    const queryClient = useQueryClient();
    const queryKey = queryKeys.me.dashboard();

    return useMutation({
      mutationFn,
      onMutate: async (boardId) => {
        await queryClient.cancelQueries({ queryKey });

        return optimisticallyUpdateFavorite(queryClient, boardId, action);
      },
      onError: (_err, _boardId, ctx) => {
        queryClient.setQueryData(queryKey, ctx?.previous);
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey });
      },
    });
  };
}
