import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { SuccessGetVerifyCodeRes, VerifyParam } from '@/types';
import { AxiosError } from 'axios';
import { api } from '@/apis';

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
    mutationFn: api.getVerifyCode,
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
