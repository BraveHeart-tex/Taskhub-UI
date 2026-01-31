import { useForm } from '@tanstack/react-form';
import { useRouter } from '@tanstack/react-router';
import type { FormEvent } from 'react';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { showErrorToast, showSuccessToast } from '@/shared/toast-helpers';
import { useCreateBoard } from '../board.mutations';
import { createBoardInputSchema } from '../board.schema';

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
  const createBoardMutation = useCreateBoard();
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      title: '',
    },
    validators: {
      onChange: createBoardInputSchema,
    },
    onSubmit: async ({ value }) => {
      const result = await createBoardMutation.mutateAsync({
        workspaceId,
        title: value.title,
      });
      if (!result.ok) {
        if (result.error.type === 'DuplicateTitle') {
          showErrorToast('Board title already exists');
          return;
        }

        showErrorToast('Failed to create board');
        return;
      }

      showSuccessToast('Board created successfully');
      onOpenChange(false);
      await router.navigate({
        to: '/workspaces/$workspaceId/boards/$boardId',
        params: {
          workspaceId,
          boardId: result.value.id,
        },
      });
    },
    onSubmitInvalid: () => {
      const InvalidInput = document.querySelector(
        '[aria-invalid="true"]'
      ) as HTMLInputElement;

      InvalidInput?.focus();
    },
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    void form.handleSubmit();
  };

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
          <Button type='submit' form='create-board-form'>
            Create Board
          </Button>
        </>
      }
    >
      <form id='create-board-form' onSubmit={onSubmit} className='space-y-4'>
        <FieldGroup>
          <form.Field name='title'>
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Workspace Name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type='text'
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder='Engineering Board'
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>
      </form>
    </ResponsiveDialog>
  );
}
