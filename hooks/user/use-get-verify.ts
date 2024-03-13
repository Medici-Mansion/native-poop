import {useMutation, type UseMutationOptions} from '@tanstack/react-query';
import SignupAPIs from '../../apis/signup';
import {SuccessVerifyRes, VerifyParam} from '../../types';
import {AxiosError} from 'axios';

const useGetVerify = (
  options?: UseMutationOptions<SuccessVerifyRes, AxiosError, VerifyParam>,
) => {
  const {mutate, data, isSuccess, isPending, error} = useMutation<
    SuccessVerifyRes,
    AxiosError,
    VerifyParam
  >({
    mutationKey: ['get-verify'],
    mutationFn: (param: VerifyParam) => SignupAPIs.getVerify(param),
    ...(options ?? {}),
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
