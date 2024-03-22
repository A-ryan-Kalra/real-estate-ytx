import useSWR from "swr";
import fetcher from "../libs/fetcher";

const useGetListingComments = (postId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/comment/getcomments/${postId}`,
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

export default useGetListingComments;
