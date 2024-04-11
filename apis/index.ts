import { Token, XCI } from '@/const';
import {
  BreedData,
  LoginParam,
  SignupParam,
  SuccessSignupRes,
  VerifyParam,
} from '@/types';
import { Response } from '@/types/server';
import { LoginSuccess } from '@/types/server/auth/login';
import { GetMyProfiles } from '@/types/server/profile';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class PoopApi {
  private readonly instance: AxiosInstance;
  constructor(baseURL: string) {
    this.instance = axios.create({ baseURL });
  }

  // Common
  async getBreeds() {
    const { data } = await this.handler<BreedData>({
      method: 'GET',
      url: '/v1/common/breeds',
    });

    return data;
  }

  // Profile

  async createProfile(form: FormData) {
    const { data } = await this.handler({
      method: 'PUT',
      url: '/v1/profiles',
      data: form,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  }

  async getMyProfileList() {
    const { data } = await this.handler<Response<GetMyProfiles[]>>({
      method: 'GET',
      url: '/v1/profiles',
    });

    return data;
  }

  // Auth
  async signUp(body: SignupParam) {
    const { data } = await this.handler<Response<SuccessSignupRes>>({
      method: 'PUT',
      url: '/v1/auth/signup',
      data: body,
    });
    return data;
  }

  async verify() {
    const { data } = await this.handler({
      method: 'POST',
      url: '/v1/auth/verify',
    });

    return data;
  }

  async getVerifyCode(params: VerifyParam) {
    const { data } = await this.handler({
      method: 'GET',
      url: '/v1/auth/verify',
      params,
    });

    return data;
  }

  async login(body: LoginParam) {
    const { data } = await this.handler<Response<LoginSuccess>>({
      method: 'POST',
      url: '/v1/auth/login',
      data: body,
    });
    return data.data;
  }

  async handler<T = any>(config: AxiosRequestConfig<unknown>) {
    return this.instance<T>(config);
  }

  private setAccessToken(accessToken: string) {
    this.instance.defaults.headers.common[XCI] = accessToken;
  }

  injectInterceptor(accessToken: string) {
    this.setAccessToken(accessToken);
    this.instance.interceptors.response.use(
      response => response,
      async error => {
        if (error.response.status === 401) {
          try {
            const refreshToken = await AsyncStorage.getItem(Token.RFT);
            if (refreshToken) {
              const res = await this.instance.post('/v1/auth/refresh', {
                refreshToken,
              });
              const { accessToken: newAccessToken } = res.data;
              this.setAccessToken(newAccessToken);
              await AsyncStorage.setItem(Token.ACT, accessToken);
              this.instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
              return this.instance.request(error.config);
            }
          } catch (refreshError: any) {
            if (refreshError?.status! === 401) {
              await AsyncStorage.removeItem(Token.ACT);
              await AsyncStorage.removeItem(Token.RFT);
            }
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      },
    );
  }
}

export const api = new PoopApi(API_URL);
