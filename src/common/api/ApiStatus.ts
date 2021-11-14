export enum ApiStatus {
  IDLE = 'idle',
  LOADING = 'loading',
}

export const isLoading = (status: ApiStatus): boolean => status === ApiStatus.LOADING;
