import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/workspaces/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello workspace list page!</div>;
}
