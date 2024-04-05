import {useMutation} from '@tanstack/react-query';
import LoginAPIs from '../../apis/login/index';
import {LoginParam, SuccessLoginRes} from '../../types';
import {AxiosError} from 'axios';

const useLogin = () => {
  const {mutate, data, isSuccess, isPending, error} = useMutation<
    SuccessLoginRes,
    AxiosError,
    LoginParam
  >({
    mutationKey: ['login'],
    mutationFn: (param: LoginParam) => LoginAPIs.login(param),
    onSuccess(data, variables, context) {
      console.log('SUCCESS', data);
    },
    onError(error, variables, context) {
      console.log(error, 'error');
    },
  });

  return {
    mutate,
    data,
    isSuccess,
    isPending,
    error,
  };
};

export default useLogin;
