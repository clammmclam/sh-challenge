import { Advocate } from "@/app/shared/types";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useAdvocates(search: string) {
  const key = search ? `/api/advocates?search=${search}` : "/api/advocates";
  const { data, error, isLoading } = useSWR(key, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
    keepPreviousData: true,
  });

  return {
    advocates: (data?.data ?? []) as Advocate[],
    isLoading,
    isError: error,
  };
}
