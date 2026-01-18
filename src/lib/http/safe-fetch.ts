import { Err, Ok } from '../result';
import type { HttpError } from './http-errors';

export async function safeFetch(input: string, init: RequestInit) {
  try {
    const res = await fetch(input, init);
    return Ok(res);
  } catch (e) {
    return Err<HttpError>({
      type: 'NetworkError',
      message: e instanceof Error ? e.message : 'Unknown network error',
    });
  }
}
