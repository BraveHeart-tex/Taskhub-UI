import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';
import { useModalActions } from '@/components/modal-host/modal.store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { H2, H4 } from '@/components/ui/typography';
import { getWorkspaceSummary } from '@/features/workspaces/workspace.api';

export const Route = createFileRoute('/_app/workspaces/$workspaceId/_layout/')({
  loader: async ({ params }) => {
    const result = await getWorkspaceSummary(params.workspaceId);
    if (!result.ok) {
      throw redirect({ to: '/workspaces' });
    }

    return {
      workspaceSummary: result.value,
    };
  },
  component: WorkspaceHomePage,
});

function WorkspaceHomePage() {
  const { workspaceSummary } = Route.useLoaderData();
  const { openModal } = useModalActions();

  const openCreateBoardModal = () => {
    openModal({
      type: 'create-board',
      workspaceId: workspaceSummary.id,
    });
  };

  return (
    <div className='space-y-8'>
      <section className='flex items-start justify-between gap-4 flex-wrap'>
        <div className='space-y-2'>
          <div className='flex items-center gap-2'>
            <H2> {workspaceSummary.name}</H2>
            {workspaceSummary.isCurrentUserOwner && (
              <Badge variant='secondary'>Owner</Badge>
            )}
          </div>

          <div className='flex items-center gap-3 text-sm text-muted-foreground'>
            <div className='flex -space-x-2'>
              {workspaceSummary.membersPreview.map((member) => (
                <Avatar key={member.id} className='h-7 w-7 border'>
                  <AvatarImage src={member.avatarUrl ?? undefined} />
                  <AvatarFallback>
                    {member.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span>
              {workspaceSummary.memberCount}{' '}
              {workspaceSummary.memberCount === 1 ? 'member' : 'members'}
            </span>
          </div>
        </div>

        <div className='flex gap-2 items-center'>
          <Button onClick={openCreateBoardModal}>
            <PlusIcon />
            Create board
          </Button>
          {workspaceSummary.isCurrentUserOwner && (
            <Button variant='outline'>Invite members</Button>
          )}
        </div>
      </section>

      <section className='space-y-4'>
        <div className='flex items-center justify-between'>
          <H4>Recent Boards</H4>
          {workspaceSummary.recentBoards.length > 0 && (
            <Button
              variant='ghost'
              size='sm'
              render={
                <Link
                  to='/workspaces/$workspaceId/boards'
                  params={{ workspaceId: workspaceSummary.id }}
                >
                  View all
                </Link>
              }
            />
          )}
        </div>

        {workspaceSummary.recentBoards.length === 0 ? (
          <Card className='border-dashed'>
            <CardContent className='flex flex-col items-center justify-center py-12 text-center'>
              <p className='text-sm text-muted-foreground'>
                No boards yet in this workspace
              </p>
              <Button className='mt-4' onClick={openCreateBoardModal}>
                <PlusIcon />
                Create your first board
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {workspaceSummary.recentBoards.map((board) => (
              <Link
                key={board.id}
                to='/workspaces/$workspaceId/boards/$boardId'
                params={{ workspaceId: workspaceSummary.id, boardId: board.id }}
              >
                <Card className='hover:bg-muted/50 transition-colors cursor-pointer'>
                  <CardHeader>
                    <CardTitle className='text-base'>{board.title}</CardTitle>
                    <CardDescription>Updated recently</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
