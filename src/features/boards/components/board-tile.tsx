import { StarIcon } from 'lucide-react';
import type { MouseEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  useFavoriteBoard,
  useUnfavoriteBoard,
} from '@/features/board-favorite/board-favorite.hooks';
import { cn } from '@/lib/utils';

interface BoardTileProps {
  isFavorited: boolean;
  id: string;
  title: string;
  workspaceId: string;
}

export function BoardTile({ isFavorited, id, title }: BoardTileProps) {
  const favoriteBoardMutation = useFavoriteBoard();
  const unfavoriteBoardMutation = useUnfavoriteBoard();

  const isLoading =
    favoriteBoardMutation.isPending || unfavoriteBoardMutation.isPending;

  const handleFavoriteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (isLoading) return;

    if (isFavorited) {
      unfavoriteBoardMutation.mutate(id);
    } else {
      favoriteBoardMutation.mutate(id);
    }
  };

  return (
    <Card>
      <CardContent className='flex h-full flex-col justify-between gap-2 p-3'>
        <div className='flex items-center justify-between gap-2'>
          <h5 className='text-sm font-medium leading-tight line-clamp-2'>
            {title}
          </h5>

          <Button
            variant='ghost'
            size='icon'
            onClick={handleFavoriteClick}
            disabled={isLoading}
            aria-pressed={isFavorited}
          >
            <StarIcon
              className={cn(
                'size-4 transition-colors',
                isFavorited
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-muted-foreground/40 group-hover:text-muted-foreground'
              )}
            />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
