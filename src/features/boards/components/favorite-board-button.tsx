import { StarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FavoriteBoardButtonProps {
  isFavorite: boolean;
}

export function FavoriteBoardButton({ isFavorite }: FavoriteBoardButtonProps) {
  return (
    <Button size='icon' variant='ghost'>
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
