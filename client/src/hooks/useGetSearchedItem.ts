import useSWR from "swr";
import fetcher from "../libs/fetcher";

const useGetSearchedItem = (query: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/listing/getSearchedItem?${query}`,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateOnFocus: true,
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

export default useGetSearchedItem;
