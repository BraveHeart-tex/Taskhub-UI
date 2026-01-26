import { ResponsiveDialog } from '@/components/responsive-dialog';
import { Button } from '@/components/ui/button';

interface CreateBoardDialogProps {
  open: boolean;
  workspaceId: string;
  onOpenChange: (open: boolean) => void;
}

export function CreateBoardDialog({
  open,
  workspaceId,
  onOpenChange,
}: CreateBoardDialogProps) {
  return (
    <ResponsiveDialog
      title='Create Board'
      description='Use the form below to create a board'
      open={open}
      onOpenChange={onOpenChange}
      footer={
        <>
          <Button
            type='button'
            variant='secondary'
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type='submit' form='create-workspace-form'>
            Create Board
          </Button>
        </>
      }
    >
      form test
    </ResponsiveDialog>
  );
}
