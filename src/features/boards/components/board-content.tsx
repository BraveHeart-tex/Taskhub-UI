import {
  closestCorners,
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Muted } from '@/components/ui/typography';
import { NewListComposer } from '@/features/lists/components/new-list-composer';
import { useMoveList } from '@/features/lists/list.mutations';
import { useBoardContent } from '../board.queries';
import { SortableListColumn } from './sortable-list';

interface BoardContentProps {
  workspaceId: string;
  boardId: string;
}

export function BoardContent({ workspaceId, boardId }: BoardContentProps) {
  const { data, isLoading } = useBoardContent({ workspaceId, boardId });
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );
  // TODO: Handle optimistic updates and error cases here via options
  const moveListMutation = useMoveList();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id || !data) return;

    const oldIndex = data.lists.findIndex((l) => l.id === active.id);
    const newIndex = data.lists.findIndex((l) => l.id === over.id);

    const prevList = data.lists[newIndex > oldIndex ? newIndex : newIndex - 1];
    const nextList = data.lists[newIndex > oldIndex ? newIndex + 1 : newIndex];

    moveListMutation.mutate({
      listId: active.id as string,
      beforeListId: prevList?.id,
      afterListId: nextList?.id,
    });
  };

  if (isLoading) {
    return <Muted className='text-center'>Loading board…</Muted>;
  }

  if (!data) {
    return null;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <ScrollArea className='w-full h-full'>
        <div className='flex gap-4 px-px pt-px pb-6 min-w-max'>
          <SortableContext
            items={data.lists.map((l) => l.id)}
            strategy={horizontalListSortingStrategy}
          >
            {data.lists.map((list) => (
              <SortableListColumn
                key={list.id}
                list={list}
                users={data.users}
              />
            ))}
          </SortableContext>
          <NewListComposer label={'Add Another List'} boardId={boardId} />
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </DndContext>
  );
}
