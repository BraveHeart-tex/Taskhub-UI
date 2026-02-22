import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ListColumn } from '@/features/lists/components/list-column';
import { cn } from '@/lib/utils';
import type { BoardContent } from '../board.schema';

interface Props {
  list: BoardContent['lists'][number];
  users: BoardContent['users'];
}

export function SortableListColumn({ list, users }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: list.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        'h-full',
        isDragging ? 'cursor-grabbing' : 'hover:cursor-grab'
      )}
    >
      <ListColumn key={list.id} list={list} users={users} />
    </div>
  );
}
