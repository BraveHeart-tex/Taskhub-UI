export const API_ERROR_CODES = {
  AUTH: {
    ALREADY_AUTHENTICATED: 'ALREADY_AUTHENTICATED',
    EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
    INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
    VALIDATION_FAILED: 'VALIDATION_FAILED',
  },
} as const;

type ErrorDomains = typeof API_ERROR_CODES;
type DomainErrors = ErrorDomains[keyof ErrorDomains];
export type ApiErrorCode = DomainErrors[keyof DomainErrors];
