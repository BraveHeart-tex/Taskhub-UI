import { useLoaderData, useRouter } from '@tanstack/react-router';
import { CheckIcon, ChevronsUpDown, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useWorkspaces } from '@/features/workspaces/workspace.queries';

const mockWorkspaceLogo = 'https://www.svgrepo.com/show/452076/notion.svg';

export function WorkspaceSwitcher() {
  const router = useRouter();

  const { workspace: activeWorkspace } = useLoaderData({
    from: '/_app/workspaces/$workspaceId/_layout',
  });

  const { data: workspaces = [] } = useWorkspaces();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
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
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='min-w-56 rounded-lg'
        align='start'
        sideOffset={4}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className='text-muted-foreground text-xs'>
            Workspaces
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        {workspaces.map((workspace) => {
          const isActive = workspace.id === activeWorkspace.id;
          return (
            <DropdownMenuItem
              key={workspace.id}
              className='gap-2 p-2'
              onClick={() => {
                if (isActive) return;

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
              <span>{workspace.name}</span>
              {isActive && <CheckIcon className='size-4 ml-auto' />}
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem className='gap-2 p-2'>
          <div className='flex size-6 items-center justify-center rounded-md border bg-transparent'>
            <Plus className='size-4' />
          </div>
          <div className='text-muted-foreground font-medium'>Add workspace</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
