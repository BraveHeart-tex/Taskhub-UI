import { useForm } from '@tanstack/react-form';
import { useRouter } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
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
import { useCreateWorkspace } from '../workspace.mutations';
import { createWorkspaceInputSchema } from '../workspace.schemas';

interface CreateWorkspaceFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateWorkspaceFormDialog = ({
  open,
  onOpenChange,
}: CreateWorkspaceFormDialogProps) => {
  const router = useRouter();
  const createWorkspaceMutate = useCreateWorkspace();
  const form = useForm({
    defaultValues: {
      name: '',
    },
    validators: {
      onChange: createWorkspaceInputSchema,
    },
    onSubmit: async ({ value }) => {
      const result = await createWorkspaceMutate.mutateAsync(value);
      if (!result.ok) {
        showErrorToast('An error occurred while creating the workspace');
        return;
      }

      showSuccessToast('Workspace created successfully');
      await router.navigate({
        to: '/workspaces/$workspaceId',
        params: {
          workspaceId: result.value.id,
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
      title='Create Workspace'
      description='Use the form below to create a new workspace'
      open={open}
      onOpenChange={onOpenChange}
      footer={
        <>
          <Button
            type='button'
            variant='secondary'
            onClick={() => {
              onOpenChange(false);
            }}
            disabled={createWorkspaceMutate.isPending}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            form='create-workspace-form'
            disabled={createWorkspaceMutate.isPending}
          >
            {createWorkspaceMutate.isPending && (
              <Loader2 className='animate-spin' />
            )}
            {createWorkspaceMutate.isPending ? 'Creating...' : 'Create'}{' '}
            Workspace
          </Button>
        </>
      }
    >
      <form
        id='create-workspace-form'
        onSubmit={onSubmit}
        className='space-y-4'
      >
        <FieldGroup>
          <form.Field name='name'>
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
                    placeholder='Acme Inc.'
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
};
