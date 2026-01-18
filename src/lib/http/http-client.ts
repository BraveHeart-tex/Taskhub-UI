import { http } from './http-request';

export const httpClient = {
  get: <T>(url: string) => http<T>(url),
  post: <T>(url: string, body?: unknown) =>
    http<T>(url, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),
  patch: <T>(url: string, body?: unknown) =>
    http<T>(url, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    }),
  delete: <T>(url: string) =>
    http<T>(url, { method: 'DELETE', body: undefined }),
};
