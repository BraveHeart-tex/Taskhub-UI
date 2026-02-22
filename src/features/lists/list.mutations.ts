import {
  type UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { type UnwrapResultReturn, unwrapResult } from '@/lib/result';
import type { BoardContent } from '../boards/board.schema';
import {
  createList,
  type MoveListError,
  moveList,
  type UpdateListTitleError,
  updateListTitle,
} from './list.api';

export function useCreateList() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createList,
    onSuccess: (result, variables) => {
      if (result.ok) {
        qc.invalidateQueries({
          queryKey: queryKeys.boards.content(variables.boardId),
        });
      }
    },
  });
}

export function useUpdateListTitle(
  options?: Exclude<
    UseMutationOptions<
      UnwrapResultReturn<ReturnType<typeof updateListTitle>>,
      UpdateListTitleError,
      Parameters<typeof updateListTitle>[0],
      {
        previousBoardContent: BoardContent | undefined;
      }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: async (variables) => {
      const result = await updateListTitle(variables);
      return unwrapResult(result);
    },
    ...options,
  });
}

export function useMoveList(
  options?: Exclude<
    UseMutationOptions<
      UnwrapResultReturn<ReturnType<typeof moveList>>,
      MoveListError,
      Parameters<typeof moveList>[0],
      {
        previousBoardContent: BoardContent | undefined;
      }
    >,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: async (variables) => {
      const result = await moveList(variables);
      return unwrapResult(result);
    },
    ...options,
  });
}
