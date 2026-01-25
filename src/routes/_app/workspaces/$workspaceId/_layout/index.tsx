import { createFileRoute, Link, useLoaderData } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';
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

export const Route = createFileRoute('/_app/workspaces/$workspaceId/_layout/')({
  component: WorkspaceHomePage,
});

const recentBoards = [
  { id: 'b1', title: 'Product Roadmap' },
  { id: 'b2', title: 'Sprint Planning' },
  { id: 'b3', title: 'Bug Triage' },
];

function WorkspaceHomePage() {
  const { workspace } = useLoaderData({
    from: '/_app/workspaces/$workspaceId/_layout',
  });
  return (
    <div className='space-y-8'>
      <section className='flex items-start justify-between gap-4'>
        <div className='space-y-2'>
          <div className='flex items-center gap-2'>
            <H2> {workspace.name}</H2>
            {workspace.isCurrentUserOwner && (
              <Badge variant='secondary'>Owner</Badge>
            )}
          </div>

          <div className='flex items-center gap-3 text-sm text-muted-foreground'>
            <div className='flex -space-x-2'>
              {/*{workspace.membersPreview.map((member) => (
                <Avatar key={member.id} className='h-7 w-7 border'>
                  <AvatarImage src={member.avatarUrl ?? undefined} />
                  <AvatarFallback>
                    {member.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ))}*/}
            </div>
            {/*<span>{workspace.memberCount} members</span>*/}
          </div>
        </div>

        <div className='flex gap-2 items-center'>
          <Button>
            <PlusIcon />
            Create board
          </Button>
          {workspace.isCurrentUserOwner && (
            <Button variant='outline'>Invite members</Button>
          )}
        </div>
      </section>

      <section className='space-y-4'>
        <div className='flex items-center justify-between'>
          <H4>Recent Boards</H4>
          <Button
            variant='ghost'
            size='sm'
            render={
              <Link
                to='/workspaces/$workspaceId/boards'
                params={{ workspaceId: workspace.id }}
              >
                View all
              </Link>
            }
          />
        </div>

        {recentBoards.length === 0 ? (
          <Card className='border-dashed'>
            <CardContent className='flex flex-col items-center justify-center py-12 text-center'>
              <p className='text-sm text-muted-foreground'>
                No boards yet in this workspace
              </p>
              <Button className='mt-4'>
                <PlusIcon className='mr-2 h-4 w-4' />
                Create your first board
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {recentBoards.map((board) => (
              <Link
                key={board.id}
                to='/workspaces/$workspaceId/boards/$boardId'
                params={{ workspaceId: workspace.id, boardId: board.id }}
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
