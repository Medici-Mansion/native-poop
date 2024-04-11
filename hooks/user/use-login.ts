import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { LoginParam } from '../../types';
import { AxiosError } from 'axios';
import { LoginSuccess } from '@/types/server/auth/login';
import { api } from '@/apis';

const useLogin = (
  options?: UseMutationOptions<
    LoginSuccess,
    AxiosError<{ data: null; error: { message: string } }>,
    LoginParam
  >,
) => {
  const muation = useMutation<
    LoginSuccess,
    AxiosError<{ data: null; error: { message: string } }>,
    LoginParam
  >({
    ...options,
    mutationKey: ['login'],
    mutationFn: api.login,
  });

  return muation;
};

export default useLogin;
