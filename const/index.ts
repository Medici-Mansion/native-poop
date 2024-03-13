import {SignupForm} from '../types';

export const TERMS = [
  {
    id: 1,
    title: '[필수] 만 14세 이상입니다',
  },
  {
    id: 2,
    title: '[필수] 이용약관 동의',
  },
  {
    id: 3,
    title: '[필수] 개인정보 수집 및 이용 동의',
  },
];

export const SignupFormList: SignupForm[] = [
  {
    id: 1,
    placeholder: '이름',
    name: '',
    title: '이름을 입력해주세요',
  },
  {
    id: 2,
    placeholder: '아이디',
    name: '',
    title: '아이디를 입력해주세요',
  },
  {
    id: 3,
    placeholder: '비밀번호',
    name: '',
    title: '비밀번호를 입력해주세요',
  },
  {
    id: 4,
    placeholder: '생년월일',
    name: '',
    title: '생년월일을 입력해주세요',
  },
  {
    id: 5,
    placeholder: '성별',
    name: '',
    title: '성별을 선택해주세요',
  },
  {
    id: 6,
    placeholder: '휴대폰 번호',
    name: '',
    title: '휴대폰 번호 또는 이메일을\n입력해주세요',
  },
  {
    id: 7,
    placeholder: '인증 번호',
    name: '',
    title: '인증 번호를 입력해주세요',
  },
];
