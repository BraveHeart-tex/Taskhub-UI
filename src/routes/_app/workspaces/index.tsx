import {
  createFileRoute,
  redirect,
  useLoaderData,
  useRouter,
} from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { H3, H4, Muted } from '@/components/ui/typography';
import { WorkspaceCard } from '@/components/workspace-card';
import { listWorkspaces } from '@/features/workspaces/workspace.api';

export const Route = createFileRoute('/_app/workspaces/')({
  component: RouteComponent,
  loader: async () => {
    const result = await listWorkspaces();

    if (!result.ok) {
      if (result.error.type === 'Unauthenticated') {
        throw redirect({ to: '/login' });
      }

      return { workspaces: [] };
    }

    return { workspaces: result.value };
  },
});

function RouteComponent() {
  const { workspaces } = useLoaderData({ from: '/_app/workspaces/' });
  const router = useRouter();

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <H3>Workspaces</H3>
          <Muted>Manage your workspaces here</Muted>
        </div>
        <Button>Create workspace</Button>
      </div>
      {workspaces.length === 0 ? (
        <div className='flex min-h-50 flex-col items-center justify-center rounded-lg border border-dashed bg-muted/30 text-center'>
          <H4>No workspaces yet</H4>
          <Muted>Create your first workspace to get started</Muted>
        </div>
      ) : (
        <ul className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {workspaces.map((ws) => (
            <li key={ws.id} className='h-full'>
              <WorkspaceCard
                workspace={{
                  ...ws,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  members: [],
                }}
                onOpen={() => {
                  router.navigate({
                    to: '/workspaces/$workspaceId',
                    params: {
                      workspaceId: ws.id,
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
