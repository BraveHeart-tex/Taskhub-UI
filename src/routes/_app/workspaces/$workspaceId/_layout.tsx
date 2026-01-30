import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { getWorkspace } from '@/features/workspaces/workspace.api';

export const Route = createFileRoute('/_app/workspaces/$workspaceId/_layout')({
  loader: async ({ params }) => {
    const result = await getWorkspace(params.workspaceId);

    if (!result.ok) {
      throw redirect({ to: '/workspaces' });
    }

    return {
      workspace: result.value,
    };
  },
  component: WorkspaceLayout,
});

function WorkspaceLayout() {
  return <Outlet />;
}
