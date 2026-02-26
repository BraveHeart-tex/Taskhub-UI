import {
  closestCorners,
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Muted } from '@/components/ui/typography';
import { NewListComposer } from '@/features/lists/components/new-list-composer';
import { useMoveList } from '@/features/lists/list.mutations';
import { queryKeys } from '@/lib/query-keys';
import { useBoardContent } from '../board.queries';
import { SortableListColumn } from './sortable-list';

interface BoardContentProps {
  workspaceId: string;
  boardId: string;
}

export function BoardContent({ workspaceId, boardId }: BoardContentProps) {
  const { data, isLoading } = useBoardContent({ workspaceId, boardId });
  const [items, setItems] = useState<string[]>([]);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );
  const queryClient = useQueryClient();
  const moveListMutation = useMoveList({
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.boards.content(boardId),
      });
    },
  });

  useEffect(() => {
    if (data) {
      setItems(data.lists.map((l) => l.id));
    }
  }, [data]);

  const listsById = useMemo(() => {
    if (!data) return {};
    return Object.fromEntries(data.lists.map((l) => [l.id, l]));
  }, [data]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const oldIndex = items.indexOf(activeId);
    const newIndex = items.indexOf(overId);

    if (oldIndex === -1 || newIndex === -1) return;

    const nextItems = arrayMove(items, oldIndex, newIndex);

    const beforeListId = nextItems[newIndex - 1];
    const afterListId = nextItems[newIndex + 1];

    setItems(nextItems);

    moveListMutation.mutate({
      listId: activeId,
      beforeListId,
      afterListId,
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
            items={items}
            strategy={horizontalListSortingStrategy}
          >
            {items.map((listId) => {
              const list = listsById[listId];
              if (!list) return null;

              return (
                <SortableListColumn
                  key={list.id}
                  list={list}
                  users={data.users}
                />
              );
            })}
          </SortableContext>
          <NewListComposer label={'Add Another List'} boardId={boardId} />
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </DndContext>
  );
}
