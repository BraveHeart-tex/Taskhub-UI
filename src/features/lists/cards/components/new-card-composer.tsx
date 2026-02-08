import { useForm } from '@tanstack/react-form';
import { XIcon } from 'lucide-react';
import { type FormEvent, type KeyboardEvent, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
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

  const formRef = useRef<HTMLFormElement>(null);

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

  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'instant' });
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        onCancel();
        form.reset();
      }
    };

    document.addEventListener('mousedown', handleClickOutside, true);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, [onCancel, form]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    void form.handleSubmit();
  };

  const handleKeydown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    const value = form.getFieldValue('title');

    if (event.key === 'Enter') {
      if (value.trim().length > 0) {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit({ title: value });
      } else {
        event.preventDefault();
        event.stopPropagation();
        onCancel();
        form.reset();
      }
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      onCancel();
      form.reset();
    }
  };

  return (
    <form
      id='create-card-form'
      onSubmit={onSubmit}
      className='space-y-1'
      ref={formRef}
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
                  onKeyDown={handleKeydown}
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
