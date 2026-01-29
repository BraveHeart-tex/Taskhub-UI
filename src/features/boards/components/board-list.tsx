import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { BoardContent } from '../board.schema';
import { BoardCard } from './board-card';

export function BoardList({
  list,
  users,
}: {
  list: BoardContent['lists'][number];
  users: BoardContent['users'];
}) {
  return (
    <Card className='min-w-72 shrink-0'>
      <CardHeader className='font-medium'>{list.title}</CardHeader>
      <CardContent className='space-y-2'>
        {list.cards.map((card) => (
          <BoardCard key={card.id} card={card} user={users[card.createdBy]} />
        ))}
      </CardContent>
    </Card>
  );
}
