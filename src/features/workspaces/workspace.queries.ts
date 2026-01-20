import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { unwrapResult } from '@/lib/result';
import { listWorkspaces } from './workspace.api';

export function useWorkspaces() {
  return useQuery({
    queryKey: queryKeys.workspaces.list(),
    queryFn: async () => {
      const result = await listWorkspaces();
      return unwrapResult(result);
    },
  });
}
