import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

export function BoardCard({
  card,
  user,
}: {
  card: {
    title: string;
    description: string | null;
  };
  user?: {
    fullName: string;
    avatarUrl: string | null;
  };
}) {
  return (
    <Card>
      <CardContent className='p-3 space-y-2'>
        <div className='text-sm font-medium'>{card.title}</div>

        {card.description && (
          <div className='text-xs text-muted-foreground'>
            {card.description}
          </div>
        )}

        {user && (
          <div className='flex items-center gap-2 pt-2'>
            <Avatar className='h-6 w-6'>
              <AvatarFallback>{user.fullName[0]}</AvatarFallback>
            </Avatar>
            <span className='text-xs'>{user.fullName}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
