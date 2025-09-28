export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: unknown;
}

export interface ErrorState {
  hasError: boolean;
  error: ApiError | null;
  retryCount: number;
}

export enum ErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export interface ErrorHandler {
  handle: (error: unknown) => ApiError;
  shouldRetry: (error: ApiError, retryCount: number) => boolean;
  getRetryDelay: (retryCount: number) => number;
}
