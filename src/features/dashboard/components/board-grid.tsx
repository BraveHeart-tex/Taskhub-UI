import { Link } from '@tanstack/react-router';
import { BoardTile } from '@/features/boards/components/board-tile';
import type { Dashboard } from '../dashboard.schema';

interface BoardGridProps {
  boards: Dashboard['boards'];
}

export function BoardGrid({ boards }: BoardGridProps) {
  return (
    <div className='grid grid-cols-2 gap-2 md:grid-cols-4'>
      {boards.map((board) => (
        <Link
          key={board.id}
          to='/workspaces/$workspaceId/boards/$boardId'
          params={{ workspaceId: board.workspaceId, boardId: board.id }}
        >
          <BoardTile
            isFavorited={board.isFavorited}
            id={board.id}
            title={board.title}
            workspaceId={board.workspaceId}
          />
        </Link>
      ))}
    </div>
  );
}
