export const DEFAULT_ERROR_MESSAGE = 'Something went wrong.';

export interface ApiError {
  message: string;
}

export const defaultApiError = (): ApiError => ({
  message: DEFAULT_ERROR_MESSAGE,
});
