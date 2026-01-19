import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/workspaces/$workspaceId/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello workspace details page!</div>;
}
