import { StarIcon } from 'lucide-react';
import type { MouseEvent } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FavoriteBoardButtonProps {
  isFavorite: boolean;
  boardId: string;
  isLoading: boolean;
  toggle: (boardId: string, isFavorite: boolean) => void;
}

export function FavoriteBoardButton({
  isFavorite,
  boardId,
  isLoading,
  toggle,
}: FavoriteBoardButtonProps) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    toggle(boardId, !isFavorite);
  };

  return (
    <Button
      size='icon'
      variant='ghost'
      onClick={handleClick}
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
