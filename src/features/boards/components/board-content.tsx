import { Muted } from '@/components/ui/typography';
import { AddListForm } from '@/features/lists/components/add-list-form';
import { useBoardContent } from '../board.query';
import { BoardList } from './board-list';

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
        <BoardList key={list.id} list={list} users={data.users} />
      ))}
      <AddListForm label={'Add Another List'} />
    </div>
  );
}
