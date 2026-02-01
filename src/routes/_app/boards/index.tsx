import { createFileRoute, Link } from '@tanstack/react-router';
import { CogIcon, SquareKanbanIcon, StarIcon, UserIcon } from 'lucide-react';
import { EmptyState } from '@/components/empty-state';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button.variants';
import { Card, CardContent } from '@/components/ui/card';
import { H3, H4, Muted, Paragraph } from '@/components/ui/typography';
import { useDashboard } from '@/features/dashboard/dashboard.queries';
import type { Dashboard } from '@/features/dashboard/dashboard.schema';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/_app/boards/')({
  component: BoardsRoute,
});

function BoardsRoute() {
  const { data, isLoading, isError } = useDashboard();
  if (isLoading) {
    // TODO: adjust the shell to fit the layout structure
    return (
      <div className='space-y-2'>
        <H3>Boards</H3>
        <Muted>Loading your workspaces…</Muted>
      </div>
    );
  }

  if (isError || !data) {
    // TODO: adjust the shell to fit the layout structure
    return (
      <div className='space-y-2'>
        <H3>Boards</H3>
        <Paragraph color='destructive'>
          Failed to load your dashboard.
        </Paragraph>
      </div>
    );
  }

  const { workspaces, boards } = data;

  const workspacesToBoards = workspaces.reduce(
    (acc, workspace) => {
      acc[workspace.id] = boards.filter(
        (board) => board.workspaceId === workspace.id
      );
      return acc;
    },
    {} as Record<string, Dashboard['boards']>
  );

  return (
    <div className='space-y-4'>
      {data.favorites.length > 0 && (
        <section className='space-y-2'>
          <div className='flex items-center gap-2'>
            <StarIcon className='size-4' />
            <H3>Favorite Boards</H3>
          </div>
        </section>
      )}
      <section className='space-y-8'>
        <H3>Your Workspaces</H3>
        {workspaces.length === 0 ? (
          <EmptyState
            title='No Workspaces'
            description='Create a workspace to get started.'
          />
        ) : (
          workspaces.map((workspace) => (
            <article key={workspace.id} className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <div className='rounded-md size-8 uppercase bg-primary text-primary-foreground font-semibold text-lg flex items-center justify-center'>
                    {workspace.name[0]}
                  </div>
                  <H4>{workspace.name}</H4>
                </div>
                <div className='flex items-center gap-2'>
                  <Link
                    to='/workspaces/$workspaceId/boards'
                    className={cn(
                      buttonVariants({
                        variant: 'secondary',
                        className: 'gap-2',
                      })
                    )}
                    params={{
                      workspaceId: workspace.id,
                    }}
                  >
                    <Button variant='secondary'>
                      <SquareKanbanIcon />
                      Boards
                    </Button>
                  </Link>

                  <Link
                    to='/workspaces/$workspaceId/members'
                    className={cn(
                      buttonVariants({
                        variant: 'secondary',
                        className: 'gap-2',
                      })
                    )}
                    params={{
                      workspaceId: workspace.id,
                    }}
                  >
                    <UserIcon />
                    Members
                  </Link>
                  <Link
                    to='/workspaces/$workspaceId/settings'
                    className={cn(
                      buttonVariants({
                        variant: 'secondary',
                        className: 'gap-2',
                      })
                    )}
                    params={{
                      workspaceId: workspace.id,
                    }}
                  >
                    <CogIcon />
                    Settings
                  </Link>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-2 md:grid-cols-4'>
                {workspacesToBoards[workspace.id].map((board) => (
                  <Link
                    key={board.id}
                    to='/workspaces/$workspaceId/boards/$boardId'
                    params={{ workspaceId: workspace.id, boardId: board.id }}
                  >
                    <Card>
                      <CardContent>{board.title}</CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
