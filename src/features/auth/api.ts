import { endpoints } from '@/lib/endpoints';
import { httpClient } from '@/lib/http-client';
import { type SignupInput, userSchema } from './schemas';

export async function login(input: { email: string; password: string }) {
  return httpClient.post<void>(endpoints.auth.login, input);
}

export async function signup(input: SignupInput) {
  return httpClient.post<void>(endpoints.auth.signup, input);
}

export async function logout() {
  return httpClient.delete<void>(endpoints.auth.logout);
}

export async function getMe() {
  const data = await httpClient.get<unknown>(endpoints.auth.me);

  return data ? userSchema.parse(data) : null;
}
