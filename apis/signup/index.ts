import axios from 'axios';
import {
  ApiResponse,
  SignupParam,
  SuccessSignupRes,
  VerifyCheckParam,
  VerifyParam,
} from '@/types';
import { api } from '@/apis';

const getVerifyCode = async (param: VerifyParam) => {
  const { type, vid } = param || {};
  const res = await api.get('/v1/auth/verify', {
    params: {
      type,
      vid,
    },
  });
  return res.data;
};

const verify = async (param: VerifyCheckParam) => {
  const res = await axios.post(
    'https://poop-server-u2f55.ondigitalocean.app/api/v1/auth/verify',
    param,
  );
  return res.data;
};

const signup = async (param: SignupParam) => {
  const res = await axios.put<ApiResponse<SuccessSignupRes>>(
    '/v1/auth/signup',
    param,
  );
  return res.data;
};

const SignupAPIs = {
  getVerifyCode,
  signup,
  verify,
};

export default SignupAPIs;
