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
import { GetMeResponse } from '@/types/server/user/me';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class PoopApi {
  private static instance: AxiosInstance;
  constructor(baseURL: string) {
    if (!PoopApi.instance) {
      PoopApi.instance = axios.create({ baseURL });
    }
  }

  // Common
  async getBreeds() {
    const { data } = await PoopApi.handler<BreedData>({
      method: 'GET',
      url: '/v1/common/breeds',
    });
    return data;
  }

  // User

  async getMe() {
    const { data } = await PoopApi.handler<Response<GetMeResponse>>({
      method: 'GET',
      url: '/v1/users/me',
    });

    return data;
  }

  // Profile

  async getLatestProfile() {
    const { data } = await PoopApi.handler<Response<GetMyProfiles>>({
      method: 'GET',
      url: '/v1/profiles/latest',
    });

    return data;
  }

  async loginProfile(profileId: string) {
    const { data } = await PoopApi.handler<Response<boolean>>({
      method: 'POST',
      url: '/v1/profiles',
      data: {
        profileId,
      },
    });

    return data;
  }

  async createProfile(form: FormData) {
    const { data } = await PoopApi.handler({
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
    const { data } = await PoopApi.handler<Response<GetMyProfiles[]>>({
      method: 'GET',
      url: '/v1/profiles',
    });

    return data;
  }

  // Auth
  async signUp(body: SignupParam) {
    const { data } = await PoopApi.handler<Response<SuccessSignupRes>>({
      method: 'PUT',
      url: '/v1/auth/signup',
      data: body,
    });
    return data;
  }

  async verify() {
    const { data } = await PoopApi.handler({
      method: 'POST',
      url: '/v1/auth/verify',
    });

    return data;
  }

  async getVerifyCode(params: VerifyParam) {
    const { data } = await PoopApi.handler({
      method: 'GET',
      url: '/v1/auth/verify',
      params,
    });

    return data;
  }

  async login(body: LoginParam) {
    const { data } = await PoopApi.handler<Response<LoginSuccess>>({
      method: 'POST',
      url: '/v1/auth/login',
      data: body,
    });
    return data.data;
  }

  private static async handler<T = any>(config: AxiosRequestConfig<unknown>) {
    return PoopApi.instance<T>(config);
  }

  private setAccessToken(accessToken: string) {
    PoopApi.instance.defaults.headers.common[XCI] = accessToken;
  }

  injectInterceptor(accessToken: string) {
    this.setAccessToken(accessToken);

    PoopApi.instance.interceptors.response.use(
      response => response,
      async error => {
        if (error.response.status === 401) {
          try {
            const refreshToken = await AsyncStorage.getItem(Token.RFT);
            if (refreshToken) {
              try {
                const url = new URL(PoopApi.instance.defaults.baseURL!);
                // FIXME
                url.pathname = '/v1/auth/refresh';
                const res = await fetch(url, {
                  body: JSON.stringify({ refreshToken }),
                }).then(response => response.json());
                const { accessToken: newAccessToken } = res.data;
                this.setAccessToken(newAccessToken);
                await AsyncStorage.setItem(Token.ACT, accessToken);
                PoopApi.instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
                return PoopApi.instance.request(error.config);
              } catch (refreshError) {
                await AsyncStorage.removeItem(Token.ACT);
                await AsyncStorage.removeItem(Token.RFT);
                return Promise.reject(refreshError);
              }
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
