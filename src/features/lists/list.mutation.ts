import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { createList } from './list.api';

export function useCreateList() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createList,
    onSuccess: (result, variables) => {
      if (result.ok) {
        qc.invalidateQueries({
          queryKey: queryKeys.boards.lists(variables.boardId),
        });
      }
    },
  });
}
