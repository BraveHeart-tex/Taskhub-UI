import {
  type UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { type UnwrapResultReturn, unwrapResult } from '@/lib/result';
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
      if (!result.ok) return;

      qc.invalidateQueries({
        queryKey: queryKeys.workspaces.boards(result.value.workspaceId),
      });

      qc.invalidateQueries({
        queryKey: queryKeys.me.dashboard(),
      });
    },
  });
};

export const useUpdateBoardTitle = (
  options?: Exclude<
    UseMutationOptions<
      UnwrapResultReturn<ReturnType<typeof updateBoardTitle>>,
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
    mutationFn: async (variables) => {
      const result = await updateBoardTitle(variables);
      return unwrapResult(result);
    },
    ...options,
  });
};
