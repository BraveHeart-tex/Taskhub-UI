import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_app/workspaces/$workspaceId/_layout/boards/'
)({
  component: WorkspaceBoardsPage,
});

function WorkspaceBoardsPage() {
  return <div>Hello "/_app/workspaces/$workspaceId/boards/"!</div>;
}
