import { Gender } from '@/types';

export interface GetMyProfiles {
  id: string;
  createdAt: string;
  updatedAt: string;
  avatarUrl?: string;
  name: string;
  birthday: string;
  gender: Gender;
  breedId: string;
  isLatestLoginProfile: boolean;
}
