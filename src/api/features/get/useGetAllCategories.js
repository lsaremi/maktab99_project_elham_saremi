import { useQuery } from "@tanstack/react-query";
import { CATEGORIES_URL } from "../../../config";
import { instance } from "../../constants";

export const useGetAllCategories = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["categoryData"],
    queryFn: () => instance.get(`${CATEGORIES_URL}`).then((res) => res.data),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return data.data.categories.map((category) => ({
    // key: category._id,
    name: category.name,
    id: category._id,
    icon: category.icon,
  }));
};
