import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';
import { useModalActions } from '@/components/modal-host/modal.store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { H2, Muted } from '@/components/ui/typography';
import { listBoardsForWorkspace } from '@/features/boards/board.api';
import { WorkspaceBoardPreviewCard } from '@/features/boards/components/workspace-board-preview-card';

export const Route = createFileRoute(
  '/_app/workspaces/$workspaceId/_layout/boards/'
)({
  loader: async ({ params }) => {
    const result = await listBoardsForWorkspace(params.workspaceId);

    if (!result.ok) {
      throw redirect({ to: '/workspaces' });
    }

    return {
      boards: result.value,
    };
  },
  component: WorkspaceBoardsPage,
});

function WorkspaceBoardsPage() {
  const { boards } = Route.useLoaderData();
  const workspaceId = Route.useParams().workspaceId;
  const { openModal } = useModalActions();

  const openCreateBoardModal = () => {
    openModal({ type: 'create-board', workspaceId });
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <H2>Boards</H2>
          <Muted>All boards in this workspace</Muted>
        </div>

        <Button onClick={openCreateBoardModal}>
          <PlusIcon />
          Create board
        </Button>
      </div>

      {boards.length === 0 ? (
        <Card className='border-dashed'>
          <CardContent className='flex flex-col items-center justify-center py-16 text-center'>
            <Muted>No boards yet</Muted>
            <Button className='mt-4' onClick={openCreateBoardModal}>
              <PlusIcon className='mr-2 h-4 w-4' />
              Create your first board
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {boards.map((board) => (
            <Link
              key={board.id}
              to='/workspaces/$workspaceId/boards/$boardId'
              params={{ workspaceId: board.workspaceId, boardId: board.id }}
              className='block'
            >
              <WorkspaceBoardPreviewCard board={board} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
