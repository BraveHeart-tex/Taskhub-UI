import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_app/workspaces/$workspaceId/_layout/boards/$boardId/'
)({
  component: WorkspaceBoardPage,
});

function WorkspaceBoardPage() {
  return <div>Hello "/_app/workspaces/$workspaceId/boards/$boardId/"!</div>;
}
