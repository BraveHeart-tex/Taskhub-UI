import type { ApiErrorResponse } from './api-error-payload';

export function isApiErrorPayload(body: unknown): body is ApiErrorResponse {
  if (typeof body !== 'object' || body === null) return false;
  if (!('error' in body)) return false;

  // biome-ignore lint/suspicious/noExplicitAny: any is fine here
  const error = (body as any).error;
  return (
    typeof error === 'object' &&
    error !== null &&
    typeof error.code === 'string'
  );
}
