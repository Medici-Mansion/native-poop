import { api } from '@/apis';
import { BreedData } from '@/types';

const getBreeds = async () => {
  const res = await api.get<BreedData>('/v1/common/breeds');
  return res.data;
};

const createProfile = async (formData: FormData) => {
  console.log(formData, '<<<<<');
  const res = await api.put('/v1/profiles', formData);
  return res.data;
};

const ProfileAPIs = {
  getBreeds,
  createProfile,
};

export default ProfileAPIs;
