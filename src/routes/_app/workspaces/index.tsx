import {
  createFileRoute,
  useLoaderData,
  useRouter,
} from '@tanstack/react-router';
import { EmptyState } from '@/components/empty-state';
import { useModalActions } from '@/components/modal-host/modal.store';
import { Button } from '@/components/ui/button';
import { H3 } from '@/components/ui/typography';
import { WorkspaceCard } from '@/features/workspaces/components/workspace-card';
import { listWorkspaces } from '@/features/workspaces/workspace.api';

export const Route = createFileRoute('/_app/workspaces/')({
  component: WorkspacesRoute,
  loader: async () => {
    const result = await listWorkspaces();

    if (!result.ok) {
      return { workspaces: [] };
    }

    return { workspaces: result.value };
  },
});

function WorkspacesRoute() {
  const { workspaces } = useLoaderData({ from: '/_app/workspaces/' });
  const { openModal } = useModalActions();
  const router = useRouter();

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-center justify-between'>
        <H3>Your Workspaces</H3>
        <Button onClick={() => openModal({ type: 'create-workspace' })}>
          Create workspace
        </Button>
      </div>
      {workspaces.length === 0 ? (
        <EmptyState
          title='No workspaces yet'
          description='Create your first workspace to get started'
        />
      ) : (
        <ul className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {workspaces.map((workspace) => (
            <li key={workspace.id} className='h-full'>
              <WorkspaceCard
                workspace={workspace}
                onOpen={() => {
                  router.navigate({
                    to: '/workspaces/$workspaceId',
                    params: {
                      workspaceId: workspace.id,
                    },
                  });
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
