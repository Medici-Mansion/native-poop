import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { SuccessVerifyRes, VerifyCheckParam } from '@/types';
import { AxiosError } from 'axios';
import { api } from '@/apis';

const useVerify = (
  options?: UseMutationOptions<SuccessVerifyRes, AxiosError, VerifyCheckParam>,
) => {
  const { mutate, isSuccess, isPending, error } = useMutation<
    SuccessVerifyRes,
    AxiosError,
    VerifyCheckParam
  >({
    mutationKey: ['verify'],
    mutationFn: api.verify,
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
