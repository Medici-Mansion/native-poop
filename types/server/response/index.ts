import { ApiError } from '@/types';

export type Response<T> = {
  data: T;
  error?: ApiError;
};
