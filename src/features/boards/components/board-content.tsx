import { Muted } from '@/components/ui/typography';
import { AddListForm } from '@/features/lists/components/add-list-form';
import { ListColumn } from '@/features/lists/components/list-column';
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
    return <AddListForm label={'Add List'} />;
  }

  return (
    <div className='flex gap-4 overflow-x-auto pb-4 pt-px px-px'>
      {data.lists.map((list) => (
        <ListColumn key={list.id} list={list} users={data.users} />
      ))}
      <AddListForm label={'Add Another List'} />
    </div>
  );
}
