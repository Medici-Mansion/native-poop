import { useQuery } from "@tanstack/react-query";
import APIs from "../apis";

const useGetUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['get-user'],
    queryFn: () => APIs.getUser()
  })

  return {
    data, isLoading
  }
}

export default useGetUser