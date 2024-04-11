export interface GetMyProfiles {
  id: string;
  createdAt: string;
  updatedAt: string;
  avatarUrl?: string;
  name: string;
  birthday: string;
  gender: string;
  breedId: string;
  isLatestLoginProfile: boolean;
}
