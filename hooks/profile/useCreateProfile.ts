import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import ProfileAPIs from '@/apis/profile';
import { ApiResponse, SuccessCreateProfileRes } from '@/types';
import { AxiosError } from 'axios';

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
    mutationFn: (param: any) => ProfileAPIs.createProfile(param),
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
