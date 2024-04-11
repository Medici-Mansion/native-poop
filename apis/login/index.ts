import { LoginParam } from '../../types/index';
import { api } from '..';

const login = async (param: LoginParam) => {
  const res = await api.login(param);
  return res.data;
};

const LoginAPIs = {
  login,
};

export default LoginAPIs;
