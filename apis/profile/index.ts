import { api } from '@/apis';

const getBreeds = async ({
  limit = 10,
  cursor = '',
  order = 'ASC',
  searchKey = '',
}) => {
  const res = await api.get(
    `/v1/common/breeds?limit=${limit}&cursor=${cursor}&order=${order}&searchKey=${searchKey}`,
  );
  return res.data;
};

const ProfileAPIs = {
  getBreeds,
};

export default ProfileAPIs;
