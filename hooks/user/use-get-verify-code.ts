import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import SignupAPIs from '@/apis/signup';
import { SuccessGetVerifyCodeRes, VerifyParam } from '@/types';
import { AxiosError } from 'axios';

const useGetVerifyCode = (
  options?: UseMutationOptions<
    SuccessGetVerifyCodeRes,
    AxiosError,
    VerifyParam
  >,
) => {
  const { mutate, data, isSuccess, isPending, error } = useMutation<
    SuccessGetVerifyCodeRes,
    AxiosError,
    VerifyParam
  >({
    mutationKey: ['get-verify'],
    mutationFn: (param: VerifyParam) => SignupAPIs.getVerifyCode(param),
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

export default useGetVerifyCode;
