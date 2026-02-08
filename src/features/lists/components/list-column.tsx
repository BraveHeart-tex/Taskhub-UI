import { useParams } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';
import { type RefObject, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { BoardContent } from '@/features/boards/board.schema';
import { CardItem } from '@/features/cards/components/card-item';
import { NewCardComposer } from '../cards/components/new-card-composer';
import { ListActions } from './list-actions';

interface ListColumnProps {
  list: BoardContent['lists'][number];
  users: BoardContent['users'];
}

export function ListColumn({ list, users }: ListColumnProps) {
  const params = useParams({
    from: '/_app/workspaces/$workspaceId/_layout/boards/$boardId/',
  });
  const [isAddingCard, setIsAddingCard] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <article className='w-72 shrink-0'>
      <Card className='flex min-h-0 flex-col rounded-xl bg-muted/50'>
        <div className='flex items-center justify-between px-3'>
          <h3 className='text-sm font-semibold leading-none'>{list.title}</h3>
          <ListActions onAddCard={() => setIsAddingCard(true)} />
        </div>

        <ScrollArea className='min-h-0 group' ref={scrollContainerRef}>
          <div className='max-h-[calc(100vh-18.5rem)] flex-1'>
            <div className='space-y-2 p-0.5 px-1 group-data-has-overflow-y:pr-1.75 '>
              {list.cards.map((card) => (
                <CardItem
                  key={card.id}
                  card={card}
                  user={users[card.createdBy]}
                />
              ))}
              {isAddingCard && (
                <NewCardComposer
                  onCancel={() => setIsAddingCard(false)}
                  listId={list.id}
                  workspaceId={params.workspaceId}
                  boardId={params.boardId}
                  scrollContainerRef={
                    scrollContainerRef as RefObject<HTMLDivElement>
                  }
                />
              )}
            </div>
          </div>
        </ScrollArea>

        <div className='shrink-0 px-2'>
          {!isAddingCard && (
            <Button
              variant='ghost'
              className='w-full justify-start gap-2 text-muted-foreground'
              onClick={() => setIsAddingCard(true)}
            >
              <PlusIcon />
              Add Card
            </Button>
          )}
        </div>
      </Card>
    </article>
  );
}
