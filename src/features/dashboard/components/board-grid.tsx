import { Link } from '@tanstack/react-router';
import { StarIcon } from 'lucide-react';
import type { MouseEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
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
          <BoardCard board={board} />
        </Link>
      ))}
    </div>
  );
}

function BoardCard({ board }: { board: Dashboard['boards'][number] }) {
  const handleFavoriteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
  };

  return (
    <Card>
      <CardContent className='flex h-full flex-col justify-between gap-2 p-3'>
        <div className='flex items-center justify-between gap-2'>
          <h5 className='text-sm font-medium leading-tight line-clamp-2'>
            {board.title}
          </h5>

          <Button variant='ghost' size='icon' onClick={handleFavoriteClick}>
            <StarIcon
              className={cn(
                'size-4 shrink-0 transition-colors',
                board.isFavorited
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
