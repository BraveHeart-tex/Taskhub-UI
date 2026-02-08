import { Link } from '@tanstack/react-router';
import { useModalActions } from '@/components/modal-host/modal.store';
import { Button } from '@/components/ui/button';
import { BoardTile } from '@/features/boards/components/board-tile';
import type { Dashboard } from '../dashboard.schema';

interface BoardGridProps {
  boards: Dashboard['boards'];
}

export function BoardGrid({ boards }: BoardGridProps) {
  const { openModal } = useModalActions();

  const handleCreateClick = () => {
    openModal({
      type: 'create-board',
      workspaceId: boards[0]?.workspaceId,
    });
  };

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
            boardId={board.id}
            title={board.title}
            workspaceId={board.workspaceId}
          />
        </Link>
      ))}
      <Button
        variant='outline'
        className='h-full min-h-22.5'
        onClick={handleCreateClick}
      >
        Create Board
      </Button>
    </div>
  );
}
