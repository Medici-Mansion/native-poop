import { LoginParam, SuccessLoginRes } from '../../types/index';
import { api } from '..';

const login = async (param: LoginParam) => {
  const res = await api.post<SuccessLoginRes>('/v1/auth/login', param);
  return res.data;
};

const LoginAPIs = {
  login,
};

export default LoginAPIs;
