import useSWR from "swr";
import fetcher from "../libs/fetcher";

const useGetUser = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/user/getUser/${userId}`,
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useGetUser;
