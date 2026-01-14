import { queryOptions } from '@tanstack/react-query';
import { getMe } from './api';

export const meQuery = () =>
  queryOptions({
    queryKey: ['me'],
    queryFn: getMe,
    retry: false,
    staleTime: 60_000,
  });
