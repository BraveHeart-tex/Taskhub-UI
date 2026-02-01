import { MoreHorizontalIcon, PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { BoardContent } from '@/features/boards/board.schema';
import { CardItem } from '@/features/cards/components/card-item';

interface ListColumnProps {
  list: BoardContent['lists'][number];
  users: BoardContent['users'];
}

export function ListColumn({ list, users }: ListColumnProps) {
  return (
    <article className='w-72 shrink-0'>
      <Card className='flex h-full flex-col rounded-xl bg-muted/50'>
        <div className='flex items-center justify-between px-3'>
          <h3 className='text-sm font-semibold leading-none'>{list.title}</h3>
          <Button variant='ghost' size='icon' className='h-7 w-7'>
            <MoreHorizontalIcon />
          </Button>
        </div>

        <div className='flex-1 space-y-2 overflow-y-auto px-3'>
          {list.cards.map((card) => (
            <CardItem key={card.id} card={card} user={users[card.createdBy]} />
          ))}
        </div>

        <div className='px-2'>
          <Button
            variant='ghost'
            className='w-full justify-start gap-2 text-muted-foreground'
          >
            <PlusIcon />
            Add Card
          </Button>
        </div>
      </Card>
    </article>
  );
}
