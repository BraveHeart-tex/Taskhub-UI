import type { ApiErrorCode } from './api-error-codes';

export interface ApiErrorResponse {
  error: ApiErrorPayload;
}

export interface ApiErrorPayload {
  code: ApiErrorCode;
  message?: string;
}
