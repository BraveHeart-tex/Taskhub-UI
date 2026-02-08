import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';

interface BoardTitleProps {
  title: string;
  onUpdate?: (newTitle: string) => void;
}

export function BoardTitle({ title, onUpdate }: BoardTitleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentTitle(title);
  }, [title]);

  const handleBlur = () => {
    setIsEditing(false);
    if (currentTitle !== title) {
      onUpdate?.(currentTitle);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      inputRef.current?.blur();
    }
    if (event.key === 'Escape') {
      setCurrentTitle(title);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className='flex items-center'>
        <Input
          ref={inputRef}
          value={currentTitle}
          onChange={(e) => setCurrentTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          className='h-8 px-2 text-xl font-semibold focus-visible:ring-1 focus-visible:ring-offset-0'
        />
      </div>
    );
  }

  return (
    <div className='group flex items-center cursor-pointer rounded-md border border-transparent hover:bg-muted/50 transition-colors px-2 -ml-2'>
      <Typography
        variant='h3'
        as='h1'
        className='select-none'
        onClick={() => setIsEditing(true)}
      >
        {currentTitle}
      </Typography>
    </div>
  );
}
