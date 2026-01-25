import { createFileRoute, redirect } from '@tanstack/react-router';
import { H3, Muted } from '@/components/ui/typography';
import { WorkspaceMemberCard } from '@/features/workspaces/members/components/workspace-member-card';
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
  const members = Route.useLoaderData().members;
  return (
    <div className='flex flex-col gap-6'>
      <div className='space-y-1'>
        <H3>Workspace Members</H3>
        <Muted>Manage your workspace members here</Muted>
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {members.map((member) => (
          <WorkspaceMemberCard key={member.user.id} member={member} />
        ))}
      </div>
    </div>
  );
}
