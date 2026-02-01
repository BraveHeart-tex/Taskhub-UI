import { StarIcon } from 'lucide-react';
import { H3 } from '@/components/ui/typography';
import type { Dashboard } from '../dashboard.schema';

interface FavoritesSectionProps {
  favorites: Dashboard['favorites'];
}

export function FavoritesSection({ favorites }: FavoritesSectionProps) {
  if (favorites.length === 0) return null;

  return (
    <section className='space-y-2'>
      <div className='flex items-center gap-2'>
        <StarIcon className='size-4' />
        <H3>Favorite Boards</H3>
      </div>
    </section>
  );
}
