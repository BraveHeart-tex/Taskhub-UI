import { CreateBoardDialog } from '@/features/boards/components/create-board-dialog';
import { CreateWorkspaceFormDialog } from '@/features/workspaces/components/create-workspace-form';
import { useActiveModal, useModalActions } from './modal.store';

export function ModalHost() {
  const modal = useActiveModal();
  const { closeModal } = useModalActions();

  if (!modal) return null;

  switch (modal.type) {
    case 'create-workspace':
      return <CreateWorkspaceFormDialog open onOpenChange={closeModal} />;
    case 'create-board':
      return (
        <CreateBoardDialog
          open
          onOpenChange={closeModal}
          workspaceId={modal.workspaceId}
        />
      );

    default:
      return null;
  }
}
