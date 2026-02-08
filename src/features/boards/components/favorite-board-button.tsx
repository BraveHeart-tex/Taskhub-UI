import { StarIcon } from 'lucide-react';
import type { MouseEvent } from 'react';
import { Button } from '@/components/ui/button';
import {
  useFavoriteBoard,
  useUnfavoriteBoard,
} from '@/features/board-favorite/board-favorite.hooks';
import { cn } from '@/lib/utils';

interface FavoriteBoardButtonProps {
  isFavorite: boolean;
  boardId: string;
}

export function FavoriteBoardButton({
  isFavorite,
  boardId,
}: FavoriteBoardButtonProps) {
  const favoriteBoardMutation = useFavoriteBoard();
  const unfavoriteBoardMutation = useUnfavoriteBoard();

  const isLoading =
    favoriteBoardMutation.isPending || unfavoriteBoardMutation.isPending;

  const handleFavoriteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (isLoading) return;

    if (isFavorite) {
      unfavoriteBoardMutation.mutate(boardId);
    } else {
      favoriteBoardMutation.mutate(boardId);
    }
  };

  return (
    <Button
      size='icon'
      variant='ghost'
      onClick={handleFavoriteClick}
      disabled={isLoading}
      aria-pressed={isFavorite}
    >
      <StarIcon
        className={cn(
          'w-4 h-4 transition-colors',
          isFavorite
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-muted-foreground/40 group-hover:text-muted-foreground'
        )}
      />
    </Button>
  );
}
