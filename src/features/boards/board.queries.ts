import { queryOptions, useQuery } from '@tanstack/react-query';
import { redirect } from '@tanstack/react-router';
import { queryKeys } from '@/lib/query-keys';
import { unwrapResult } from '@/lib/result';
import { getBoardContent, getBoardContext } from './board.api';
import type { BoardRouteParams } from './board.types';

export const useBoardContent = ({ workspaceId, boardId }: BoardRouteParams) => {
  return useQuery({
    queryKey: queryKeys.boards.content(boardId),
    queryFn: async () => {
      const result = await getBoardContent({ workspaceId, boardId });

      return unwrapResult(result);
    },
  });
};

export const boardContextQuery = ({ workspaceId, boardId }: BoardRouteParams) =>
  queryOptions({
    queryKey: queryKeys.boards.byId(boardId),
    queryFn: () =>
      getBoardContext({
        boardId,
        workspaceId,
      }).then((r) => {
        if (!r.ok)
          throw redirect({ to: '/workspaces/$workspaceId/boards', params });
        return r.value;
      }),
  });
