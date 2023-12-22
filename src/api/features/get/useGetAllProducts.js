import { useQuery } from "@tanstack/react-query";
import { PRODUCTS_URL } from "../../../config";
import { instance } from "../../constants";

export const useGetAllProducts = (
  currentPage = 1,
  TRowsPerPage = 2,
  selectedCategory
) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["panelProductsData", currentPage, selectedCategory],
    queryFn: () =>
      instance
        .get(
          `${PRODUCTS_URL}?page=${currentPage}&limit=${TRowsPerPage}${
            selectedCategory !== "all" ? `&category=${selectedCategory}` : ""
          }`
        )
        .then((res) => res.data),
    keepPreviousData: true,
    staleTime: 30000,
  });

  if (isPending) return "loading...";

  if (error) return "An error has occurred: " + error.message;

  const { products } = data.data;
  const { total, total_pages } = data;

  return [products, total, total_pages];
};
