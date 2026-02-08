import { createFileRoute } from '@tanstack/react-router';
import { Separator } from '@/components/ui/separator';
import { boardContextQuery } from '@/features/boards/board.queries';
import { BoardContent } from '@/features/boards/components/board-content';
import { BoardHeader } from '@/features/boards/components/board-header';

export const Route = createFileRoute(
  '/_app/workspaces/$workspaceId/_layout/boards/$boardId/'
)({
  loader: async ({ params, context }) => {
    return context.queryClient.ensureQueryData(
      boardContextQuery({
        workspaceId: params.workspaceId,
        boardId: params.boardId,
      })
    );
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
