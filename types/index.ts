export interface Peeds {
  id: number;
  title: string;
  role: string;
  nickname: string;
}

export interface LoginParam {
  id: string;
  password: string;
}

export interface SuccessLoginRes {
  accessToken: string;
  refreshToken: string;
}

export interface SignupStepInfo {
  id: number;
  name: string;
  password: string;
  birth: string;
  gender: Gender;
  phone: string;
  code: string;
  verify: Verify;
}

export interface SignupForm {
  id: number;
  placeholder: string;
  name: string;
  title: string;
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  NONE = 'NONE',
}

export enum Verify {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
}

export interface SignupParam {
  type: Verify;
  vid: string | number;
}

export interface SuccessVerifyRes {
  id: string;
  accountId: string;
  birthday: string;
}
