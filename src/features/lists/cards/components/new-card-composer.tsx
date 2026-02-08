import { useForm, useStore } from '@tanstack/react-form';
import { XIcon } from 'lucide-react';
import type { FormEvent, Ref } from 'react';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { useComposerPrimitive } from '@/lib/hooks/use-composer-primitive';
import { useCreateCard } from '../card.mutation';
import { createCardFormSchema } from '../card.schema';

interface NewCardComposerProps {
  onCancel: () => void;
  onConfirm?: (title: string) => void;
  listId: string;
  workspaceId: string;
  boardId: string;
}

export function NewCardComposer({
  onCancel,
  onConfirm,
  listId,
  workspaceId,
  boardId,
}: NewCardComposerProps) {
  const createCardMutation = useCreateCard();

  const form = useForm({
    defaultValues: {
      title: '',
    },
    validators: {
      onChange: createCardFormSchema,
    },
    onSubmit: async ({ value }) => {
      const result = await createCardMutation.mutateAsync({
        boardId,
        title: value.title,
        workspaceId,
        listId,
      });

      if (result.ok) {
        if (typeof onConfirm === 'function') {
          onConfirm(value.title);
        }
        form.reset();
      }
    },
    onSubmitInvalid: () => {
      const InvalidInput = document.querySelector(
        '[aria-invalid="true"]'
      ) as HTMLInputElement;

      InvalidInput?.focus();
    },
  });

  const { containerRef, handleKeyDown } = useComposerPrimitive({
    value: useStore(form.store, (store) => store.values.title),
    onConfirm: (title) => {
      form.handleSubmit({ title });
    },
    onReset: () => {
      form.reset();
    },
    onCancel,
    scrollIntoView: true,
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    void form.handleSubmit();
  };

  return (
    <form
      id='create-card-form'
      onSubmit={onSubmit}
      className='space-y-1'
      ref={containerRef as Ref<HTMLFormElement>}
    >
      <FieldGroup>
        <form.Field name='title'>
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name} className='sr-only'>
                  Card Title
                </FieldLabel>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\r?\n|\r/g, ' ');
                    field.handleChange(value);
                  }}
                  onKeyDown={handleKeyDown}
                  aria-invalid={isInvalid}
                  placeholder='Enter card title...'
                  rows={1}
                  className='resize-none bg-card leading-snug'
                  autoFocus
                />
              </Field>
            );
          }}
        </form.Field>
      </FieldGroup>
      <div className='flex items-center gap-1'>
        <Button
          type='submit'
          form='create-card-form'
          disabled={createCardMutation.isPending}
        >
          {createCardMutation.isPending ? 'Adding...' : 'Add'} Card
        </Button>
        <Button
          type='button'
          variant='ghost'
          size='icon'
          onClick={() => {
            onCancel();
            form.reset();
          }}
          disabled={createCardMutation.isPending}
        >
          <XIcon />
        </Button>
      </div>
    </form>
  );
}
