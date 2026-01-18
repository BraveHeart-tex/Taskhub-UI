import type { ZodError, z } from 'zod';
import { Err, Ok, type Result } from '../result';

export function parseWithSchema<Schema extends z.ZodType, E>(
  schema: Schema,
  value: unknown,
  onError: (error: ZodError) => E
): Result<Schema['_output'], E> {
  const parsed = schema.safeParse(value);

  if (!parsed.success) {
    return Err(onError(parsed.error));
  }

  return Ok(parsed.data);
}
