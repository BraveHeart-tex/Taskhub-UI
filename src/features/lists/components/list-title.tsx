import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import type { BoardContent } from '@/features/boards/board.schema';
import { queryKeys } from '@/lib/query-keys';
import { useUpdateListTitle } from '../list.mutations';

interface ListTitleProps {
  title: string;
  listId: string;
  boardId: string;
  workspaceId: string;
}

export function ListTitle({
  title,
  listId,
  boardId,
  workspaceId,
}: ListTitleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();
  const boardContentQueryKey = queryKeys.boards.content(boardId);
  const updateListTitleMutation = useUpdateListTitle({
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: boardContentQueryKey });

      const previousBoardContent =
        queryClient.getQueryData<BoardContent>(boardContentQueryKey);

      queryClient.setQueryData<BoardContent>(
        boardContentQueryKey,
        (oldData) => {
          if (!oldData) return previousBoardContent;
          return {
            ...oldData,
            lists: oldData.lists.map((list) =>
              list.id === listId ? { ...list, title: newTitle } : list
            ),
          };
        }
      );

      return { previousBoardContent };
    },
    onError: (_err, _variables, ctx) => {
      queryClient.setQueryData(boardContentQueryKey, ctx?.previousBoardContent);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: boardContentQueryKey });
    },
  });

  useEffect(() => {
    setNewTitle(title);
  }, [title]);

  const handleBlur = () => {
    setIsEditing(false);
    if (newTitle !== title) {
      updateListTitleMutation.mutate({
        listId,
        boardId,
        workspaceId,
        title: newTitle,
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      inputRef.current?.blur();
    }
    if (event.key === 'Escape') {
      setNewTitle(title);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className='flex items-center flex-1'>
        <Input
          ref={inputRef}
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          className='h-7 px-2 text-xl font-semibold focus-visible:ring-1 focus-visible:ring-offset-0 w-full'
        />
      </div>
    );
  }

  return (
    <Typography
      as='h3'
      className='text-sm font-semibold leading-none text-column-foreground select-none w-full h-7 cursor-pointer rounded-md border border-transparent hover:bg-column-foreground/10 transition-colors flex items-center'
      onClick={() => setIsEditing(true)}
    >
      {title}
    </Typography>
  );
}
