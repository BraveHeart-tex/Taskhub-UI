import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { Badge } from '@/components/ui/badge';
import { useBoardFavoriteToggle } from '@/features/board-favorite/board-favorite.hooks';
import type { Dashboard } from '@/features/dashboard/dashboard.schema';
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
  const dashboardQueryKey = queryKeys.me.dashboard();
  const boardQueryKey = board?.id ? queryKeys.boards.byId(board?.id) : [];

  const createMutationOptions = (action: 'add' | 'remove') => ({
    onMutate: async (boardId: string) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: boardQueryKey }),
        queryClient.cancelQueries({ queryKey: dashboardQueryKey }),
      ]);

      const previousBoard =
        queryClient.getQueryData<BoardContext>(boardQueryKey);
      const previousDashboard =
        queryClient.getQueryData<Dashboard>(dashboardQueryKey);

      queryClient.setQueryData<BoardContext>(boardQueryKey, (prev) =>
        prev
          ? {
              ...prev,
              isFavorite:
                prev.id === boardId ? action === 'add' : prev.isFavorite,
            }
          : undefined
      );

      queryClient.setQueryData<Dashboard>(dashboardQueryKey, (prev) =>
        prev
          ? {
              ...prev,
              favorites:
                action === 'add'
                  ? [...prev.favorites, boardId]
                  : prev.favorites.filter((id) => id !== boardId),
              boards: prev.boards.map((board) => ({
                ...board,
                isFavorited:
                  board.id === boardId ? action === 'add' : board.isFavorited,
              })),
            }
          : prev
      );

      return { previousBoard, previousDashboard };
    },
    onError: (
      _err: Error,
      _boardId: string,
      ctx?: {
        previousBoard: BoardContext | undefined;
        previousDashboard: Dashboard | undefined;
      }
    ) => {
      queryClient.setQueryData(boardQueryKey, ctx?.previousBoard);
      queryClient.setQueryData(dashboardQueryKey, ctx?.previousDashboard);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: boardQueryKey });
      queryClient.invalidateQueries({ queryKey: dashboardQueryKey });
    },
  });

  const { toggle, isLoading } = useBoardFavoriteToggle<{
    previousBoard: BoardContext | undefined;
    previousDashboard: Dashboard | undefined;
  }>({
    onFavorite: createMutationOptions('add'),
    onUnfavorite: createMutationOptions('remove'),
  });

  if (!board) return null;

  return (
    <div className='space-y-1 h-8'>
      <div className='flex items-center gap-1'>
        <div className='flex items-center'>
          <BoardTitle
            title={board.title}
            boardId={board.id}
            workspaceId={board.workspaceId}
          />
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
