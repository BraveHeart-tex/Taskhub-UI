import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { createWorkspace } from './workspace.api';

export function useCreateWorkspace() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createWorkspace,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.workspaces.list() });
    },
  });
}
