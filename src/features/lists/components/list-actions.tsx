import { MoreHorizontalIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ListActionsProps {
  onAddCard: () => void;
}

export function ListActions({ onAddCard }: ListActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant='ghost' size='icon' className='h-7 w-7'>
            <MoreHorizontalIcon />
          </Button>
        }
      />
      <DropdownMenuContent className='w-72'>
        <DropdownMenuGroup className='space-y-2'>
          <DropdownMenuLabel className='text-center'>
            List Actions
          </DropdownMenuLabel>
          <DropdownMenuItem onClick={onAddCard}>Add card</DropdownMenuItem>
          <DropdownMenuItem>Copy list</DropdownMenuItem>
          <DropdownMenuItem>Archive list</DropdownMenuItem>
          <DropdownMenuItem>Archive all cards in list</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
