import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_app/workspaces/$workspaceId/boards/$boardId/'
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_app/workspaces/$workspaceId/boards/$boardId/"!</div>;
}
