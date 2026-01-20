import { useMatches, useRouter } from '@tanstack/react-router';
import { ChevronsUpDown, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useWorkspaces } from '@/features/workspaces/workspace.queries';

const mockWorkspaceLogo = 'https://www.svgrepo.com/show/452076/notion.svg';

export function WorkplaceSwitcher() {
  const router = useRouter();
  const { data: workspaces = [], isLoading } = useWorkspaces();
  const { isMobile } = useSidebar();

  const matches = useMatches();
  const workspaceId = matches.find(
    (m) => m.routeId === '/_app/workspaces/$workspaceId/'
  )?.params.workspaceId;
  const activeWorkspace =
    workspaces.find((w) => w.id === workspaceId) ?? workspaces[0];

  if (isLoading || !activeWorkspace) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size='lg' disabled>
            Loading…
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size='lg'
                className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
              >
                <div className='border flex aspect-square size-8 items-center justify-center rounded-lg'>
                  <img
                    width={24}
                    height={24}
                    className='size-4'
                    src={mockWorkspaceLogo}
                    alt={activeWorkspace.name}
                  />
                </div>
                <span className='truncate font-medium flex-1 text-left text-sm leading-tight'>
                  {activeWorkspace.name}
                </span>
                <ChevronsUpDown className='ml-auto' />
              </SidebarMenuButton>
            }
          />
          <DropdownMenuContent
            className='min-w-56 rounded-lg'
            align='start'
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className='text-muted-foreground text-xs'>
                Teams
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            {workspaces.map((workspace) => (
              <DropdownMenuItem
                key={workspace.name}
                className='gap-2 p-2'
                onClick={() => {
                  router.navigate({
                    to: '/workspaces/$workspaceId',
                    params: { workspaceId: workspace.id },
                  });
                }}
              >
                <div className='flex size-6 items-center justify-center rounded-md border'>
                  <img
                    src={mockWorkspaceLogo}
                    alt={workspace.name}
                    className='size-3.5 shrink-0'
                  />
                </div>
                {workspace.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className='gap-2 p-2'>
              <div className='flex size-6 items-center justify-center rounded-md border bg-transparent'>
                <Plus className='size-4' />
              </div>
              <div className='text-muted-foreground font-medium'>
                Add workspace
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
