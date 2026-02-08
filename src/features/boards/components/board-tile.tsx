import { useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { useBoardFavoriteToggle } from '@/features/board-favorite/board-favorite.hooks';
import { optimisticallyUpdateFavorite } from '@/features/board-favorite/board-favorite.optimistic';
import type { Dashboard } from '@/features/dashboard/dashboard.schema';
import { queryKeys } from '@/lib/query-keys';
import type { BoardContext } from '../board.schema';
import { FavoriteBoardButton } from './favorite-board-button';

interface BoardTileProps {
  isFavorited: boolean;
  boardId: string;
  title: string;
  workspaceId: string;
}

export function BoardTile({ isFavorited, boardId, title }: BoardTileProps) {
  const queryClient = useQueryClient();
  const dashboardQueryKey = queryKeys.me.dashboard();
  const boardQueryKey = queryKeys.boards.byId(boardId);

  const createMutationOptions = (action: 'add' | 'remove') => ({
    onMutate: async (boardId: string) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: dashboardQueryKey }),
        queryClient.cancelQueries({ queryKey: boardQueryKey }),
      ]);

      const previousDashboard = optimisticallyUpdateFavorite(
        queryClient,
        boardId,
        action
      );
      const previousBoard =
        queryClient.getQueryData<BoardContext>(boardQueryKey);

      queryClient.setQueryData<BoardContext>(boardQueryKey, (prev) =>
        prev
          ? {
              ...prev,
              isFavorite: action === 'add',
            }
          : undefined
      );

      return { previousDashboard, previousBoard };
    },
    onError: (
      _err: Error,
      _boardId: string,
      ctx?: {
        previousDashboard: Dashboard | undefined;
        previousBoard: BoardContext | undefined;
      }
    ) => {
      queryClient.setQueryData(dashboardQueryKey, ctx?.previousDashboard);
      queryClient.setQueryData(boardQueryKey, ctx?.previousBoard);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: dashboardQueryKey });
      queryClient.invalidateQueries({ queryKey: boardQueryKey });
    },
  });

  const { toggle, isLoading } = useBoardFavoriteToggle<{
    previousDashboard: Dashboard | undefined;
    previousBoard: BoardContext | undefined;
  }>({
    onFavorite: createMutationOptions('add'),
    onUnfavorite: createMutationOptions('remove'),
  });

  return (
    <Card>
      <CardContent className='flex h-full flex-col justify-between gap-2 p-3'>
        <div className='flex items-center justify-between gap-2'>
          <Typography
            variant='small'
            as='h5'
            className='text-sm font-medium leading-tight line-clamp-2'
          >
            {title}
          </Typography>
          <FavoriteBoardButton
            boardId={boardId}
            isFavorite={isFavorited}
            toggle={toggle}
            isLoading={isLoading}
          />
        </div>
      </CardContent>
    </Card>
  );
}
