import { Err, Ok } from '../result';
import type { HttpError } from './http-errors';

export async function parseJson<T>(res: Response) {
  try {
    const json = await res.json();
    return Ok(json as T);
  } catch {
    return Err<HttpError>({
      type: 'DecodeError',
      message: 'Invalid JSON response',
      body: null,
    });
  }
}
