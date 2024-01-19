import { useQuery } from "@tanstack/react-query";
import { instance } from "../../constants";
import { PRODUCTS_URL } from "../../../config";

export const useGetQuantityOfProducts = (currentPage = 1, TRowsPerPage = 2) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["panelQuantityData", currentPage],
    queryFn: () =>
      instance
        .get(`${PRODUCTS_URL}?page=${currentPage}&limit=${TRowsPerPage}`)
        .then((res) => res.data),
    keepPreviousData: true,
    staleTime: 60000,
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (data) {
    const { products } = data.data;
    const { total, total_pages } = data;
    return [products, total_pages, total];
  }
};
