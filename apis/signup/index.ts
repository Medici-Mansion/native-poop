import axios from 'axios';
import {
  ApiResponse,
  SignupParam,
  SuccessSignupRes,
  VerifyCheckParam,
  VerifyParam,
} from '@/types';

const getVerifyCode = async (param: VerifyParam) => {
  const {type, vid} = param || {};
  const res = await axios.get(
    `https://poop-server-u2f55.ondigitalocean.app/api/v1/auth/verify?type=${type}&vid=${vid}`,
  );
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
    `https://poop-server-u2f55.ondigitalocean.app/api/v1/auth/signup`,
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
