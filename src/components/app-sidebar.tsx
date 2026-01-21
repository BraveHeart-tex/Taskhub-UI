import { Link, useRouteContext } from '@tanstack/react-router';
import { CogIcon, SquareDashedKanban, UsersIcon } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { SidebarUserMenu } from './sidebar-user-menu';
import { WorkplaceSwitcher } from './workplace-switcher';

export function AppSidebar() {
  const { workspace } = useRouteContext({
    from: '/_app/workspaces/$workspaceId/',
  });

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <WorkplaceSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {workspace !== undefined ? (
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    render={
                      <Link
                        to='/workspaces/$workspaceId/boards'
                        preload='intent'
                        params={{ workspaceId: workspace.id }}
                      >
                        <SquareDashedKanban />
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
                        preload='intent'
                        params={{ workspaceId: workspace.id }}
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
                          params={{ workspaceId: workspace.id }}
                        >
                          <CogIcon />
                          <span>Settings</span>
                        </Link>
                      }
                    />
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : null}
      </SidebarContent>
      <SidebarFooter>
        <SidebarUserMenu />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
