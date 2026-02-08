import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { Badge } from '@/components/ui/badge';
import { useBoardFavoriteToggle } from '@/features/board-favorite/board-favorite.hooks';
import { queryKeys } from '@/lib/query-keys';
import { boardContextQuery } from '../board.queries';
import type { BoardContext } from '../board.schema';
import { BoardTitle } from './board-title';
import { FavoriteBoardButton } from './favorite-board-button';

export function BoardHeader() {
  const { workspaceId, boardId } = useParams({
    from: '/_app/workspaces/$workspaceId/_layout/boards/$boardId/',
  });
  const { data: board } = useQuery(boardContextQuery({ workspaceId, boardId }));

  const queryClient = useQueryClient();
  const queryKey = board?.id ? queryKeys.boards.byId(board?.id) : [];

  const createMutationOptions = (action: 'add' | 'remove') => ({
    onMutate: async (boardId: string) => {
      await queryClient.cancelQueries({ queryKey });
      const previousBoard = queryClient.getQueryData<BoardContext>(queryKey);

      queryClient.setQueryData<BoardContext>(queryKey, (prev) =>
        prev
          ? {
              ...prev,
              isFavorite:
                prev.id === boardId ? action === 'add' : prev.isFavorite,
            }
          : undefined
      );

      return { previousBoard };
    },
    onError: (
      _err: Error,
      _boardId: string,
      ctx?: { previousBoard: BoardContext | undefined }
    ) => {
      queryClient.setQueryData(queryKey, ctx?.previousBoard);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const { toggle, isLoading } = useBoardFavoriteToggle<{
    previousBoard: BoardContext | undefined;
  }>({
    onFavorite: createMutationOptions('add'),
    onUnfavorite: createMutationOptions('remove'),
  });

  if (!board) return null;

  return (
    <div className='space-y-1 h-8'>
      <div className='flex items-center gap-1'>
        <div className='flex items-center'>
          <BoardTitle title={board.title} />
          <FavoriteBoardButton
            isFavorite={board.isFavorite}
            boardId={board.id}
            toggle={toggle}
            isLoading={isLoading}
          />
        </div>
        <Badge variant={board.myRole === 'owner' ? 'default' : 'secondary'}>
          {board.myRole === 'owner' ? 'Owner' : 'Member'}
        </Badge>
      </div>
    </div>
  );
}
