import {useMutation, type UseMutationOptions} from '@tanstack/react-query';
import SignupAPIs from '@/apis/signup';
import {VerifyCheckParam, VerifyParam} from '@/types';
import {AxiosError} from 'axios';

const useVerify = (
  options?: UseMutationOptions<boolean, AxiosError, VerifyCheckParam>,
) => {
  const {mutate, isSuccess, isPending, error} = useMutation<
    boolean,
    AxiosError,
    VerifyCheckParam
  >({
    mutationKey: ['verify'],
    mutationFn: (param: VerifyCheckParam) => SignupAPIs.verify(param),
    ...(options ?? {}),
  });

  return {
    mutate,
    isSuccess,
    isPending,
    error,
  };
};

export default useVerify;
