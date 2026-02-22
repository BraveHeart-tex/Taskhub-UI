import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { createCard } from './card.api';

export function useCreateCard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCard,
    // TODO: Implement optimistic update
    onSettled: (data, _error, variables) => {
      if (data?.ok) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.boards.content(variables.boardId),
        });
      }
    },
  });
}
