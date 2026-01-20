import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { login, logout, signup } from './auth.api';

export function useLogin() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: (result) => {
      if (result.ok) {
        qc.invalidateQueries({ queryKey: queryKeys.auth.me() });
      }
    },
  });
}

export function useSignup() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: signup,
    onSuccess: (result) => {
      if (result.ok) {
        qc.invalidateQueries({ queryKey: queryKeys.auth.me() });
      }
    },
  });
}

export function useLogout() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: (result) => {
      if (result.ok) {
        qc.removeQueries({ queryKey: queryKeys.auth.me() });
      }
    },
  });
}
