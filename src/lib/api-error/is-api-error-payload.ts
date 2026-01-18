import type { ApiErrorPayload } from './api-error-payload';

export function isApiErrorPayload(body: unknown): body is ApiErrorPayload {
  return (
    typeof body === 'object' &&
    body !== null &&
    'code' in body &&
    // biome-ignore lint/suspicious/noExplicitAny: any is fine here
    typeof (body as any).code === 'string'
  );
}
