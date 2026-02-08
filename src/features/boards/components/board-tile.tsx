import { useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { useBoardFavoriteToggle } from '@/features/board-favorite/board-favorite.hooks';
import { optimisticallyUpdateFavorite } from '@/features/board-favorite/board-favorite.optimistic';
import type { Dashboard } from '@/features/dashboard/dashboard.schema';
import { queryKeys } from '@/lib/query-keys';
import { FavoriteBoardButton } from './favorite-board-button';

interface BoardTileProps {
  isFavorited: boolean;
  id: string;
  title: string;
  workspaceId: string;
}

export function BoardTile({ isFavorited, id, title }: BoardTileProps) {
  const queryClient = useQueryClient();
  const queryKey = queryKeys.me.dashboard();

  const createMutationOptions = (action: 'add' | 'remove') => ({
    onMutate: async (boardId: string) => {
      await queryClient.cancelQueries({ queryKey });
      return optimisticallyUpdateFavorite(queryClient, boardId, action);
    },
    onError: (
      _err: Error,
      _boardId: string,
      ctx?: { previousDashboard: Dashboard | undefined }
    ) => {
      queryClient.setQueryData(queryKey, ctx?.previousDashboard);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const { toggle, isLoading } = useBoardFavoriteToggle<{
    previousDashboard: Dashboard | undefined;
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
            boardId={id}
            isFavorite={isFavorited}
            toggle={toggle}
            isLoading={isLoading}
          />
        </div>
      </CardContent>
    </Card>
  );
}
