import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Muted } from '@/components/ui/typography';
import { ListColumn } from '@/features/lists/components/list-column';
import { NewListComposer } from '@/features/lists/components/new-list-composer';
import { useBoardContent } from '../board.queries';

interface BoardContentProps {
  workspaceId: string;
  boardId: string;
}

export function BoardContent({ workspaceId, boardId }: BoardContentProps) {
  const { data, isLoading } = useBoardContent({ workspaceId, boardId });

  if (isLoading) {
    return <Muted className='text-center'>Loading board…</Muted>;
  }

  if (!data || data.lists.length === 0) {
    return (
      <NewListComposer
        label={'Add List'}
        workspaceId={workspaceId}
        boardId={boardId}
      />
    );
  }

  return (
    <ScrollArea className='flex-1 min-h-0 min-w-0'>
      <div className='flex w-[calc(100vw-0px)] gap-4 pb-4 pt-px px-px'>
        {data.lists.map((list) => (
          <ListColumn key={list.id} list={list} users={data.users} />
        ))}
        <NewListComposer
          label={'Add Another List'}
          workspaceId={workspaceId}
          boardId={boardId}
        />
      </div>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  );
}
