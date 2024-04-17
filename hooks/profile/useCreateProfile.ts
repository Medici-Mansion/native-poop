import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '@/apis';
import { Response } from '@/types/server';

const useCreateProfile = (
  options?: UseMutationOptions<Response<boolean>, AxiosError, FormData>,
) => {
  const { mutate, data, isSuccess, isPending, error } = useMutation({
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
