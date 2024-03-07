import {useQuery} from '@tanstack/react-query';
import APIs from '../apis';

const useHealth = () => {
  const {data, isLoading, error} = useQuery({
    queryKey: ['health'],
    queryFn: () => APIs.healthCheck(),
  });

  return {data, isLoading, error};
};

export default useHealth;
