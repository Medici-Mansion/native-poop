import axios from 'axios';
import {LoginParam, SuccessLoginRes} from '../../types/index';

const login = async (param: LoginParam) => {
  const res = await axios.post<SuccessLoginRes>(
    'https://poop-server-u2f55.ondigitalocean.app/api/v1/auth/login',
    param,
  );
  return res.data;
};

const LoginAPIs = {
  login,
};

export default LoginAPIs;
