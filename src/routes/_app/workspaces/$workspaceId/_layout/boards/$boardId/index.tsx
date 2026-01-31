import { createFileRoute, redirect } from '@tanstack/react-router';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { H2 } from '@/components/ui/typography';
import { getBoardContext } from '@/features/boards/board.api';
import { BoardContent } from '@/features/boards/components/board-content';

export const Route = createFileRoute(
  '/_app/workspaces/$workspaceId/_layout/boards/$boardId/'
)({
  loader: async ({ params }) => {
    const result = await getBoardContext({
      boardId: params.boardId,
      workspaceId: params.boardId,
    });

    if (!result.ok) {
      throw redirect({ to: '/workspaces/$workspaceId/boards', params });
    }

    return { board: result.value };
  },
  component: WorkspaceBoardPage,
});

function WorkspaceBoardPage() {
  const { board } = Route.useLoaderData();
  return (
    <div className='flex h-full flex-col gap-4'>
      <div className='space-y-1'>
        <div className='flex items-center gap-2'>
          <H2>{board.title}</H2>
          <Badge variant={board.myRole === 'owner' ? 'default' : 'secondary'}>
            {board.myRole === 'owner' ? 'Owner' : 'Member'}
          </Badge>
        </div>
      </div>

      <Separator />

      <BoardContent workspaceId={board.workspaceId} boardId={board.id} />
    </div>
  );
}
