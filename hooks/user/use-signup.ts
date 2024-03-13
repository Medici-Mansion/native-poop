import {ApiResponse} from './../../types/index';
import {UseMutationOptions, useMutation} from '@tanstack/react-query';
import SignupAPIs from '../../apis/signup';
import {SignupParam, SuccessSignupRes} from '../../types';
import {AxiosError} from 'axios';

const useSignup = (
  options?: UseMutationOptions<
    ApiResponse<SuccessSignupRes>,
    AxiosError<{error: {message: string[]}}>,
    SignupParam
  >,
) => {
  const {mutate, data, isSuccess, isPending, error} = useMutation<
    ApiResponse<SuccessSignupRes>,
    AxiosError<{error: {message: string[]}}>,
    SignupParam
  >({
    mutationKey: ['signup'],
    mutationFn: SignupAPIs.signup,
    ...options,
  });

  return {
    mutate,
    data,
    isSuccess,
    isPending,
    error,
  };
};

export default useSignup;
