import { Link, useParams } from '@tanstack/react-router';
import { Columns3Icon, SettingsIcon, UsersIcon } from 'lucide-react';
import { SidebarUserMenu } from '@/components/sidebar-user-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import type { WorkspaceContextDto } from '../workspace.schemas';
import { WorkspaceSwitcher } from './workspace-switcher';

interface WorkspaceSidebarProps {
  workspace: WorkspaceContextDto;
}

export function WorkspaceSidebar({ workspace }: WorkspaceSidebarProps) {
  const { workspaceId } = useParams({
    from: '/_app/workspaces/$workspaceId/_layout',
  });

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <WorkspaceSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                render={
                  <Link
                    to='/workspaces/$workspaceId/boards'
                    params={{ workspaceId }}
                  >
                    <Columns3Icon />
                    <span>Boards</span>
                  </Link>
                }
              />
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                render={
                  <Link
                    to='/workspaces/$workspaceId/members'
                    params={{ workspaceId }}
                  >
                    <UsersIcon />
                    <span>Members</span>
                  </Link>
                }
              />
            </SidebarMenuItem>
            {workspace.isCurrentUserOwner && (
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={
                    <Link
                      to='/workspaces/$workspaceId/settings'
                      params={{ workspaceId }}
                    >
                      <SettingsIcon />
                      <span>Settings</span>
                    </Link>
                  }
                />
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarUserMenu />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
