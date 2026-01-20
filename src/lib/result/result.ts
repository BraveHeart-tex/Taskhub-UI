export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

export const Ok = <T>(value: T): Result<T, never> => ({
  ok: true,
  value,
});

export const Err = <E>(error: E): Result<never, E> => ({
  ok: false,
  error,
});

export function unwrapResult<T, E>(result: Result<T, E>): T {
  if (!result.ok) {
    throw result.error;
  }

  return result.value;
}
