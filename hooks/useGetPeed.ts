import {useQuery} from '@tanstack/react-query';
import APIs from '@/apis/index';

const useGetPeed = () => {
  const {data, isLoading} = useQuery({
    queryKey: ['get-peed'],
    queryFn: () => APIs.getPeed(),
  });

  return {
    data,
    isLoading,
  };
};

export default useGetPeed;
