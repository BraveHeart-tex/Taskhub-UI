import { Link } from '@tanstack/react-router';
import { Card, CardContent } from '@/components/ui/card';
import type { Dashboard } from '../dashboard.schema';

interface BoardGridProps {
  workspaceId: string;
  boards: Dashboard['boards'];
}

export function BoardGrid({ workspaceId, boards }: BoardGridProps) {
  return (
    <div className='grid grid-cols-2 gap-2 md:grid-cols-4'>
      {boards.map((board) => (
        <Link
          key={board.id}
          to='/workspaces/$workspaceId/boards/$boardId'
          params={{ workspaceId, boardId: board.id }}
        >
          <Card>
            <CardContent>{board.title}</CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
