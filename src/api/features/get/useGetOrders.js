import { useQuery } from "@tanstack/react-query";
import { instance } from "../../constants";
import { ORDERS_URL } from "../../../config";

export const useGetOrders = (
  currentPage = 1,
  TRowsPerPage = 2,
  delivered = false
) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["panelOrdersData", currentPage, delivered],
    queryFn: () =>
      instance
        .get(
          `${ORDERS_URL}?page=${currentPage}&limit=${TRowsPerPage}&deliveryStatus=${delivered}`
        )
        .then((res) => res.data),
    keepPreviousData: true,
    staleTime: 60000,
  });

  if (isPending) return "Loading...";
  if (error) return `An error has occurred: ${error.message}`;

  const { orders } = data.data;
  const { total } = data;
  const totalPages = Math.ceil(total / TRowsPerPage);

  return [orders, totalPages, total];
};
