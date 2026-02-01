import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { unwrapResult } from '@/lib/result';
import { getDashboard } from './dashboard.api';

export function useDashboard() {
  return useQuery({
    queryKey: queryKeys.me.dashboard(),
    queryFn: async () => {
      const result = await getDashboard();
      return unwrapResult(result);
    },
  });
}
