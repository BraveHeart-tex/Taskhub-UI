import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { RouteBreadcrumbs } from '@/components/route-breadcrumbs';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { WorkspaceSidebar } from '@/features/workspaces/components/workspace-sidebar';
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
  const { workspace } = Route.useLoaderData();
  return (
    <SidebarProvider>
      <WorkspaceSidebar workspace={workspace} />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <Separator orientation='vertical' className='mr-2' />
            <RouteBreadcrumbs />
          </div>
        </header>
        <main className='flex flex-1 flex-col gap-4 p-4 pt-0'>
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
