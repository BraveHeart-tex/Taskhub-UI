import { createFileRoute, redirect } from '@tanstack/react-router';
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
  return <div> Board title is: {board.title}</div>;
}
