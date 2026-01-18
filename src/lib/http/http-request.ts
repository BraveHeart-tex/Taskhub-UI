import { Err, type Result } from '../result';
import type { HttpError } from './http-errors';
import { parseJson } from './parse-json';
import { safeFetch } from './safe-fetch';

export async function http<T>(
  input: string,
  init: RequestInit = {}
): Promise<Result<T, HttpError>> {
  const hasRequestBody =
    init.body !== null &&
    init.body !== undefined &&
    typeof init.body === 'string';

  const res = await safeFetch(input, {
    ...init,
    credentials: 'include',
    headers: {
      ...(hasRequestBody ? { 'Content-Type': 'application/json' } : {}),
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

  const contentType = res.value.headers.get('content-type');

  if (!contentType || !contentType.startsWith('application/json')) {
    return { ok: true, value: undefined as T };
  }

  if (res.value.status === 204 || res.value.status === 205) {
    return { ok: true, value: undefined as T };
  }

  const contentLength = res.value.headers.get('content-length');
  if (contentLength === '0') {
    return { ok: true, value: undefined as T };
  }

  return parseJson<T>(res.value);
}
