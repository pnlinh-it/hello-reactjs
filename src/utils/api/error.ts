import axios from 'axios';
import { ApiError, DEFAULT_ERROR_MESSAGE, defaultApiError } from '../../common/api/ApiError';

const parseApiError = (error: unknown): ApiError => {
  if (!axios.isAxiosError(error)) {
    return defaultApiError();
  }

  return { message: error?.response?.data?.message || DEFAULT_ERROR_MESSAGE };
};

export { parseApiError };
