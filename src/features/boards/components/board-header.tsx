import { useLoaderData } from '@tanstack/react-router';
import { Badge } from '@/components/ui/badge';
import { BoardTitle } from './board-title';
import { FavoriteBoardButton } from './favorite-board-button';

export function BoardHeader() {
  const { board } = useLoaderData({
    from: '/_app/workspaces/$workspaceId/_layout/boards/$boardId/',
  });

  return (
    <div className='space-y-1 h-8'>
      <div className='flex items-center gap-1'>
        <div className='flex items-center'>
          <BoardTitle title={board.title} />
          <FavoriteBoardButton isFavorite={board.isFavorite} />
        </div>
        <Badge variant={board.myRole === 'owner' ? 'default' : 'secondary'}>
          {board.myRole === 'owner' ? 'Owner' : 'Member'}
        </Badge>
      </div>
    </div>
  );
}
