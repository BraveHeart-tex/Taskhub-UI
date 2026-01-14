import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { login, logout, signup } from './api';

export function useLogin() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.auth.me() });
    },
  });
}

export function useSignup() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: signup,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.auth.me() });
    },
  });
}

export function useLogout() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      qc.removeQueries({ queryKey: queryKeys.auth.me() });
    },
  });
}
