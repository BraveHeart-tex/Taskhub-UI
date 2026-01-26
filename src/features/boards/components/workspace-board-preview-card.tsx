import { Crown, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { BoardPreview } from '../board.schema';

interface WorkspaceBoardPreviewCardProps {
  board: BoardPreview;
}

export function WorkspaceBoardPreviewCard({
  board,
}: WorkspaceBoardPreviewCardProps) {
  return (
    <Card className='cursor-pointer transition-all hover:shadow-md'>
      <CardHeader className='flex flex-row items-start justify-between gap-2'>
        <CardTitle className='text-base font-semibold leading-tight line-clamp-2'>
          {board.title}
        </CardTitle>
        {board.isCurrentUserOwner && (
          <Crown className='h-4 w-4 text-muted-foreground' />
        )}
      </CardHeader>

      <CardContent className='flex items-center justify-between text-sm text-muted-foreground'>
        <div className='flex items-center gap-1'>
          <Users className='h-4 w-4' />
          <span>{board.memberCount}</span>
        </div>
        <time dateTime={board.updatedAt}>
          {new Date(board.updatedAt).toLocaleDateString()}
        </time>
      </CardContent>
    </Card>
  );
}
