import ProfileAPIs from '@/apis/profile';
import { useInfiniteQuery } from '@tanstack/react-query';

const useGetChart = () => {
  const { data, isLoading, isFetching, error, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['breeds'],
      queryFn: ({ pageParam }) => ProfileAPIs.getBreeds(),
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) => {
        // if (isDetail && lastPage.next) {
        //   return lastPage.next;
        // }
        return undefined;
      },
    });

  return {
    data,
    isLoading,
    isFetching,
    error,
    hasNextPage,
    fetchNextPage,
  };
};

export default useGetChart;
