import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

interface CardItemProps {
  card: {
    title: string;
    description: string | null;
  };
  user?: {
    fullName: string;
    avatarUrl: string | null;
  };
}

export function CardItem({ card, user }: CardItemProps) {
  return (
    <Card className='group cursor-pointer border-none bg-card shadow-sm transition-shadow hover:shadow-md'>
      <CardContent className='space-y-2'>
        <div className='text-sm leading-snug text-card-foreground'>
          {card.title}
        </div>

        <div className='flex -space-x-1.5'>
          {user && (
            <div className='flex items-center gap-2 pt-2 ml-auto'>
              <Avatar className='h-6 w-6'>
                <AvatarFallback className='text-xs font-semibold'>
                  {user.fullName[0]}
                </AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
