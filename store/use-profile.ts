import { Breed } from '@/types';
import { create } from 'zustand';

interface Profile {
  breed: Breed;
  setBreed: (breed: Breed) => void;
}
export const useProfileStore = create<Profile>(set => ({
  breed: {
    avatar: '',
    id: '',
    name: '',
    nameEN: '',
  },
  setBreed: (breed: Breed) => {
    set({ breed });
  },
}));

export default useProfileStore;
