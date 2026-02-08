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

  if (!data) {
    return null;
  }

  return (
    <ScrollArea className='w-full h-full'>
      <div className='flex gap-4 px-px pt-px pb-6 min-w-max'>
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
