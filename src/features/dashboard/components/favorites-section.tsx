import { StarIcon } from 'lucide-react';
import { H3 } from '@/components/ui/typography';
import { BoardGrid } from './board-grid';

interface FavoritesSectionProps {
  favoriteBoards: {
    isFavorited: boolean;
    id: string;
    title: string;
    workspaceId: string;
  }[];
}

export function FavoritesSection({ favoriteBoards }: FavoritesSectionProps) {
  if (favoriteBoards.length === 0) return null;

  return (
    <section className='space-y-2'>
      <div className='flex items-center gap-2'>
        <StarIcon className='size-4' />
        <H3>Favorite Boards</H3>
      </div>
      <BoardGrid boards={favoriteBoards} />
    </section>
  );
}
