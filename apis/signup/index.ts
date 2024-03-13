import axios from 'axios';
import {ApiResponse, SignupParam, SuccessSignupRes, VerifyParam} from '@/types';

const getVerify = async (param: VerifyParam) => {
  const {type, vid} = param || {};
  const res = await axios.get(
    `https://poop-server-u2f55.ondigitalocean.app/api/v1/auth/verify?type=${type}&vid=${vid}`,
  );
  return res.data;
};

const signup = async (param: SignupParam) => {
  console.log(param, '<<<<<');
  const res = await axios.put<ApiResponse<SuccessSignupRes>>(
    `https://poop-server-u2f55.ondigitalocean.app/api/v1/auth/signup`,
    param,
  );
  return res.data;
};

const SignupAPIs = {
  getVerify,
  signup,
};

export default SignupAPIs;
