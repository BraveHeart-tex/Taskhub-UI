import { createFileRoute, redirect } from '@tanstack/react-router';
import { Separator } from '@/components/ui/separator';
import { getBoardContext } from '@/features/boards/board.api';
import { BoardContent } from '@/features/boards/components/board-content';
import { BoardHeader } from '@/features/boards/components/board-header';
import { queryKeys } from '@/lib/query-keys';

export const Route = createFileRoute(
  '/_app/workspaces/$workspaceId/_layout/boards/$boardId/'
)({
  loader: async ({ params, context }) => {
    return context.queryClient.ensureQueryData({
      queryKey: queryKeys.boards.byId(params.boardId),
      queryFn: () =>
        getBoardContext({
          boardId: params.boardId,
          workspaceId: params.workspaceId,
        }).then((r) => {
          if (!r.ok)
            throw redirect({ to: '/workspaces/$workspaceId/boards', params });
          return r.value;
        }),
    });
  },
  component: WorkspaceBoardPage,
});

function WorkspaceBoardPage() {
  const board = Route.useLoaderData();
  return (
    <div className='flex flex-1 flex-col gap-4'>
      <BoardHeader />
      <Separator />
      <div className='flex-1'>
        <BoardContent workspaceId={board.workspaceId} boardId={board.id} />
      </div>
    </div>
  );
}
