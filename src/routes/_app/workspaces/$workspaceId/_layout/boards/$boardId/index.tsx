import { createFileRoute, redirect } from '@tanstack/react-router';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { H2, Muted } from '@/components/ui/typography';
import { getBoardContext } from '@/features/boards/board.api';

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
    <div className='flex h-full flex-col gap-6'>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <H2>{board.title}</H2>
          <Muted>Board</Muted>
        </div>

        <Badge variant='secondary'>
          {board.myRole === 'owner' ? 'Owner' : 'Member'}
        </Badge>
      </div>

      <Separator />

      <div className='flex-1 rounded-lg border border-dashed p-8'>
        <div className='text-center space-y-2'>
          <Muted>Board content goes here</Muted>
          <Muted>Lists & cards should be loaded via React Query</Muted>
        </div>
      </div>
    </div>
  );
}
