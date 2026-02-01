import { EmptyState } from '@/components/empty-state';
import { useModalActions } from '@/components/modal-host/modal.store';
import { Button } from '@/components/ui/button';
import { H3, Muted, Paragraph } from '@/components/ui/typography';
import { useDashboard } from '../dashboard.queries';
import { FavoritesSection } from './favorites-section';
import { WorkspaceSection } from './workspace-section';

export function BoardsPage() {
  const { openModal } = useModalActions();
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

  const handleCreateWorkspaceClick = () => {
    openModal({
      type: 'create-workspace',
    });
  };

  return (
    <div className='space-y-4'>
      <FavoritesSection favoriteBoards={favoriteBoards} />
      <section className='space-y-8'>
        <H3>Your Workspaces</H3>
        {workspaces.length === 0 ? (
          <EmptyState
            title='No Workspaces'
            action={
              <Button onClick={handleCreateWorkspaceClick}>
                Create Workspace
              </Button>
            }
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
