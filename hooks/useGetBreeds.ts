import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import ProfileAPIs from '@/apis/profile';
import { BreedData, BreedsGroupedByConsonant } from '@/types';

const useGetBreeds = (searchKey: string, searchInput: string) => {
  const {
    data: breedsData,
    isLoading,
    isFetching,
    error,
  } = useQuery<BreedData, AxiosError, BreedsGroupedByConsonant>({
    queryKey: ['breeds'],
    queryFn: () => ProfileAPIs.getBreeds(),
    staleTime: Infinity,
    gcTime: Infinity,
    select: data => {
      const { data: breeds } = data || {};
      if (!breeds) return {};

      const filteredBreeds: BreedsGroupedByConsonant = {};

      if (searchKey !== '') {
        if (breeds[searchKey]) {
          filteredBreeds[searchKey] = breeds[searchKey];
        }
        return filteredBreeds;
      }

      if (searchInput !== '') {
        Object.keys(breeds).forEach(key => {
          breeds[key].forEach(breed => {
            if (
              breed.nameEN.toLowerCase().includes(searchInput.toLowerCase())
            ) {
              if (!filteredBreeds[key]) filteredBreeds[key] = [];
              filteredBreeds[key].push(breed);
            }
          });
        });
        return filteredBreeds;
      }

      return breeds;
    },
  });

  return {
    data: breedsData,
    isLoading,
    isFetching,
    error,
  };
};

export default useGetBreeds;
