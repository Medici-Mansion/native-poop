import { Consonants, SignupForm } from '@/types';

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
    name: 'nickname',
    title: '이름을 입력해주세요',
  },
  {
    id: 2,
    placeholder: '아이디',
    name: 'id',
    title: '아이디를 입력해주세요',
  },
  {
    id: 3,
    placeholder: '비밀번호',
    name: 'password',
    title: '비밀번호를 입력해주세요',
  },
  {
    id: 4,
    placeholder: '생년월일',
    name: 'birthday',
    title: '생년월일을 입력해주세요',
  },
  {
    id: 5,
    placeholder: '성별',
    name: 'gender',
    title: '성별을 선택해주세요',
  },
  {
    id: 6,
    placeholder: '휴대폰 번호',
    name: 'phone',
    title: '휴대폰 번호 또는 이메일을\n입력해주세요',
  },
  {
    id: 7,
    placeholder: '인증 번호',
    name: 'code',
    title: '인증 번호를 입력해주세요',
  },
];

export const ProfileFormList: SignupForm[] = [
  {
    id: 1,
    placeholder: '이름',
    name: 'name',
    title: '반려견 이름',
  },
  {
    id: 2,
    placeholder: '생년월일',
    name: 'birthday',
    title: '반려견 생년월일',
  },
];

export const consonantsList: Consonants[] = [
  { id: 1, value: 'ㄱ' },
  { id: 2, value: 'ㄴ' },
  { id: 3, value: 'ㄷ' },
  { id: 4, value: 'ㄹ' },
  { id: 5, value: 'ㅁ' },
  { id: 6, value: 'ㅂ' },
  { id: 7, value: 'ㅅ' },
  { id: 8, value: 'ㅇ' },
  { id: 9, value: 'ㅈ' },
  { id: 10, value: 'ㅊ' },
  { id: 11, value: 'ㅋ' },
  { id: 12, value: 'ㅌ' },
  { id: 13, value: 'ㅍ' },
  { id: 14, value: 'ㅎ' },
];
