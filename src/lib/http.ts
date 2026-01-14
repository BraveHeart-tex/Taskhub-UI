import { API_BASE_URL } from './api-config';
import { mapApiError } from './map-api-error';

interface HttpOptions extends RequestInit {
  parseJson?: boolean;
}

function resolveUrl(path: string): string {
  if (path.startsWith('http')) {
    return path;
  }

  return `${API_BASE_URL}${path}`;
}

export async function http<T>(
  input: string,
  options: HttpOptions = {}
): Promise<T> {
  if (import.meta.env.DEV && !input.startsWith('/')) {
    console.warn(`HTTP call without leading slash: ${input}`);
  }

  const { parseJson = true, ...init } = options;

  const res = await fetch(resolveUrl(input), {
    ...init,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...init.headers,
    },
  });

  const body = parseJson ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    throw mapApiError(res.status, body);
  }

  return body as T;
}
