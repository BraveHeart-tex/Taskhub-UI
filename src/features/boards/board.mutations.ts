import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { createBoard } from './board.api';

export const useCreateBoard = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createBoard,
    onSuccess: (result) => {
      if (result.ok) {
        qc.invalidateQueries({
          queryKey: queryKeys.workspaces.boards(result.value.workspaceId),
        });
      }
    },
  });
};
