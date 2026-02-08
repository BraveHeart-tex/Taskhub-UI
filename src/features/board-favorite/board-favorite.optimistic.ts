import type { QueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import type { Dashboard } from '../dashboard/dashboard.schema';

type FavoriteAction = 'add' | 'remove';

export function optimisticallyUpdateFavorite(
  queryClient: QueryClient,
  boardId: string,
  action: FavoriteAction
) {
  const queryKey = queryKeys.me.dashboard();

  const previousDashboard = queryClient.getQueryData<Dashboard>(queryKey);

  queryClient.setQueryData<Dashboard>(queryKey, (prev) => {
    if (!prev) return prev;

    return {
      ...prev,
      boards: prev.boards.map((board) =>
        board.id === boardId
          ? { ...board, isFavorite: action === 'add' }
          : board
      ),
      favorites:
        action === 'add'
          ? [...prev.favorites, boardId]
          : prev.favorites.filter((id) => id !== boardId),
    };
  });

  return { previousDashboard };
}
