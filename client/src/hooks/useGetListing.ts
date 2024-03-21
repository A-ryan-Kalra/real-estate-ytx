import useSwr from "swr";
import fetcher from "../libs/fetcher";

const useGetListing = (listingId: string) => {
  const { data, error, isLoading, mutate } = useSwr(
    `/api/listing/specificlisting/${listingId}`,
    fetcher
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export default useGetListing;
