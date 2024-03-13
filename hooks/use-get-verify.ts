import {useMutation} from '@tanstack/react-query';
import SignupAPIs from '../apis/signup';
import {SignupParam, SuccessVerifyRes} from '../types';
import {AxiosError} from 'axios';

const useGetVerify = () => {
  const {mutate, data, isSuccess, isPending, error} = useMutation<
    SuccessVerifyRes,
    AxiosError,
    SignupParam
  >({
    mutationKey: ['get-verify'],
    mutationFn: (param: SignupParam) => SignupAPIs.getVerify(param),
  });

  return {
    mutate,
    data,
    isSuccess,
    isPending,
    error,
  };
};

export default useGetVerify;
