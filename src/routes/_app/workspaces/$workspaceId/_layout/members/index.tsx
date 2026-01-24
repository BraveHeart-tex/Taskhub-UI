import { createFileRoute, redirect } from '@tanstack/react-router';
import { listWorkspaceMembers } from '@/features/workspaces/members/workspace-member.api';

export const Route = createFileRoute(
  '/_app/workspaces/$workspaceId/_layout/members/'
)({
  component: WorkspaceMembersRoute,
  loader: async ({ params }) => {
    const result = await listWorkspaceMembers(params.workspaceId);
    if (!result.ok) {
      switch (result.error.type) {
        case 'Unauthorized':
          throw redirect({ to: '/login' });

        case 'Forbidden':
        case 'NotFound':
          throw redirect({ to: '/workspaces' });

        case 'ValidationFailed':
        case 'Unexpected':
          throw result.error;
      }
    }

    return {
      members: result.value,
    };
  },
});

function WorkspaceMembersRoute() {
  return <div>Workspace members</div>;
}
