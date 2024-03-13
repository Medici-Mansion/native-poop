import axios from 'axios';
import {SignupParam, SuccessVerifyRes} from '~/types';

const getVerify = async (param: SignupParam) => {
  const {type, vid} = param || {};
  const res = await axios.get<SuccessVerifyRes>(
    `https://poop-server-u2f55.ondigitalocean.app/api/v1/auth/verify?type=${type}&vid=${vid}`,
  );
  return res.data;
};

const SignupAPIs = {
  getVerify,
};

export default SignupAPIs;
