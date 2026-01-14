import { ApiError } from './api-error';

// biome-ignore lint/suspicious/noExplicitAny: any is acceptable here
export function mapApiError(status: number, body: any): ApiError {
  if (body?.code && body?.message) {
    return new ApiError(status, body.code, body.message, body.details);
  }

  if (status === 401) {
    return new ApiError(status, 'UNAUTHENTICATED', 'Not authenticated');
  }

  return new ApiError(status, 'UNKNOWN_ERROR', 'An unexpected error occurred');
}
