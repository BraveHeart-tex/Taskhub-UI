import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { addFavoriteBoard, removeFavoriteBoard } from './board-favorite.api';

type FavoriteBoardOptions<TContext = unknown> = Exclude<
  UseMutationOptions<
    Awaited<ReturnType<typeof addFavoriteBoard>>,
    Error,
    Parameters<typeof addFavoriteBoard>[0],
    TContext
  >,
  'mutationFn'
>;

export const useFavoriteBoard = <TContext = unknown>(
  options?: FavoriteBoardOptions<TContext>
) => {
  return useMutation({
    mutationFn: addFavoriteBoard,
    ...options,
  });
};

type UnFavoriteBoardOptions<TContext = unknown> = Exclude<
  UseMutationOptions<
    Awaited<ReturnType<typeof removeFavoriteBoard>>,
    Error,
    Parameters<typeof removeFavoriteBoard>[0],
    TContext
  >,
  'mutationFn'
>;

export const useUnfavoriteBoard = <TContext = unknown>(
  options?: UnFavoriteBoardOptions<TContext>
) => {
  return useMutation({
    mutationFn: removeFavoriteBoard,
    ...options,
  });
};

export const useBoardFavoriteToggle = <TContext = unknown>(options?: {
  onFavorite?: FavoriteBoardOptions<TContext>;
  onUnfavorite?: UnFavoriteBoardOptions<TContext>;
}) => {
  const favorite = useFavoriteBoard(options?.onFavorite);
  const unfavorite = useUnfavoriteBoard(options?.onUnfavorite);

  const toggle = (boardId: string, nextFavorite: boolean) => {
    if (nextFavorite) {
      favorite.mutate(boardId);
    } else {
      unfavorite.mutate(boardId);
    }
  };

  return {
    favorite,
    unfavorite,
    toggle,
    isLoading: favorite.isPending || unfavorite.isPending,
  };
};
