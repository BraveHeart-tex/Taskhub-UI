import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { unwrapResult } from '@/lib/result';
import { getBoardContent } from './board.api';
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
