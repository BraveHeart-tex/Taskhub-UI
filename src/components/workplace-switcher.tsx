import { ChevronsUpDown, Plus } from 'lucide-react';
import { useState } from 'react';
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

const mockWorkspaces = [
  {
    name: 'Workspace 1',
    logo: 'https://www.svgrepo.com/show/452076/notion.svg',
    href: '/workspace1',
  },
  {
    name: 'Workspace 2',
    logo: 'https://www.svgrepo.com/show/452054/linux.svg',
    href: '/workspace2',
  },
];

export function WorkplaceSwitcher() {
  const { isMobile } = useSidebar();
  const [activeWorkspace, setActiveWorkspace] = useState(mockWorkspaces[0]);

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
                <div className='flex items-center justify-center aspect-square border rounded-md p-1'>
                  <img
                    width={24}
                    height={24}
                    className='size-6'
                    src={activeWorkspace.logo}
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
            {mockWorkspaces.map((workspace) => (
              <DropdownMenuItem
                key={workspace.name}
                className='gap-2 p-2'
                onClick={() => setActiveWorkspace(workspace)}
              >
                <div className='flex size-6 items-center justify-center rounded-md border'>
                  <img
                    src={workspace.logo}
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
