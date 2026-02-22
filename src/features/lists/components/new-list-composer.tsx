import { useForm, useStore } from '@tanstack/react-form';
import { PlusIcon, XIcon } from 'lucide-react';
import { type FormEvent, type Ref, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { useComposerPrimitive } from '@/lib/hooks/use-composer-primitive';
import { useCreateList } from '../list.mutations';
import { createListFormSchema } from '../list.schema';

interface NewListComposerProps {
  label: string;
  boardId: string;
}

export function NewListComposer({ label, boardId }: NewListComposerProps) {
  const createListMutation = useCreateList();
  const [showForm, setShowForm] = useState(false);
  const titleRef = useRef<HTMLTextAreaElement>(null);

  const form = useForm({
    defaultValues: {
      title: '',
    },
    validators: {
      onChange: createListFormSchema,
    },
    onSubmit: async ({ value }) => {
      const result = await createListMutation.mutateAsync({
        title: value.title,
        boardId,
      });

      if (result.ok) {
        form.reset();
        titleRef.current?.focus();
      }
    },
    onSubmitInvalid: () => {
      const invalidInput = document.querySelector(
        '[aria-invalid="true"]'
      ) as HTMLInputElement;

      invalidInput?.focus();
    },
  });

  const { containerRef, handleKeyDown } = useComposerPrimitive({
    value: useStore(form.store, (store) => store.values.title),
    onConfirm: (title) => {
      form.handleSubmit({ title });
    },
    onCancel: () => setShowForm(false),
    onReset: () => form.reset(),
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    void form.handleSubmit();
  };

  if (showForm) {
    return (
      <Card
        className='w-72 shrink-0 h-max py-2'
        ref={containerRef as Ref<HTMLDivElement>}
      >
        <CardContent className='max-h-max'>
          <form id='create-list-form' onSubmit={onSubmit} className='space-y-1'>
            <FieldGroup>
              <form.Field name='title'>
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name} className='sr-only'>
                        List Title
                      </FieldLabel>
                      <Textarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => {
                          const value = e.target.value.replace(
                            /\r?\n|\r/g,
                            ' '
                          );
                          field.handleChange(value);
                        }}
                        onKeyDown={handleKeyDown}
                        aria-invalid={isInvalid}
                        placeholder='Enter list title...'
                        rows={1}
                        className='resize-none bg-card leading-snug'
                        autoFocus
                        ref={titleRef}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </FieldGroup>
            <div className='flex items-center gap-1'>
              <Button
                type='submit'
                form='create-list-form'
                disabled={createListMutation.isPending}
              >
                {createListMutation.isPending ? 'Adding...' : 'Add'} List
              </Button>
              <Button
                type='button'
                variant='ghost'
                size='icon'
                onClick={() => {
                  setShowForm(false);
                  form.reset();
                }}
                disabled={createListMutation.isPending}
              >
                <XIcon />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Button
      className='w-72 shrink-0 rounded-xl text-sm font-semibold leading-none gap-2 p-3 h-12'
      variant='outline'
      onClick={() => setShowForm(true)}
    >
      <PlusIcon /> {label}
    </Button>
  );
}
