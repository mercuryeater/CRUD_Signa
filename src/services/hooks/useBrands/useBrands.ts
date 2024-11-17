import useSWR from "swr";
import { fetcher } from "../../../utils/api/api";
import { IBrand } from "../../../types/brands/brands";

export const useBrands = () => {
  const { data, error, isLoading, mutate } = useSWR<IBrand[]>(
    "/api/brands",
    fetcher
  );

  return {
    data: data,
    isLoading,
    error,
    mutate,
  };
};
