import { useLoaderData } from '@tanstack/react-router';
import { Badge } from '@/components/ui/badge';
import { BoardTitle } from './board-title';

export function BoardHeader() {
  const { board } = useLoaderData({
    from: '/_app/workspaces/$workspaceId/_layout/boards/$boardId/',
  });

  return (
    <div className='space-y-1'>
      <div className='flex items-center gap-2'>
        <BoardTitle title={board.title} />
        <Badge variant={board.myRole === 'owner' ? 'default' : 'secondary'}>
          {board.myRole === 'owner' ? 'Owner' : 'Member'}
        </Badge>
      </div>
    </div>
  );
}
