import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import LoginAPIs from '../../apis/login/index';
import { LoginParam } from '../../types';
import { AxiosError } from 'axios';
import { LoginSuccess } from '@/types/server/auth/login';

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
    mutationFn: (param: LoginParam) => LoginAPIs.login(param),
  });

  return muation;
};

export default useLogin;
