import { httpClient } from '@/lib/http-client';
import { userSchema } from './schemas';

export async function login(input: { email: string; password: string }) {
  return httpClient.post<void>('/api/auth/login', input);
}

export async function signup(input: {
  email: string;
  password: string;
  name: string;
}) {
  return httpClient.post<void>('/api/auth/signup', input);
}

export async function logout() {
  return httpClient.delete<void>('/api/auth/logout');
}

export async function getMe() {
  const data = await httpClient.get<unknown>('/api/auth/me');

  return data ? userSchema.parse(data) : null;
}
