import { EmptyState } from '@/components/empty-state';
import { H3, Muted, Paragraph } from '@/components/ui/typography';
import { useDashboard } from '../dashboard.queries';
import { FavoritesSection } from './favorites-section';
import { WorkspaceSection } from './workspace-section';

export function BoardsPage() {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) {
    return (
      <div className='space-y-2'>
        <H3>Boards</H3>
        <Muted>Loading your workspaces…</Muted>
      </div>
    );
  }

  if (isError || !data) {
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

  const workspacesToBoards = Object.groupBy(
    boards,
    (board) => board.workspaceId
  );

  const favoriteBoards = boards.filter((board) => board.isFavorited);

  return (
    <div className='space-y-4'>
      <FavoritesSection favoriteBoards={favoriteBoards} />

      <section className='space-y-8'>
        <H3>Your Workspaces</H3>

        {workspaces.length === 0 ? (
          <EmptyState
            title='No Workspaces'
            description='Create a workspace to get started.'
          />
        ) : (
          workspaces.map((workspace) => (
            <WorkspaceSection
              key={workspace.id}
              workspace={workspace}
              boards={workspacesToBoards[workspace.id] ?? []}
            />
          ))
        )}
      </section>
    </div>
  );
}
