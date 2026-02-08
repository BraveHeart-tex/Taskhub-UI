import { Card, CardContent } from '@/components/ui/card';
import { FavoriteBoardButton } from './favorite-board-button';

interface BoardTileProps {
  isFavorited: boolean;
  id: string;
  title: string;
  workspaceId: string;
}

export function BoardTile({ isFavorited, id, title }: BoardTileProps) {
  return (
    <Card>
      <CardContent className='flex h-full flex-col justify-between gap-2 p-3'>
        <div className='flex items-center justify-between gap-2'>
          <h5 className='text-sm font-medium leading-tight line-clamp-2'>
            {title}
          </h5>

          <FavoriteBoardButton boardId={id} isFavorite={isFavorited} />
        </div>
      </CardContent>
    </Card>
  );
}
