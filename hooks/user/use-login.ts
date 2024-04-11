import { useMutation } from '@tanstack/react-query';
import LoginAPIs from '../../apis/login/index';
import { LoginParam, SuccessLoginRes } from '../../types';
import { AxiosError } from 'axios';

const useLogin = () => {
  const {
    mutate,
    data: mutationData,
    isSuccess,
    isPending,
    error: mutationError,
  } = useMutation<SuccessLoginRes, AxiosError, LoginParam>({
    mutationKey: ['login'],
    mutationFn: (param: LoginParam) => LoginAPIs.login(param),
    onSuccess(data) {
      console.log('SUCCESS', data);
    },
    onError(error) {
      console.log(error, 'error');
    },
  });

  return {
    mutate,
    data: mutationData,
    isSuccess,
    isPending,
    error: mutationError,
  };
};

export default useLogin;
