import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login, logout, signup } from './api';

export function useLogin() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['me'] });
    },
  });
}

export function useSignup() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: signup,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['me'] });
    },
  });
}

export function useLogout() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      qc.removeQueries({ queryKey: ['me'] });
    },
  });
}
