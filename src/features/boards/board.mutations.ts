import {
  type UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import type { Dashboard } from '../dashboard/dashboard.schema';
import {
  createBoard,
  type UpdateBoardTitleError,
  updateBoardTitle,
} from './board.api';
import type { BoardContext } from './board.schema';

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

export const useUpdateBoardTitle = (
  options?: Exclude<
    UseMutationOptions<
      Awaited<ReturnType<typeof updateBoardTitle>>,
      UpdateBoardTitleError,
      Parameters<typeof updateBoardTitle>[0],
      {
        previousBoard: BoardContext | undefined;
        previousDashboard: Dashboard | undefined;
      }
    >,
    'mutationFn'
  >
) => {
  return useMutation({
    mutationFn: updateBoardTitle,
    ...options,
  });
};
