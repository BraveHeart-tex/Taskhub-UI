import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import type { Dashboard } from '@/features/dashboard/dashboard.schema';
import { queryKeys } from '@/lib/query-keys';
import { showErrorToast } from '@/shared/toast-helpers';
import { useUpdateBoardTitle } from '../board.mutations';
import type { BoardContext } from '../board.schema';

interface BoardTitleProps {
  boardId: string;
  workspaceId: string;
  title: string;
}

export function BoardTitle({ boardId, workspaceId, title }: BoardTitleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();
  const dashboardQueryKey = queryKeys.me.dashboard();
  const boardQueryKey = queryKeys.boards.byId(boardId);

  const updateBoardTitleMutation = useUpdateBoardTitle({
    onMutate: async (variables) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: boardQueryKey }),
        queryClient.cancelQueries({ queryKey: dashboardQueryKey }),
      ]);

      const previousBoard =
        queryClient.getQueryData<BoardContext>(boardQueryKey);
      const previousDashboard =
        queryClient.getQueryData<Dashboard>(dashboardQueryKey);

      queryClient.setQueryData<BoardContext>(boardQueryKey, (prev) =>
        prev
          ? {
              ...prev,
              title: variables.title,
            }
          : undefined
      );

      queryClient.setQueryData<Dashboard>(dashboardQueryKey, (prev) =>
        prev
          ? {
              ...prev,
              boards: prev.boards.map((board) => ({
                ...board,
                title: board.id === boardId ? variables.title : board.title,
              })),
            }
          : prev
      );

      return { previousBoard, previousDashboard };
    },
    onError: (error, _boardId, ctx) => {
      queryClient.setQueryData(boardQueryKey, ctx?.previousBoard);
      queryClient.setQueryData(dashboardQueryKey, ctx?.previousDashboard);
      if (error.type === 'BoardTitleAlreadyExists') {
        showErrorToast('Board title already exists');
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: boardQueryKey,
      });
      queryClient.invalidateQueries({
        queryKey: dashboardQueryKey,
      });
    },
  });

  useEffect(() => {
    setNewTitle(title);
  }, [title]);

  const handleBlur = () => {
    setIsEditing(false);
    if (newTitle !== title) {
      updateBoardTitleMutation.mutate({
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
      <div className='flex items-center'>
        <Input
          ref={inputRef}
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          className='h-8 px-2 text-xl font-semibold focus-visible:ring-1 focus-visible:ring-offset-0'
        />
      </div>
    );
  }

  return (
    <div className='group flex items-center cursor-pointer rounded-md border border-transparent hover:bg-muted/50 transition-colors px-2 -ml-2'>
      <Typography
        variant='h3'
        as='h1'
        className='select-none'
        onClick={() => setIsEditing(true)}
      >
        {newTitle}
      </Typography>
    </div>
  );
}
