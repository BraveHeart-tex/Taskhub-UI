import { createFileRoute, Link, redirect } from '@tanstack/react-router';
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
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {boards.map((board) => (
        <Link
          key={board.id}
          to='/workspaces/$workspaceId/boards/$boardId'
          params={{ workspaceId: board.workspaceId, boardId: board.id }}
        >
          <WorkspaceBoardPreviewCard board={board} />
        </Link>
      ))}
    </div>
  );
}
