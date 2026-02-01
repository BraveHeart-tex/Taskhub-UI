import type { Dashboard } from '../dashboard.schema';
import { BoardGrid } from './board-grid';
import { WorkspaceHeader } from './workspace-header';

type Props = {
  workspace: Dashboard['workspaces'][number];
  boards: Dashboard['boards'];
};

export function WorkspaceSection({ workspace, boards }: Props) {
  return (
    <article className='space-y-4'>
      <WorkspaceHeader workspace={workspace} />
      <BoardGrid workspaceId={workspace.id} boards={boards} />
    </article>
  );
}
