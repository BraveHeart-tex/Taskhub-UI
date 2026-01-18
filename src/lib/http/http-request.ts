import { Err, type Result } from '../result';
import type { HttpError } from './http-errors';
import { parseJson } from './parse-json';
import { safeFetch } from './safe-fetch';

export async function http<T>(
  input: string,
  init: RequestInit = {}
): Promise<Result<T, HttpError>> {
  const hasBody =
    (init.body !== null || init.body !== undefined) &&
    typeof init.body === 'string';

  const res = await safeFetch(input, {
    ...init,
    credentials: 'include',
    headers: {
      ...(hasBody ? { 'Content-Type': 'application/json' } : {}),
      ...init.headers,
    },
  });

  if (!res.ok) return res;

  if (!res.value.ok) {
    let body: unknown = null;
    try {
      body = await res.value.json();
    } catch {}

    return Err<HttpError>({
      type: 'HttpError',
      status: res.value.status,
      body,
    });
  }

  return parseJson<T>(res.value);
}
