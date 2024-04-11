import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { ApiResponse, SuccessCreateProfileRes } from '@/types';
import { AxiosError } from 'axios';
import { api } from '@/apis';

const useCreateProfile = (
  options?: UseMutationOptions<
    ApiResponse<SuccessCreateProfileRes>,
    AxiosError,
    FormData
  >,
) => {
  const { mutate, data, isSuccess, isPending, error } = useMutation<
    ApiResponse<SuccessCreateProfileRes>,
    AxiosError,
    FormData
  >({
    mutationKey: ['create-profile'],
    mutationFn: api.createProfile,
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

export default useCreateProfile;
