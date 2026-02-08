import { type RefObject, useEffect, useRef } from 'react';

interface UseComposerPrimitiveOptions {
  /** Current field value */
  value: string;

  /** Called when user confirms (Enter with non-empty value) */
  onConfirm: (value: string) => void;

  /** Called when user cancels (Escape, outside click, empty Enter) */
  onCancel: () => void;

  /** Reset logic (usually form.reset) */
  onReset: () => void;

  /** Enable click-outside behavior */
  closeOnOutsideClick?: boolean;

  /** Scroll container into view on mount */
  scrollIntoView?: boolean;

  scrollContainerRef?: RefObject<HTMLElement | null>;
}

export function useComposerPrimitive({
  value,
  onConfirm,
  onCancel,
  onReset,
  closeOnOutsideClick = true,
  scrollIntoView = false,
  scrollContainerRef,
}: UseComposerPrimitiveOptions) {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (
      !scrollContainerRef?.current ||
      !containerRef.current ||
      !scrollIntoView
    )
      return;

    const container = scrollContainerRef.current;

    const el = containerRef.current;

    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    if (elRect.bottom > containerRect.bottom) {
      container.scrollTop += elRect.bottom - containerRect.bottom;
    }
  }, [scrollContainerRef?.current, scrollIntoView]);

  useEffect(() => {
    if (!closeOnOutsideClick) return;

    const handleMouseDown = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onCancel();
        onReset();
      }
    };

    document.addEventListener('mousedown', handleMouseDown, true);
    return () =>
      document.removeEventListener('mousedown', handleMouseDown, true);
  }, [closeOnOutsideClick, onCancel, onReset]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();

      if (value.trim().length > 0) {
        onConfirm(value);
      } else {
        onCancel();
        onReset();
      }
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      onCancel();
      onReset();
    }
  };

  return {
    containerRef,
    handleKeyDown,
  };
}
