import type { ApiErrorCode } from './api-error-codes';

export interface ApiErrorPayload {
  code: ApiErrorCode;
  message?: string;
}
